# Vercel Deployment Configuration

## Overview
This file contains Vercel deployment configuration for Scholar AI frontend.

## Configuration Details

### Build Settings
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/.next`
- **Framework**: Next.js
- **Node Version**: 18.x

### Environment Variables

All environment variables are configured in `vercel.json`:

```json
{
  "NEXT_PUBLIC_API_URL": "https://your-backend-api.com",
  "NEXT_PUBLIC_SUPABASE_URL": "https://iumykjacuflyrbgyntku.supabase.co",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bXlramFjdWZseXJiZ3ludGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcxMTQsImV4cCI6MjA3NzY2MzExNH0.iCrOx47Q4r2BsSsexGlwrmoucyQ5uG5bamvQlIg3ZEk"
}
```

### Supabase Configuration

**Supabase URL**
```
https://iumykjacuflyrbgyntku.supabase.co
```

**Supabase Anon Key**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bXlramFjdWZseXJiZ3ludGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcxMTQsImV4cCI6MjA3NzY2MzExNH0.iCrOx47Q4r2BsSsexGlwrmoucyQ5uG5bamvQlIg3ZEk
```

## Deployment Steps

### Step 1: Connect GitHub Repository
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Connect your GitHub account
4. Select `https://github.com/Bashar444/scholar-AI.git`

### Step 2: Configure Project
1. **Project Name**: `scholar-ai`
2. **Root Directory**: Leave empty (Vercel will detect Next.js)
3. **Framework Preset**: Next.js
4. **Build Command**: `cd frontend && npm install && npm run build`
5. **Output Directory**: `frontend/.next`
6. **Install Command**: `npm install --legacy-peer-deps`

### Step 3: Add Environment Variables
In Vercel dashboard > Project Settings > Environment Variables, add:

```
NEXT_PUBLIC_API_URL = https://your-backend-api.com
NEXT_PUBLIC_SUPABASE_URL = https://iumykjacuflyrbgyntku.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bXlramFjdWZseXJiZ3ludGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcxMTQsImV4cCI6MjA3NzY2MzExNH0.iCrOx47Q4r2BsSsexGlwrmoucyQ5uG5bamvQlIg3ZEk
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Your site will be live at `https://scholar-ai.vercel.app`

## Automatic Deployments

Once connected, your project will:
- ✅ Auto-deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Automatically rollback on failed builds

## Important Notes

⚠️ **Backend API URL**: Replace `https://your-backend-api.com` with your actual backend deployment URL (Cloud Run, Railway, Render, etc.)

⚠️ **Security**: The Supabase anon key is public-facing (starts with "eyJhbGciOi..."). This is safe because Supabase Row Level Security (RLS) policies protect your data. Keep it in the codebase.

⚠️ **Production Credentials**: These are production Supabase credentials. Ensure RLS policies are enabled in Supabase dashboard.

## Troubleshooting

### Build Fails with "frontend not found"
- Ensure root directory is correct
- Check `vercel.json` build command

### Env variables not loading
- Redeploy after adding variables
- Check `.env.local` is in `.gitignore`
- Verify variables start with `NEXT_PUBLIC_` for frontend

### CORS Errors
- Check backend URL is correct
- Add proper CORS headers in backend
- Verify backend is running and accessible

## Related Files

- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to ignore during deployment
- `frontend/.env.local` - Local development env vars
- `frontend/.env.example` - Env var template
- `next.config.ts` - Next.js configuration

## Monitoring

After deployment, monitor at:
- https://vercel.com/dashboard/scholar-ai
- Check deployment logs and analytics
- Monitor error rates and performance

## Rollback Procedure

To rollback to a previous deployment:
1. Go to Vercel dashboard
2. Select Scholar AI project
3. Go to "Deployments" tab
4. Find the deployment you want to rollback to
5. Click "..." menu
6. Select "Promote to Production"

## Next Steps

1. ✅ Complete backend deployment (Cloud Run, Railway, or Render)
2. ✅ Add backend API URL to `NEXT_PUBLIC_API_URL`
3. ✅ Test end-to-end functionality
4. ✅ Monitor performance and errors
5. ✅ Setup custom domain (optional)

---

**Deployment Date**: November 2, 2025  
**Frontend Framework**: Next.js 15  
**Hosting Provider**: Vercel  
**Database**: Supabase (PostgreSQL)  
**Status**: ✅ Ready for Deployment
