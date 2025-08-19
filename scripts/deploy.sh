#!/bin/bash

# Canadian Citizenship Test Platform Deployment Script
# This script helps you deploy the application to various platforms

echo "🚀 Canadian Citizenship Test Platform Deployment Script"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data

# Setup database
echo "🗄️ Setting up database..."
npm run db:setup

# Build the application
echo "🔨 Building the application..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Create a .env.local file with your environment variables"
echo "2. Choose your deployment platform:"
echo "   - Vercel (Recommended): https://vercel.com"
echo "   - Railway: https://railway.app"
echo "   - DigitalOcean: https://digitalocean.com"
echo ""
echo "📚 For detailed deployment instructions, see README.md"
echo ""
echo "🌐 To run locally: npm run dev"
echo "📊 To view analytics: Check the AdZone components for ad integration"
echo ""
echo "💰 Monetization Ready:"
echo "- Ad zones are already integrated"
echo "- SEO optimized for high traffic"
echo "- Mobile responsive design"
echo "- User authentication system"
echo ""
echo "🎉 Your Canadian Citizenship Test platform is ready to launch!"
