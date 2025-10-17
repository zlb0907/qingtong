# 一键部署包 - Render后端部署

## 包含文件
这个部署包包含了所有必要的文件：

### 核心文件
- `server.js` - Node.js后端服务器 (包含WebSocket实时通信)
- `package.json` - 项目依赖配置
- `package-lock.json` - 依赖版本锁定
- `render.yaml` - Render平台部署配置

### 前端文件
- `index.html` - 主前端页面
- `public/index.html` - 前端页面副本

### 文档文件
- `RENDER_DEPLOYMENT_GUIDE.md` - Render部署详细指南
- `GITHUB_MANUAL_UPLOAD_BACKUP.md` - GitHub手动上传指南
- `DEPLOYMENT.md` - 部署文档
- `FINAL_DEPLOYMENT_GUIDE.md` - 最终部署指南
- `GITHUB_MANUAL_UPLOAD.md` - GitHub上传指南
- `VERCEL_ERROR_FIX.md` - Vercel错误修复指南
- `README.md` - 项目说明文档

## 快速部署步骤

### 1. GitHub上传
1. 访问 https://github.com/zlb0907/qingtong
2. 点击 "Add file" → "Upload files"
3. 拖拽所有文件到上传区域
4. 点击 "Commit changes"

### 2. Render部署
1. 访问 https://render.com
2. 使用GitHub账号登录
3. 点击 "New" → "Web Service"
4. 连接GitHub仓库 (zlb0907/qingtong)
5. 配置参数：
   - Name: `couple-sync-video-backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`

### 3. 环境变量
在Render控制台添加：
```
NODE_ENV=production
PORT=10000
```

## 服务特性
✅ 实时视频同步 (WebSocket)
✅ 多人房间支持
✅ 聊天功能
✅ 弹幕功能
✅ 反应表情
✅ 健康检查
✅ 自动扩缩容

## 部署后配置
部署完成后，需要更新前端WebSocket连接地址：
```javascript
// 替换为实际的Render服务URL
const socket = io('https://couple-sync-video-backend-xxx.onrender.com');
```

## 技术支持
如遇到问题，请参考文档文件或联系技术支持。

---
一键部署包已准备完成！🚀