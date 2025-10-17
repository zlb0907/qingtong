# GitHub手动上传备份指南

## 当前状态
由于网络连接问题，无法通过Git命令推送代码到GitHub仓库。我们需要采用手动上传的方式。

## 手动上传步骤

### 1. 准备上传文件列表
以下是需要上传到GitHub的文件：

```
必需文件：
├── server.js (后端主文件)
├── package.json (依赖配置)
├── package-lock.json (依赖锁文件)
├── render.yaml (Render配置)
├── index.html (前端主文件)
├── public/
│   └── index.html (前端页面)
├── RENDER_DEPLOYMENT_GUIDE.md (部署指南)
├── DEPLOYMENT.md (部署文档)
├── FINAL_DEPLOYMENT_GUIDE.md (最终部署指南)
├── GITHUB_MANUAL_UPLOAD.md (GitHub上传指南)
├── VERCEL_ERROR_FIX.md (Vercel错误修复)
└── README.md (项目说明)
```

### 2. GitHub网页上传步骤

#### 步骤1: 访问GitHub仓库
- 打开浏览器访问: https://github.com/zlb0907/qingtong
- 确保你已登录GitHub账号

#### 步骤2: 上传文件
1. 点击 "Add file" 按钮
2. 选择 "Upload files"
3. 拖拽以下文件到上传区域：
   - server.js
   - package.json
   - package-lock.json
   - render.yaml
   - index.html
   - 所有.md文件

#### 步骤3: 创建文件夹
GitHub网页不支持直接上传文件夹，需要手动创建：

1. 点击 "Add file" → "Create new file"
2. 文件名输入: `public/index.html`
3. 将public/index.html的内容复制粘贴进去
4. 点击 "Commit new file"

#### 步骤4: 提交更改
1. 在 "Commit changes" 区域填写提交信息：
   ```
   添加后端代码和Render部署配置
   
   - 添加server.js (Node.js后端服务器)
   - 添加package.json (项目依赖配置)
   - 添加render.yaml (Render部署配置)
   - 添加前端文件 (index.html, public/index.html)
   - 添加部署文档和指南
   ```

2. 点击 "Commit changes"

### 3. 验证上传
上传完成后，检查以下内容：

- ✅ server.js 文件存在且内容完整
- ✅ package.json 文件存在且包含正确依赖
- ✅ render.yaml 文件存在且配置正确
- ✅ index.html 文件存在
- ✅ public/index.html 文件存在
- ✅ 所有.md文档已上传

### 4. Render部署准备
上传完成后，准备Render部署：

#### 服务配置参数：
```
Name: couple-sync-video-backend
Environment: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
Instance Type: Free
Environment Variables:
  - NODE_ENV=production
  - PORT=10000
```

#### 连接GitHub到Render：
1. 访问 https://render.com
2. 使用GitHub账号登录
3. 创建新的Web Service
4. 选择 zlb0907/qingtong 仓库
5. 使用上述配置参数

### 5. 前端配置更新
部署完成后，需要更新前端WebSocket连接地址：

在index.html中找到：
```javascript
// 需要更新为实际的Render服务URL
const socket = io('http://localhost:3001');
```

替换为：
```javascript
const socket = io('https://couple-sync-video-backend-xxx.onrender.com');
```

### 6. 备选方案
如果GitHub上传也遇到问题，可以考虑：

#### 方案A: 使用其他Git平台
- GitLab: https://gitlab.com
- Gitee: https://gitee.com (码云)
- Bitbucket: https://bitbucket.org

#### 方案B: 使用文件分享服务
- 将代码打包成ZIP文件
- 上传到云盘服务
- 在Render部署时直接上传ZIP文件

#### 方案C: 使用Render的Git功能
Render支持直接连接GitHub仓库，如果代码已在本地，可以尝试：
1. 在Render创建服务时选择"Deploy from Git Repository"
2. 选择GitHub作为源代码
3. 授权Render访问你的GitHub仓库

## 技术支持

如果遇到问题：
1. 检查网络连接
2. 验证文件完整性
3. 确认GitHub账号权限
4. 联系Render技术支持

---

完成手动上传后，我们就可以继续进行Render部署了！