# Canadian Citizenship Test - Production Deployment Script
# Run this script to prepare for deployment

Write-Host "🚀 Canadian Citizenship Test - Deployment Preparation" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if Git is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>$null
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install from: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "   After installing Git, restart PowerShell and run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Run build test
Write-Host "🔨 Testing production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green

# Export data for migration
Write-Host "📊 Exporting database for migration..." -ForegroundColor Yellow
npm run db:export
Write-Host "✅ Data exported to migration.sql" -ForegroundColor Green

# Initialize Git repository if not already done
if (-not (Test-Path ".git")) {
    Write-Host "📝 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Canadian Citizenship Test App"
    git branch -M main
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
    
    # Add and commit any changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "📝 Committing latest changes..." -ForegroundColor Yellow
        git add .
        git commit -m "Updates for production deployment"
        Write-Host "✅ Changes committed" -ForegroundColor Green
    } else {
        Write-Host "✅ No changes to commit" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository at: https://github.com/new" -ForegroundColor White
Write-Host "2. Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/canadian-citizenship-test.git" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Deploy to Vercel:" -ForegroundColor White
Write-Host "   - Go to https://vercel.com" -ForegroundColor Yellow
Write-Host "   - Click 'New Project'" -ForegroundColor Yellow
Write-Host "   - Import your GitHub repository" -ForegroundColor Yellow
Write-Host "   - Set environment variables (see DEPLOYMENT.md)" -ForegroundColor Yellow
Write-Host ""
Write-Host "📄 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"