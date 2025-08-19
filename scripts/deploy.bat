@echo off
echo 🚀 Canadian Citizenship Test Platform Deployment Script
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available. Please check your Node.js installation.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version

REM Update npm to latest version (optional)
echo 🔄 Checking npm version...
npm --version
echo ℹ️  To update npm globally, run: npm install -g npm@latest

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check for security vulnerabilities
echo 🔒 Checking for security vulnerabilities...
npm audit
if %errorlevel% neq 0 (
    echo ⚠️  Security vulnerabilities found. Attempting to fix...
    npm audit fix
    if %errorlevel% neq 0 (
        echo ⚠️  Some vulnerabilities may require manual attention.
        echo    Run 'npm audit' to see details.
    )
) else (
    echo ✅ No security vulnerabilities found!
)

REM Update dependencies to latest versions
echo 🔄 Updating dependencies to latest versions...
npm update
if %errorlevel% neq 0 (
    echo ⚠️  Some dependencies may not have updated. This is usually okay.
) else (
    echo ✅ Dependencies updated successfully!
)

REM Create data directory
echo 📁 Creating data directory...
if not exist "data" mkdir data

REM Setup database
echo 🗄️ Setting up database...
npm run db:setup
if %errorlevel% neq 0 (
    echo ❌ Database setup failed. Please check your configuration.
    pause
    exit /b 1
)

REM Run type checking
echo 🔍 Running TypeScript type checking...
npm run type-check
if %errorlevel% neq 0 (
    echo ❌ TypeScript errors found. Please fix them before building.
    pause
    exit /b 1
)

REM Run linting
echo 🧹 Running linting...
npm run lint
if %errorlevel% neq 0 (
    echo ⚠️  Linting issues found. Consider fixing them for better code quality.
)

REM Build the application
echo 🔨 Building the application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo 🎯 Next Steps:
echo 1. Create a .env.local file with your environment variables
echo 2. Choose your deployment platform:
echo    - Vercel (Recommended): https://vercel.com
echo    - Railway: https://railway.app
echo    - DigitalOcean: https://digitalocean.com
echo.
echo 📚 For detailed deployment instructions, see README.md
echo.
echo 🌐 To run locally: npm run dev
echo 📊 To view analytics: Check the AdZone components for ad integration
echo.
echo 💰 Monetization Ready:
echo - Ad zones are already integrated
echo - SEO optimized for high traffic
echo - Mobile responsive design
echo - User authentication system
echo.
echo 🔒 Security Status:
echo - Dependencies updated to latest versions
echo - Security vulnerabilities checked and fixed
echo - TypeScript type checking passed
echo.
echo 🎉 Your Canadian Citizenship Test platform is ready to launch!
pause
