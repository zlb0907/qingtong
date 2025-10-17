# 情侣同步观影应用

一个支持两人实时同步观看视频的应用，支持播放/暂停/进度同步、聊天、弹幕和表情反应功能。

## ✨ 功能特性

### 🎬 视频同步
- **实时播放同步**: 两人同时播放/暂停视频
- **进度同步**: 拖动进度条时自动同步到对方
- **视频URL同步**: 一方更换视频时，另一方会收到提示

### 💬 实时互动
- **聊天功能**: 支持文字消息和表情
- **弹幕系统**: 发送的聊天消息会以弹幕形式显示在视频上
- **表情反应**: 发送爱心等表情动画

### 🏠 房间管理
- **创建房间**: 一键创建观影房间
- **加入房间**: 通过房间ID或分享链接加入
- **成员管理**: 查看房间成员状态
- **房间分享**: 生成分享链接，方便邀请伴侣

### 📱 用户体验
- **响应式设计**: 完美适配移动端和桌面端
- **现代化UI**: 使用Tailwind CSS和动画效果
- **键盘快捷键**: 支持空格播放/暂停、方向键控制等
- **全屏模式**: 双击或按钮切换全屏

## 🚀 技术栈

### 前端
- **HTML5 + CSS3**: 现代化界面设计
- **Tailwind CSS**: 快速样式开发
- **Font Awesome**: 图标库
- **Anime.js**: 动画效果
- **Socket.io Client**: 实时通信

### 后端
- **Node.js**: 服务器运行环境
- **Express.js**: Web框架
- **Socket.io**: WebSocket实时通信
- **CORS**: 跨域支持

### 部署
- **Vercel**: 前端部署（免费）
- **Render**: 后端部署（免费）

## 📦 项目结构

```
couples-movie-sync/
├── index.html          # 主前端文件
├── server.js           # Node.js后端服务器
├── package.json        # 后端依赖配置
├── vercel.json         # Vercel部署配置
├── render.yaml         # Render部署配置
└── README.md           # 项目文档
```

## 🛠️ 本地开发

### 1. 克隆项目
```bash
git clone <repository-url>
cd couples-movie-sync
```

### 2. 安装后端依赖
```bash
npm install
```

### 3. 启动后端服务器
```bash
npm start
# 或使用开发模式
npm run dev
```

### 4. 打开前端
直接在浏览器中打开 `index.html` 文件，或启动本地服务器：
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .
```

### 5. 访问应用
- 前端: http://localhost:8000
- 后端: http://localhost:3001

## 🚀 部署指南

### 前端部署到 Vercel

1. **Fork项目到GitHub**
2. **登录Vercel**: https://vercel.com
3. **导入项目**: 点击"New Project"，选择GitHub仓库
4. **配置部署**:
   - Framework Preset: 选择"Other"
   - Root Directory: 保持默认
   - Build Command: 留空（静态文件不需要构建）
   - Output Directory: 留空
5. **环境变量**: 无需设置
6. **部署**: 点击"Deploy"按钮

### 后端部署到 Render

1. **Fork项目到GitHub**
2. **登录Render**: https://render.com
3. **创建Web Service**:
   - 点击"New" → "Web Service"
   - 连接GitHub仓库
4. **配置服务**:
   - Name: couples-movie-sync-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Branch: main
5. **环境变量**: 无需设置
6. **部署**: 点击"Create Web Service"

### 配置跨域

部署完成后，需要更新前端代码中的后端URL：

在 `index.html` 中找到这一行：
```javascript
const SERVER_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://your-backend-app.onrender.com'; // 替换为你的Render后端URL
```

将 `your-backend-app.onrender.com` 替换为你实际的Render应用URL。

## 📱 使用方法

### 创建房间
1. 打开应用
2. 点击右上角的"房间"按钮
3. 点击"创建房间"
4. 复制房间ID或分享链接给伴侣

### 加入房间
1. 点击"加入房间"按钮
2. 输入伴侣提供的房间ID
3. 点击"加入"按钮

### 同步观影
- **播放/暂停**: 点击视频或控制栏的播放按钮
- **进度同步**: 拖动进度条会自动同步到对方
- **音量控制**: 点击音量图标调节音量

### 互动交流
- **聊天**: 点击聊天按钮发送消息
- **弹幕**: 聊天消息会以弹幕形式显示
- **表情**: 点击快速表情按钮发送爱心等

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| 空格键 | 播放/暂停 |
| ←/→ | 快退/快进10秒 |
| ↑/↓ | 增加/减少音量 |
| F | 切换全屏 |

## 🎨 自定义配置

### 修改颜色主题
在 `index.html` 中修改Tailwind配置：
```javascript
colors: {
  primary: '#7C3AED',     // 主色调
  secondary: '#F472B6',   // 次要色调
  dark: '#1F2937',        // 深色背景
  light: '#F3F4F6',       // 浅色背景
}
```

### 修改弹幕样式
在CSS中修改 `.danmaku` 类的样式：
```css
.danmaku {
  font-size: 20px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  animation-duration: 12s; // 弹幕滚动时间
}
```

## 🔧 故障排除

### 连接问题
- **检查网络**: 确保网络连接正常
- **CORS配置**: 确认后端已启用CORS
- **防火墙**: 检查防火墙设置

### 同步不准确
- **网络延迟**: 高延迟可能导致同步延迟
- **手动同步**: 点击同步按钮重新同步
- **刷新页面**: 尝试刷新页面重新连接

### 视频无法播放
- **格式支持**: 确保视频是MP4格式
- **URL有效性**: 检查视频URL是否可访问
- **跨域限制**: 确保视频服务器允许跨域访问

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发建议
- 保持代码简洁易懂
- 添加必要的注释
- 测试所有功能
- 更新文档

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Socket.io](https://socket.io/) - 实时通信
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Anime.js](https://animejs.com/) - 动画库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交GitHub Issue
- 发送邮件到: [your-email@example.com]

---

**💖 愿这个应用能为你们的观影时光增添更多乐趣！**