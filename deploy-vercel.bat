@echo off
echo 🚀 开始Vercel部署流程...
echo.

REM 检查Git状态
echo 📋 检查Git状态...
git status
if %errorlevel% neq 0 (
    echo ❌ Git状态检查失败
    pause
    exit /b 1
)

REM 添加所有更改
echo 📁 添加更改...
git add .
if %errorlevel% neq 0 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)

REM 提交更改
echo 💾 提交更改...
git commit -m "准备Vercel部署"
if %errorlevel% neq 0 (
    echo ⚠️  没有更改需要提交，继续...
)

REM 推送到GitHub
echo ⬆️  推送到GitHub...
git push origin master
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查网络连接
    pause
    exit /b 1
)

echo ✅ 代码已推送到GitHub！
echo.
echo 📱 下一步操作：
echo 1. 访问 https://vercel.com
echo 2. 登录你的GitHub账户
echo 3. 点击 "New Project"
echo 4. 选择 qingtong 仓库
echo 5. 点击 "Deploy"
echo.
echo 🔧 配置建议：
echo - Framework Preset: Static
echo - Build Command: (留空)
echo - Output Directory: (留空)
echo.
echo 📖 详细说明请参考 VERCEL_FIX.md 文件
echo.
pause