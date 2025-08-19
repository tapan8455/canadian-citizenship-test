# PowerShell script to install Node.js on Windows
# This script will download and install the latest LTS version of Node.js

Write-Host "🚀 Installing Node.js for Canadian Citizenship Test Platform..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is already installed
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js is already installed: $nodeVersion" -ForegroundColor Green
        Write-Host "✅ npm is available: $(npm --version)" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 You're all set! You can now run:" -ForegroundColor Cyan
        Write-Host "   npm install" -ForegroundColor White
        Write-Host "   npm run db:setup" -ForegroundColor White
        Write-Host "   npm run dev" -ForegroundColor White
        exit 0
    }
} catch {
    # Node.js not found, continue with installation
}

Write-Host "📥 Downloading Node.js LTS installer..." -ForegroundColor Yellow

# Get the latest LTS version
try {
    $nodeVersions = Invoke-RestMethod -Uri "https://nodejs.org/dist/index.json"
    $latestLTS = $nodeVersions | Where-Object { $_.lts -ne $false } | Select-Object -First 1
    $version = $latestLTS.version
    $versionNumber = $version.Substring(1) # Remove 'v' prefix
    
    Write-Host "Latest LTS version: $version" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Could not fetch latest version, using fallback version" -ForegroundColor Yellow
    $versionNumber = "18.19.0"
}

# Determine architecture
$arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }

# Download URL
$downloadUrl = "https://nodejs.org/dist/v$versionNumber/node-v$versionNumber-$arch.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

Write-Host "📥 Downloading from: $downloadUrl" -ForegroundColor Yellow

# Download the installer
try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "✅ Download completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to download Node.js installer" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download Node.js manually from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🔧 Installing Node.js..." -ForegroundColor Yellow
Write-Host "This may take a few minutes. Please wait..." -ForegroundColor Yellow

# Install Node.js silently
try {
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait
    Write-Host "✅ Node.js installation completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install Node.js" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Clean up installer
if (Test-Path $installerPath) {
    Remove-Item $installerPath -Force
}

Write-Host ""
Write-Host "🔄 Refreshing environment variables..." -ForegroundColor Yellow

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host ""
Write-Host "✅ Node.js installation completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 You can now run the following commands:" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor White
Write-Host "   npm run db:setup" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "💡 If you still get 'npm not found' errors, please close and reopen your terminal." -ForegroundColor Yellow
Write-Host ""

# Test if npm is now available
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ npm is working: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "⚠️  npm not found in current session. Please restart your terminal." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  npm not found in current session. Please restart your terminal." -ForegroundColor Yellow
}
