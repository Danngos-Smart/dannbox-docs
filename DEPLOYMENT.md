# Deployment Guide

This document explains how to deploy the Dannbox Documentation site.

## Prerequisites

- GitHub account
- Git installed locally
- Bun installed (for local development)
- Docker installed (for testing locally)

## GitHub Container Registry (GHCR) Setup

### 1. Create GitHub Repository

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "initial commit"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Automatic Deployment

The project includes two GitHub Actions workflows:

#### Main Build & Deploy (`.github/workflows/docker-publish.yml`)

Triggers on:
- Push to `main` branch
- Manual workflow dispatch

Actions:
1. Builds the Docker image using Bun
2. Pushes to GitHub Container Registry
3. Tags with:
   - `main` (branch name)
   - `main-<git-sha>` (commit SHA)
   - `latest` (only on main branch)

#### Test Build (`.github/workflows/docker-test.yml`)

Triggers on:
- Pull requests to `main`
- Manual workflow dispatch

Actions:
1. Builds the Docker image
2. Tests that the container starts correctly
3. Does NOT push to registry

### 3. Access the Published Image

Once the workflow runs successfully:

```bash
# Pull the latest image
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest

# Run the container
docker run -p 3000:3000 ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
```

### 4. Making the Package Public

By default, GitHub Packages are private. To make them public:

1. Go to your GitHub repository
2. Click on "Packages" in the right sidebar
3. Select your package (dannbox_docs)
4. Go to "Package settings"
5. Scroll to "Danger Zone"
6. Click "Change visibility"
7. Select "Public"

## Local Docker Testing

### Build the image locally:

```bash
bun run docker:build
```

Or manually:

```bash
docker build -t dannbox-docs .
```

### Run the container:

```bash
bun run docker:run
```

Or manually:

```bash
docker run -p 3000:3000 dannbox-docs
```

### Using Docker Compose:

```bash
# Start the container
bun run docker:compose

# Stop the container
bun run docker:compose:down
```

Or manually:

```bash
# Start
docker-compose up -d

# Stop
docker-compose down
```

## Production Build (without Docker)

### Build for production:

```bash
bun run build
```

### Start the production server:

```bash
bun run start
```

## Environment Variables

Create a `.env.local` file for local development:

```bash
cp .env.local.example .env.local
```

Update the values as needed.

For production, set environment variables in your hosting platform or container orchestration system.

## Deployment Platforms

### Vercel (Recommended for Next.js)

1. Import your GitHub repository
2. Vercel will automatically detect Next.js
3. Configure environment variables if needed
4. Deploy

### Docker-based Platforms

Use the Docker image from GHCR:

- **AWS ECS/Fargate**: Use the GHCR image
- **Google Cloud Run**: Use the GHCR image
- **Azure Container Instances**: Use the GHCR image
- **Railway**: Connect GitHub repo or use GHCR image
- **Fly.io**: Use `fly.toml` with GHCR image
- **DigitalOcean App Platform**: Use GHCR image

### Kubernetes

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dannbox-docs
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dannbox-docs
  template:
    metadata:
      labels:
        app: dannbox-docs
    spec:
      containers:
      - name: dannbox-docs
        image: ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: dannbox-docs-service
spec:
  selector:
    app: dannbox-docs
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

## CI/CD Customization

### Modify Build Triggers

Edit `.github/workflows/docker-publish.yml`:

```yaml
on:
  push:
    branches:
      - main
      - develop  # Add more branches
    tags:
      - 'v*'     # Trigger on version tags
```

### Add Build Arguments

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    labels: ${{ steps.meta.outputs.labels }}
    build-args: |
      NODE_ENV=production
      BUILD_DATE=${{ github.event.repository.updated_at }}
```

## Monitoring

After deployment, monitor:
- Container health: Check if containers are running
- Memory usage: Ensure adequate resources
- Response times: Monitor application performance
- Error logs: Check for runtime errors

## Rollback

To rollback to a previous version:

```bash
# Pull specific version by commit SHA
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:main-<OLD_SHA>

# Run the old version
docker run -p 3000:3000 ghcr.io/YOUR_USERNAME/YOUR_REPO:main-<OLD_SHA>
```

## Troubleshooting

### Build fails in GitHub Actions

- Check GitHub Actions logs
- Verify Docker syntax
- Ensure all dependencies are in `package.json`

### Image is too large

- Check `.dockerignore` is properly configured
- Consider using multi-stage builds (already implemented)
- Remove unnecessary dependencies

### Container fails to start

- Check environment variables
- Verify port 3000 is available
- Check container logs: `docker logs <container-id>`

## Support

For issues or questions:
- Open an issue on GitHub
- Check Nextra documentation: https://nextra.site
- Check Next.js documentation: https://nextjs.org
