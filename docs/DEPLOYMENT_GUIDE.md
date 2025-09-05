# RightsCard Deployment Guide

## Overview

This guide covers deploying RightsCard to various hosting platforms. The application is built as a static single-page application (SPA) optimized for modern web browsers.

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Git for version control
- Modern web browser for testing

## Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_BASE_API_KEY=your_api_key_here
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
```

### 3. Build for Production
```bash
npm run build
```

This creates a `dist/` directory with optimized static files:
- `index.html` - Main HTML file
- `assets/` - CSS, JavaScript, and other assets
- All files are minified and optimized for production

### 4. Preview Build Locally
```bash
npm run preview
```

## Deployment Platforms

### Vercel (Recommended)

**Why Vercel?**
- Automatic HTTPS
- Global CDN
- Zero configuration
- Perfect for React SPAs

**Deployment Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Build Settings** (vercel.json)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### Netlify

**Deployment Steps:**

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Configure Redirects** (_redirects file in public/)
   ```
   /*    /index.html   200
   ```

4. **Environment Variables**
   - Add environment variables in Netlify dashboard
   - Settings > Environment variables

### GitHub Pages

**Deployment Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script** (package.json)
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Configure Repository**
   - Go to repository Settings > Pages
   - Select "gh-pages" branch as source

### Firebase Hosting

**Deployment Steps:**

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configure** (firebase.json)
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### AWS S3 + CloudFront

**Deployment Steps:**

1. **Create S3 Bucket**
   - Enable static website hosting
   - Set index document to `index.html`
   - Set error document to `index.html`

2. **Upload Files**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront**
   - Create distribution with S3 as origin
   - Set default root object to `index.html`
   - Configure custom error pages (404 → /index.html)

4. **Automate with GitHub Actions**
   ```yaml
   name: Deploy to S3
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Deploy to S3
           run: aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
   ```

## Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Docker Commands
```bash
# Build image
docker build -t rightscard .

# Run container
docker run -p 80:80 rightscard

# Docker Compose
docker-compose up -d
```

## Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   ```bash
   npm install --save-dev vite-bundle-analyzer
   npm run build -- --analyze
   ```

2. **Code Splitting**
   - Lazy load components
   - Dynamic imports for heavy features
   - Route-based splitting

3. **Asset Optimization**
   - Image compression
   - Icon optimization
   - Font subsetting

### Runtime Optimization

1. **Service Worker** (Future Enhancement)
   ```javascript
   // sw.js
   const CACHE_NAME = 'rightscard-v1';
   const urlsToCache = [
     '/',
     '/static/js/bundle.js',
     '/static/css/main.css'
   ];

   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then((cache) => cache.addAll(urlsToCache))
     );
   });
   ```

2. **CDN Configuration**
   - Cache static assets for 1 year
   - Cache HTML for 1 hour
   - Use compression (gzip/brotli)

## Security Configuration

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  media-src 'self' blob:;
  connect-src 'self' https://api.base.org;
  font-src 'self';
">
```

### HTTPS Configuration
- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies
- Implement proper CORS policies

### Environment Variables
```env
# Production
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://api.rightscard.app
REACT_APP_SENTRY_DSN=your_sentry_dsn

# Development
REACT_APP_ENVIRONMENT=development
REACT_APP_API_URL=http://localhost:3001
```

## Monitoring and Analytics

### Error Tracking
```javascript
// Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENVIRONMENT,
});
```

### Performance Monitoring
```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy RightsCard
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Domain Configuration

### Custom Domain Setup

1. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```

2. **SSL Certificate**
   - Automatic with Vercel/Netlify
   - Let's Encrypt for custom setups
   - CloudFlare for additional security

### Subdomain Strategy
- `app.rightscard.com` - Main application
- `api.rightscard.com` - API endpoints (future)
- `docs.rightscard.com` - Documentation
- `status.rightscard.com` - Status page

## Backup and Recovery

### Data Backup
- User data stored locally (no server backup needed)
- Code repository backup on GitHub
- Build artifacts stored in CI/CD

### Disaster Recovery
1. **Repository Recovery**
   - Multiple Git remotes
   - Regular repository backups
   - Documentation in multiple locations

2. **Deployment Recovery**
   - Multiple deployment targets
   - Automated rollback procedures
   - Health check monitoring

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Security audit quarterly
- [ ] Performance review quarterly
- [ ] Legal database updates
- [ ] Browser compatibility testing

### Monitoring Checklist
- [ ] Application uptime
- [ ] Performance metrics
- [ ] Error rates
- [ ] User feedback
- [ ] Security alerts

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Routing Issues**
   - Ensure SPA redirects are configured
   - Check server configuration for client-side routing
   - Verify base URL configuration

3. **Media API Issues**
   - Requires HTTPS in production
   - Check browser permissions
   - Verify microphone/camera access

4. **Performance Issues**
   - Analyze bundle size
   - Check for memory leaks
   - Optimize images and assets

### Debug Commands
```bash
# Check build output
npm run build -- --debug

# Analyze bundle
npm run build -- --analyze

# Test production build locally
npm run preview

# Check for security vulnerabilities
npm audit
```

---

*This deployment guide is maintained alongside the codebase and updated with each release.*
