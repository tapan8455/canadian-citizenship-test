# 🚀 Production Deployment Guide

## Prerequisites Checklist

- [ ] **Git installed** ([Download here](https://git-scm.com/download/win))
- [ ] **GitHub account** ([Sign up here](https://github.com))
- [ ] **Vercel account** ([Sign up here](https://vercel.com)) - FREE
- [ ] **Domain name** (optional but recommended)

## 🎯 Quick Deployment (Vercel - Recommended)

### Step 1: Install Git (if not installed)
```bash
# Download and install from: https://git-scm.com/download/win
# Then verify installation:
git --version
```

### Step 2: Prepare Your Code
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for production deployment"

# Create main branch
git branch -M main
```

### Step 3: Push to GitHub
```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/canadian-citizenship-test.git
git push -u origin main
```

### Step 4: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure these environment variables:**

```env
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters-long
DATABASE_URL=postgresql://username:password@host:port/database
GA_MEASUREMENT_ID=your-google-analytics-id-optional
```

### Step 5: Database Setup

**Option A: Vercel Postgres (Recommended)**
1. In Vercel dashboard → Storage → Create Database
2. Choose PostgreSQL
3. Copy connection string to `DATABASE_URL`

**Option B: Neon Database (Free Tier)**
1. Go to [neon.tech](https://neon.tech)
2. Create free PostgreSQL database
3. Copy connection string

### Step 6: Migrate Data
```bash
# Export current SQLite data
npm run db:export

# This creates migration.sql file
# Upload and run this SQL in your PostgreSQL database
```

### Step 7: Deploy!
- Vercel will automatically deploy when you push to GitHub
- Your app will be live at: `https://your-app-name.vercel.app`

## 🔧 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Your production URL | `https://yourapp.vercel.app` |
| `NEXTAUTH_SECRET` | Secret key for JWT | `your-32-char-secret-key` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `GA_MEASUREMENT_ID` | Google Analytics ID (optional) | `G-XXXXXXXXXX` |

## 🗄️ Database Migration Steps

### 1. Export Current Data
```bash
npm run db:export
```

### 2. Set up PostgreSQL Schema
Run the `scripts/postgresql-schema.sql` in your PostgreSQL database:

```sql
-- Run this in your PostgreSQL database console
\i scripts/postgresql-schema.sql
```

### 3. Import Your Data
Run the generated `migration.sql` file in your PostgreSQL database.

### 4. Update Database Config
Your app will automatically use PostgreSQL in production when `DATABASE_URL` is set.

## 🌐 Custom Domain Setup

### 1. Purchase Domain
- **Namecheap** (recommended)
- **GoDaddy**
- **Google Domains**

### 2. Configure DNS
In Vercel:
1. Go to project settings
2. Add custom domain
3. Update your domain's DNS to point to Vercel

### 3. SSL Certificate
Vercel automatically provides free SSL certificates.

## 📊 Post-Deployment Setup

### 1. Google Analytics
```javascript
// Add your GA_MEASUREMENT_ID to environment variables
// The code is already integrated in the app
```

### 2. Google Search Console
1. Add your domain to [Google Search Console](https://search.google.com/search-console)
2. Verify ownership
3. Submit sitemap: `https://yourapp.com/sitemap.xml`

### 3. Performance Monitoring
- **Vercel Analytics** (built-in)
- **Google PageSpeed Insights**
- **GTmetrix**

## 🚀 Alternative Deployment Options

### Option 2: Railway
```bash
# 1. Go to railway.app
# 2. Connect GitHub repository
# 3. Add PostgreSQL service
# 4. Set environment variables
# Cost: $5/month
```

### Option 3: DigitalOcean App Platform
```bash
# 1. Go to cloud.digitalocean.com
# 2. Create new App
# 3. Connect repository
# 4. Add PostgreSQL database
# Cost: $12/month
```

## 🔐 Security Checklist

- [ ] **Strong NEXTAUTH_SECRET** (32+ characters)
- [ ] **Environment variables** set correctly
- [ ] **Database backups** configured
- [ ] **SSL certificate** active (automatic with Vercel)
- [ ] **Rate limiting** enabled (already implemented)

## 📈 SEO & Marketing Setup

### 1. Google Analytics
- Add `GA_MEASUREMENT_ID` to environment variables
- Verify tracking is working

### 2. Meta Tags
- Already optimized in the app
- Update `app/layout.tsx` with your domain

### 3. Social Media
- **Open Graph** tags already set
- **Twitter Cards** configured
- Update images in `public/` folder

## 🎯 Success Metrics to Track

### Traffic
- **Unique visitors per month**
- **Page views**
- **Session duration**
- **Bounce rate**

### Engagement
- **Test completion rate**
- **Return users**
- **Questions answered per session**

### Revenue (when ads are enabled)
- **AdSense revenue**
- **Click-through rates**
- **Cost per acquisition**

## 🆘 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

**Database Connection Issues:**
- Verify `DATABASE_URL` format
- Check PostgreSQL credentials
- Ensure database exists

**Environment Variables Not Working:**
- Restart Vercel deployment
- Check variable names (case sensitive)
- Verify no trailing spaces

### Getting Help
- **Vercel Discord**: [discord.gg/vercel](https://discord.gg/vercel)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Stack Overflow**: Tag questions with `nextjs`, `vercel`, `postgresql`

## ✅ Deployment Checklist

- [ ] Git repository created and pushed to GitHub
- [ ] Vercel account created and project imported
- [ ] Environment variables configured
- [ ] Database setup (PostgreSQL)
- [ ] Data migrated from SQLite
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Google Analytics setup
- [ ] Performance monitoring enabled
- [ ] Backup strategy implemented

## 🎉 You're Live!

Once deployed, your Canadian Citizenship Test app will be:
- ✅ **Globally accessible**
- ✅ **Auto-scaling**
- ✅ **HTTPS secure**
- ✅ **CDN optimized**
- ✅ **Production ready**

**Your app is now ready to help thousands of people prepare for their Canadian citizenship test!** 🇨🇦

---

**Need help?** Contact support or check the troubleshooting section above.
