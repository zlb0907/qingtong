# 🚀 部署指南

本指南将帮助你将情侣同步观影应用部署到Vercel（前端）和Render（后端）。

## 📋 准备工作

### 1. 代码准备
确保你的项目包含以下文件：
```
couples-movie-sync/
├── index.html          # 主前端文件
├── server.js           # Node.js后端服务器
├── package.json        # 后端依赖配置
├── vercel.json         # Vercel部署配置
├── render.yaml         # Render部署配置
└── README.md           # 项目文档
```

### 2. GitHub仓库
1. 在GitHub上创建新仓库
2. 将所有文件上传到仓库
3. 确保仓库是公开的（免费部署需要）

## 🌐 前端部署到 Vercel

### 步骤 1: 注册 Vercel 账户
1. 访问 https://vercel.com
2. 使用GitHub账户注册/登录

### 步骤 2: 导入项目
1. 点击 "New Project" 按钮
2. 选择 "Import Git Repository"
3. 从GitHub列表中选择你的项目仓库
4. 点击 "Import"

### 步骤 3: 配置项目
在配置页面设置：
```
Framework Preset: Other
Root Directory: ./
Build Command: (留空)
Output Directory: (留空)
Install Command: (留空)
```

### 步骤 4: 环境变量
无需设置环境变量，直接点击 "Deploy" 按钮。

### 步骤 5: 获取前端URL
部署完成后，Vercel会提供一个类似 `https://your-project-name.vercel.app` 的URL，请保存这个URL。

## 🖥️ 后端部署到 Render

### 步骤 1: 注册 Render 账户
1. 访问 https://render.com
2. 使用GitHub账户注册/登录

### 步骤 2: 创建 Web Service
1. 点击 "New" → "Web Service"
2. 连接你的GitHub账户
3. 选择你的项目仓库
4. 点击 "Connect"

### 步骤 3: 配置服务
填写以下配置：
```
Name: couples-movie-sync-backend
Branch: main
Root Directory: ./
Build Command: npm install
Start Command: npm start
Environment: Node
Instance Type: Free (Web Service)
```

### 步骤 4: 高级设置
展开 "Advanced" 部分：
```
Health Check Path: /
Auto Deploy: Yes
```

### 步骤 5: 环境变量
在 "Environment Variables" 部分，添加：
```
NODE_ENV=production
PORT=10000
```

### 步骤 6: 创建服务
点击 "Create Web Service" 按钮开始部署。

### 步骤 7: 获取后端URL
部署完成后，Render会提供一个类似 `https://your-backend-app.onrender.com` 的URL，请保存这个URL。

## 🔧 配置前后端连接

### 步骤 1: 更新前端代码
在 `index.html` 中找到这一行代码：
```javascript
const SERVER_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://your-backend-app.onrender.com'; // 替换为你的Render后端URL
```

将 `your-backend-app.onrender.com` 替换为你实际的Render应用URL。

### 步骤 2: 重新部署前端
1. 提交代码更改到GitHub
2. Vercel会自动检测到更改并重新部署

## 🧪 测试部署

### 测试后端
访问你的Render后端URL，应该看到 "Couples Movie Sync Server is running!"

### 测试前端
访问你的Vercel前端URL，应该能看到应用界面。

### 测试完整功能
1. 在一个浏览器标签中创建房间
2. 复制房间ID
3. 在另一个浏览器标签中加入房间
4. 测试视频同步、聊天等功能

## 📱 移动端优化

### PWA 配置（可选）
为了提供更好的移动端体验，可以添加PWA支持：

创建 `manifest.json` 文件：
```json
{
  "name": "情侣同步观影",
  "short_name": "同步观影",
  "description": "与伴侣同步观看视频的应用",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0F172A",
  "theme_color": "#7C3AED",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

在 `index.html` 的 `<head>` 中添加：
```html
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="同步观影">
```

## 🔒 安全建议

### 1. 环境变量
对于生产环境，建议使用环境变量存储敏感信息：
```javascript
// server.js
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://your-frontend.vercel.app';
```

### 2. HTTPS
确保前后端都使用HTTPS协议，Vercel和Render默认提供SSL证书。

### 3. 输入验证
在生产环境中添加输入验证：
```javascript
// 验证房间ID格式
function validateRoomId(roomId) {
  return /^[A-Za-z0-9]{6,}$/.test(roomId);
}
```

## 📊 监控和日志

### Render 日志
在Render控制台查看应用日志：
1. 访问你的服务页面
2. 点击 "Logs" 标签
3. 查看实时日志输出

### 错误处理
添加全局错误处理：
```javascript
// server.js
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

## 🚀 性能优化

### 1. CDN 加速
使用CDN加速静态资源：
```html
<!-- 使用jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/socket.io-client@4.7.2/dist/socket.io.min.js"></script>
```

### 2. 资源压缩
确保HTML、CSS、JavaScript文件已压缩。

### 3. 缓存策略
设置适当的缓存头：
```javascript
// server.js
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));
```

## 🆘 常见问题解决

### 部署失败
1. **检查依赖**: 确保 `package.json` 包含所有依赖
2. **查看日志**: 检查部署日志中的错误信息
3. **环境变量**: 确认环境变量设置正确

### 连接问题
1. **CORS配置**: 确保后端允许前端域名访问
2. **WebSocket**: 确认WebSocket连接正常
3. **防火墙**: 检查是否有防火墙阻止连接

### 性能问题
1. **免费额度**: 检查是否超出免费额度限制
2. **资源使用**: 监控CPU和内存使用情况
3. **连接数**: 免费计划有连接数限制

## 📞 获取帮助

如果遇到问题：
1. 查看项目文档和README
2. 检查部署平台的文档
3. 在GitHub上提交Issue
4. 查看应用日志

---

**🎉 恭喜！你的情侣同步观影应用已经成功部署！**

现在你可以：
- 分享前端URL给朋友们
- 享受同步观影的乐趣
- 根据需要自定义功能

祝你们观影愉快！💕