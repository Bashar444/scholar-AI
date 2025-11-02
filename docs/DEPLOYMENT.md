# Deployment Guide - Scholar AI

Complete guide for deploying Scholar AI to production.

## Prerequisites

- GitHub repository access
- Vercel account (frontend)
- Google Cloud / Render / Railway account (backend)
- Supabase account
- Anthropic API key

## Frontend Deployment (Vercel)

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

### Step 2: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL = https://api.scholarai.dev
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_key
```

### Step 3: Deploy

```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel --prod
```

**Result:**
- Default domain: `scholar-ai.vercel.app`
- Custom domain: Configure in Vercel settings

### Step 4: Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add custom domain (e.g., `app.scholarai.dev`)
3. Update DNS records
4. SSL auto-provisioned

## Backend Deployment

### Option 1: Google Cloud Run (Recommended)

#### Prerequisites
- Google Cloud account
- `gcloud` CLI installed
- Docker installed

#### Step 1: Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Step 2: Build and Push Image

```bash
# Set project ID
export PROJECT_ID=your-gcp-project
export IMAGE_NAME=scholar-ai-backend

# Build image
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .

# Configure gcloud
gcloud config set project $PROJECT_ID

# Authenticate Docker
gcloud auth configure-docker

# Push image
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest
```

#### Step 3: Deploy to Cloud Run

```bash
gcloud run deploy scholar-ai-backend \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars CLAUDE_API_KEY=$CLAUDE_API_KEY \
  --set-env-vars SUPABASE_URL=$SUPABASE_URL \
  --set-env-vars SUPABASE_KEY=$SUPABASE_KEY \
  --set-env-vars ALLOWED_ORIGINS=https://scholar-ai.vercel.app
```

#### Step 4: Get Service URL

```bash
gcloud run services describe scholar-ai-backend \
  --region us-central1 \
  --format="value(status.url)"
```

**Result:**
- Service URL: `https://scholar-ai-backend-xxxxx.a.run.app`

### Option 2: Render.com

#### Step 1: Push to GitHub

```bash
git push origin main
```

#### Step 2: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: scholar-ai-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Plan**: Starter (paid) or Free

#### Step 3: Set Environment Variables

In Render dashboard → Environment:

```
CLAUDE_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
ALLOWED_ORIGINS=https://scholar-ai.vercel.app
```

#### Step 4: Deploy

- Automatic on git push
- Or manual via "Manual Deploy" button

**Result:**
- Service URL: `https://scholar-ai-backend.onrender.com`

### Option 3: Railway.app

#### Step 1: Connect GitHub

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository

#### Step 2: Configure

- Select Python environment
- Set start command: `uvicorn main:app --host 0.0.0.0 --port 8000`

#### Step 3: Set Secrets

In Railway → Variables:

```
CLAUDE_API_KEY
SUPABASE_URL
SUPABASE_KEY
ALLOWED_ORIGINS
```

#### Step 4: Deploy

- Automatic on git push
- Check logs in Railway dashboard

**Result:**
- Service URL: `https://scholar-ai-backend.up.railway.app`

## Supabase Setup

### Step 1: Create Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Configure:
   - **Name**: scholar-ai
   - **Password**: Generate strong password
   - **Region**: Choose closest to you

### Step 2: Create Storage Bucket

1. Navigate to Storage
2. Create new bucket: `scholar-ai-papers`
3. Set visibility: Private
4. Enable CORS for your frontend domain

### Step 3: Create Database Tables

```sql
-- Papers table
CREATE TABLE papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR NOT NULL,
  file_size INTEGER,
  storage_path VARCHAR,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR DEFAULT 'uploaded',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  role VARCHAR,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_papers_uploaded_at ON papers(uploaded_at);
CREATE INDEX idx_chat_paper_id ON chat_history(paper_id);
```

### Step 4: Get Connection Details

In Supabase → Settings → API:
- Copy `Project URL`
- Copy `anon` key

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://scholar-ai-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Backend (.env)

```env
CLAUDE_API_KEY=your_anthropic_key
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_service_key
API_HOST=0.0.0.0
API_PORT=8000
ENV=production
ALLOWED_ORIGINS=https://scholar-ai.vercel.app,https://www.scholarai.dev
```

## SSL/HTTPS

Both Vercel and Cloud Run provide free SSL:
- Vercel: Automatic for all deployments
- Cloud Run: Automatic HTTPS
- Render: Automatic HTTPS
- Railway: Automatic HTTPS

## Monitoring & Logging

### Vercel
- Real-time logs in dashboard
- Deployment analytics
- Error tracking

### Cloud Run
```bash
# View logs
gcloud run logs read scholar-ai-backend --region us-central1
```

### Render/Railway
- Real-time logs in dashboard
- Error notifications

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Backup Strategy

### Database Backups
- Supabase: Automatic daily backups
- Configuration: Settings → Backups

### Storage Backups
- Enable Supabase backup policy
- Manual exports in Supabase dashboard

## Scaling

### Frontend (Vercel)
- Automatic scaling
- No configuration needed

### Backend

**Increase Resources:**
- Cloud Run: Increase CPU/Memory in settings
- Render: Upgrade plan
- Railway: Increase resources

**Load Balancing:**
- Cloud Run: Built-in
- Set up multiple instances

## Custom Domain

### Setup Steps

1. **Purchase Domain**
   - GoDaddy, Namecheap, etc.

2. **Add to Vercel**
   - Settings → Domains
   - Add custom domain
   - Update DNS records

3. **Verify DNS**
   - Add CNAME or A records
   - SSL provisions automatically

4. **Update Backend CORS**
   - Add new domain to `ALLOWED_ORIGINS`

## Troubleshooting

### Deployment Failures

```bash
# Check logs
gcloud run logs read scholar-ai-backend

# Redeploy
gcloud run deploy scholar-ai-backend --image gcr.io/$PROJECT_ID/scholar-ai-backend:latest
```

### Environment Variables Not Set
```bash
# Verify in Vercel
vercel env ls

# Verify in Cloud Run
gcloud run services describe scholar-ai-backend --format yaml
```

### CORS Issues
- Check `ALLOWED_ORIGINS` env variable
- Ensure frontend domain is included
- Restart service after updating

### Database Connection Issues
```bash
# Test Supabase connection
psql "postgresql://user:password@host/db" -c "SELECT 1"
```

## Rollback

### Vercel
- Settings → Deployments
- Click previous deployment
- Select "Promote to Production"

### Cloud Run
```bash
gcloud run deploy scholar-ai-backend --image previous_image_url
```

## Maintenance

### Updates

```bash
# Frontend
npm update
npm audit fix
git push origin main

# Backend
pip list --outdated
pip install --upgrade package_name
git push origin main
```

### Monitoring

- Set up alerts in Vercel/Cloud Run
- Monitor API response times
- Check error rates
- Review logs daily

---

**Last Updated**: November 2, 2025
