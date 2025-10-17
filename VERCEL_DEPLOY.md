# 🚀 Vercel 前端部署指南

## 📋 部署前准备

### 1. 代码准备
确保你的项目包含以下文件：
- `index.html` - 主前端文件
- `vercel.json` - Vercel 配置文件
- `package.json` - 项目配置文件

### 2. GitHub 仓库设置
1. 在 [GitHub](https://github.com) 创建新仓库
2. 将本地代码推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 🔧 Vercel 部署步骤

### 方法1：通过 Vercel 网站部署（推荐）

1. **访问 Vercel**
   - 打开 [https://vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置部署**
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认 (`.`)
   - Build Command: 留空
   - Output Directory: 留空

4. **环境变量**（可选）
   - 点击 "Environment Variables"
   - 添加 `NODE_ENV = production`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

### 方法2：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel --prod
```

4. **按照提示配置**
   - 选择项目目录
   - 确认部署设置
   - 等待部署完成

## ⚙️ 配置说明

### vercel.json 配置详解
```json
{
  "version": 2,                    // Vercel 配置版本
  "name": "couple-sync-video",       // 项目名称
  "builds": [
    {
      "src": "index.html",           // 源文件
      "use": "@vercel/static"        // 使用静态文件构建器
    }
  ],
  "routes": [
    {
      "src": "/(.*)",                // 匹配所有路径
      "dest": "/index.html"          // 重定向到 index.html
    }
  ],
  "env": {
    "NODE_ENV": "production"         // 环境变量
  }
}
```

### 重要配置说明
- **routes**: 确保所有路径都指向 index.html，支持前端路由
- **builds**: 指定静态文件源
- **env**: 设置生产环境变量

## 🔗 后端连接配置

部署后需要更新前端代码中的后端连接地址：

### 在 index.html 中找到并修改：
```javascript
// 本地开发环境
const socket = io('http://localhost:3001');

// 部署后改为生产环境地址
const socket = io('https://你的后端域名.com');
```

### 建议做法：
```javascript
// 使用环境变量或条件判断
const backendUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://你的后端域名.com';
const socket = io(backendUrl);
```

## 🎯 部署后检查清单

- [ ] 访问 Vercel 提供的 .vercel.app 域名
- [ ] 检查页面是否正确加载
- [ ] 测试 WebSocket 连接是否正常
- [ ] 验证房间创建和加入功能
- [ ] 确认视频同步功能
- [ ] 检查移动端适配

## 🌟 自定义域名（可选）

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 解析到 Vercel 提供的地址
3. 等待 DNS 生效

## 🚀 自动部署

每次推送到 GitHub 主分支时，Vercel 会自动重新部署：

1. 修改代码
2. 提交到 GitHub
3. Vercel 自动部署新版本

## 📱 移动端优化

确保你的应用包含以下移动端优化：
- 响应式设计
- 触摸友好的控件
- 适当的字体大小
- 优化的加载速度

## 🔍 故障排除

### 常见问题

1. **部署失败**
   - 检查 vercel.json 语法
   - 确认文件路径正确
   - 查看 Vercel 部署日志

2. **页面空白**
   - 检查浏览器控制台错误
   - 确认静态文件路径正确
   - 验证路由配置

3. **WebSocket 连接失败**
   - 检查后端服务器状态
   - 确认跨域配置正确
   - 验证网络连接

### 获取帮助
- Vercel 文档: https://vercel.com/docs
- Vercel 支持: https://vercel.com/support

## 🎉 完成

部署成功后，你会获得一个类似 `https://couple-sync-video.vercel.app` 的域名，可以立即开始使用你的情侣同步观影应用！

记得与你的朋友分享这个链接，一起享受同步观影的乐趣！🎬✨