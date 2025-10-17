# Render 后端部署指南

## 项目概述
这是一个基于Node.js和Socket.io的实时视频同步应用后端服务，支持多用户房间、视频同步、聊天和弹幕功能。

## 部署前准备

### 1. 代码检查
- ✅ 后端主文件 `server.js` 已配置完成
- ✅ 依赖文件 `package.json` 已配置
- ✅ Render配置文件 `render.yaml` 已创建

### 2. 环境变量配置
在Render控制台中需要设置的环境变量：
- `NODE_ENV=production`
- `PORT=3001` (Render会自动分配端口，但建议设置)

## Render部署步骤

### 步骤1: 创建Render账号
1. 访问 [https://render.com](https://render.com)
2. 使用GitHub账号登录

### 步骤2: 创建Web服务
1. 点击 "New" → "Web Service"
2. 连接你的GitHub仓库
3. 选择要部署的分支（通常是main或master）

### 步骤3: 配置服务
填写以下配置信息：
- **Name**: couple-sync-video-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: 免费版 (Free)

### 步骤4: 环境变量
在 "Environment" 标签页添加：
```
NODE_ENV=production
PORT=10000
```

### 步骤5: 健康检查
配置健康检查路径：
- **Health Check Path**: `/api/health`
- **Health Check Interval**: 30秒

### 步骤6: 部署
点击 "Create Web Service" 开始部署

## 部署后配置

### 1. 获取服务URL
部署完成后，在Render控制台中找到你的服务URL，格式为：
```
https://couple-sync-video-backend-xxx.onrender.com
```

### 2. 更新前端配置
在前端代码中，将WebSocket连接地址更新为新的后端URL：
```javascript
// 在客户端代码中修改
const socket = io('https://couple-sync-video-backend-xxx.onrender.com');
```

### 3. 跨域配置
后端已配置CORS允许所有来源，如需限制，可在server.js中修改：
```javascript
io.on('connection', (socket) => {
  cors: {
    origin: "https://your-frontend-domain.com", // 替换为你的前端域名
    methods: ["GET", "POST"]
  }
});
```

## 功能验证

部署完成后，测试以下功能：
1. ✅ 创建房间: `POST /api/rooms`
2. ✅ 加入房间: `POST /api/rooms/:roomId/join`
3. ✅ 健康检查: `GET /api/health`
4. ✅ WebSocket连接: `wss://your-domain.com`

## 常见问题

### 1. 端口问题
Render会自动分配端口，通过`process.env.PORT`获取，无需手动设置。

### 2. 服务休眠
免费版服务15分钟无请求会休眠，首次访问可能有延迟。

### 3. WebSocket连接
确保使用`wss://`协议进行WebSocket连接。

### 4. 内存限制
免费版有512MB内存限制，监控内存使用情况。

## 监控和维护

### 1. 日志查看
在Render控制台查看实时日志：
- 访问日志
- 错误日志
- WebSocket连接日志

### 2. 性能监控
监控指标：
- 响应时间
- 内存使用
- WebSocket连接数

### 3. 自动重启
配置自动重启策略：
- 崩溃时自动重启
- 内存超限重启

## 升级建议

### 1. 数据库集成
如需持久化数据，考虑添加数据库：
- PostgreSQL (Render提供)
- MongoDB (Atlas)
- Redis (缓存)

### 2. 负载均衡
用户量增加时：
- 升级实例类型
- 使用多个实例
- 配置负载均衡

### 3. 安全增强
- 添加认证机制
- 限制房间数量
- 输入验证

## 技术支持

如遇到问题：
1. 查看Render官方文档
2. 检查应用日志
3. 验证网络连接
4. 联系Render支持

---

部署完成后，你的后端服务将运行在Render云上，提供24/7的在线服务。