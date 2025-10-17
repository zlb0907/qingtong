# 🚀 Vercel 快速部署步骤

## 📱 一键部署（推荐）

### 步骤1：准备 GitHub 仓库
```bash
# 在本地项目目录执行
git init
git add .
git commit -m "情侣同步观影应用"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 步骤2：Vercel 一键部署
1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Deploy"（所有配置已预设）

### 步骤3：配置后端连接
部署完成后，需要更新后端地址：

1. 在 Vercel 项目设置中添加环境变量：
   ```
   BACKEND_URL = https://你的后端地址.onrender.com
   ```

2. 或者修改前端代码中的服务器地址：
```javascript
// 在 index.html 中找到这一行：
const SERVER_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://your-backend-app.onrender.com'; // 改为你的实际后端地址
```

## 🎯 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] 部署成功完成
- [ ] 后端地址已配置
- [ ] 访问前端域名测试功能

## 🌟 获取前端域名

部署成功后，Vercel 会提供：
- 类似 `https://couple-sync-video.vercel.app` 的域名
- 支持自定义域名
- 自动 HTTPS 和 CDN 加速

## 🔗 重要提醒

1. **先部署后端**：确保你的后端（Render）先部署完成
2. **更新连接地址**：将前端代码中的 `your-backend-app.onrender.com` 替换为实际的后端域名
3. **测试连接**：部署后测试 WebSocket 连接是否正常

## 📞 遇到问题？

- 查看 Vercel 部署日志
- 检查浏览器控制台错误
- 确认后端服务器运行正常
- 验证跨域配置正确

## 🎉 完成！

现在你可以与伴侣分享 Vercel 提供的链接，开始同步观影体验！🎬💕