const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 存储房间信息
const rooms = new Map();

// 生成房间ID
function generateRoomId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Socket.io 连接处理
io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  // 创建房间
  socket.on('create-room', (data) => {
    const roomId = generateRoomId();
    const room = {
      id: roomId,
      host: socket.id,
      members: [{
        id: socket.id,
        name: data.name || '用户1',
        isHost: true
      }],
      videoState: {
        url: '',
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        playbackRate: 1
      },
      messages: [],
      danmaku: []
    };
    
    rooms.set(roomId, room);
    socket.join(roomId);
    
    socket.emit('room-created', {
      roomId: roomId,
      room: room
    });
    
    console.log(`房间 ${roomId} 已创建`);
  });

  // 加入房间
  socket.on('join-room', (data) => {
    const { roomId, name } = data;
    const room = rooms.get(roomId);
    
    if (!room) {
      socket.emit('join-error', '房间不存在');
      return;
    }
    
    if (room.members.length >= 2) {
      socket.emit('join-error', '房间已满');
      return;
    }
    
    // 添加成员
    const member = {
      id: socket.id,
      name: name || '用户2',
      isHost: false
    };
    
    room.members.push(member);
    socket.join(roomId);
    
    // 通知房间内的其他成员
    socket.to(roomId).emit('member-joined', {
      member: member,
      memberCount: room.members.length
    });
    
    // 发送房间信息给新成员
    socket.emit('room-joined', {
      roomId: roomId,
      room: room,
      isHost: false
    });
    
    console.log(`${name} 加入房间 ${roomId}`);
  });

  // 视频同步事件
  socket.on('video-play', (data) => {
    const { roomId, currentTime } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      room.videoState.isPlaying = true;
      room.videoState.currentTime = currentTime;
      
      // 广播给房间内的其他成员
      socket.to(roomId).emit('video-played', {
        currentTime: currentTime,
        senderId: socket.id
      });
    }
  });

  socket.on('video-pause', (data) => {
    const { roomId, currentTime } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      room.videoState.isPlaying = false;
      room.videoState.currentTime = currentTime;
      
      socket.to(roomId).emit('video-paused', {
        currentTime: currentTime,
        senderId: socket.id
      });
    }
  });

  socket.on('video-seek', (data) => {
    const { roomId, currentTime } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      room.videoState.currentTime = currentTime;
      
      socket.to(roomId).emit('video-seeked', {
        currentTime: currentTime,
        senderId: socket.id
      });
    }
  });

  socket.on('video-url-change', (data) => {
    const { roomId, url, title } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      room.videoState.url = url;
      
      socket.to(roomId).emit('video-url-changed', {
        url: url,
        title: title,
        senderId: socket.id
      });
    }
  });

  // 聊天消息
  socket.on('chat-message', (data) => {
    const { roomId, message, sender } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      const chatMessage = {
        id: Date.now(),
        sender: sender,
        content: message,
        timestamp: new Date()
      };
      
      room.messages.push(chatMessage);
      
      // 广播给房间内的所有成员
      io.to(roomId).emit('chat-message-received', chatMessage);
    }
  });

  // 弹幕
  socket.on('danmaku-send', (data) => {
    const { roomId, text, sender, color } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      const danmaku = {
        id: Date.now(),
        text: text,
        sender: sender,
        color: color || '#ffffff',
        timestamp: new Date()
      };
      
      room.danmaku.push(danmaku);
      
      // 广播给房间内的所有成员
      io.to(roomId).emit('danmaku-received', danmaku);
    }
  });

  // 反应表情
  socket.on('reaction-send', (data) => {
    const { roomId, reaction, sender } = data;
    
    // 广播给房间内的所有成员
    socket.to(roomId).emit('reaction-received', {
      reaction: reaction,
      sender: sender
    });
  });

  // 同步请求
  socket.on('sync-request', (data) => {
    const { roomId } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      const sender = room.members.find(m => m.id === socket.id);
      
      socket.to(roomId).emit('sync-request-received', {
        sender: sender ? sender.name : '用户'
      });
    }
  });

  // 离开房间
  socket.on('leave-room', (data) => {
    const { roomId } = data;
    const room = rooms.get(roomId);
    
    if (room) {
      // 从房间成员中移除
      room.members = room.members.filter(m => m.id !== socket.id);
      
      // 通知房间内的其他成员
      socket.to(roomId).emit('member-left', {
        memberId: socket.id,
        memberCount: room.members.length
      });
      
      // 如果房间为空，删除房间
      if (room.members.length === 0) {
        rooms.delete(roomId);
        console.log(`房间 ${roomId} 已删除`);
      }
      
      socket.leave(roomId);
      console.log(`用户 ${socket.id} 离开房间 ${roomId}`);
    }
  });

  // 断开连接
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
    
    // 从所有房间中移除该用户
    rooms.forEach((room, roomId) => {
      const memberIndex = room.members.findIndex(m => m.id === socket.id);
      if (memberIndex !== -1) {
        room.members.splice(memberIndex, 1);
        
        // 通知房间内的其他成员
        socket.to(roomId).emit('member-left', {
          memberId: socket.id,
          memberCount: room.members.length
        });
        
        // 如果房间为空，删除房间
        if (room.members.length === 0) {
          rooms.delete(roomId);
          console.log(`房间 ${roomId} 已删除`);
        }
      }
    });
  });
});

// API路由
app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: '房间不存在' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 静态文件服务
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});