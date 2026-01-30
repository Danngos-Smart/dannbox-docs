# Dannbox Documentation

Documentation site built with [Nextra 4](https://nextra.site/) and Next.js 16, using Bun as package manager and runtime.

## Features

- 📚 Built with Nextra 4 for beautiful documentation
- 📱 3-column layout: Sidebar navigation + Content + Table of Contents (TOC)
- ⚡ Uses Bun for fast package management and runtime
- 🐳 Docker support with multi-stage builds (Bun-based)
- 🚀 GitHub Actions CI/CD pipeline
- 📦 Automatic publishing to GitHub Container Registry (GHCR)
- 🔄 Optimized production builds with Next.js standalone output
- 🎨 Modern and responsive design with Nextra Docs Theme
- 📑 **3-Column Layout**: Sidebar navigation + Main content + Table of Contents
- 🔍 Automatic TOC generation from document headings
- 📱 Fully responsive design with mobile support

## Development

This project uses [Bun](https://bun.sh) as the package manager and runtime for optimal performance.

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Building for Production

Build the application:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Docker

The Docker image uses Bun for both building and running the application, providing faster startup times and better performance.

### Build the Docker image locally

```bash
docker build -t dannbox-docs .
```

### Run the Docker container

```bash
docker run -p 3000:3000 dannbox-docs
```

### Pull from GitHub Container Registry

Once the CI/CD pipeline runs, you can pull the image:

```bash
docker pull ghcr.io/OWNER/REPO:latest
```

Replace `OWNER/REPO` with your GitHub username and repository name.

## Getting Started with Git and GitHub

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "initial setup: nextra documentation with docker and ci/cd"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `dannbox-docs`)
3. Do NOT initialize with README, .gitignore, or license (we already have them)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## CI/CD Pipeline

The project includes TWO GitHub Actions workflows:

### 1. Docker Publish (`.github/workflows/docker-publish.yml`)

**Triggers on:**
- Push to `main` branch
- Manual workflow dispatch

**Actions:**
1. Builds the Docker image using Bun
2. Publishes to GitHub Container Registry (ghcr.io)
3. Tags the image with:
   - `main` (branch name)
   - `main-<commit-sha>`
   - `latest` (for main branch)

### 2. Docker Test (`.github/workflows/docker-test.yml`)

**Triggers on:**
- Pull requests to `main`
- Manual workflow dispatch

**Actions:**
1. Builds the Docker image
2. Tests container startup
3. Does NOT push to registry

### Accessing Your Published Image

After the first push to `main`:

```bash
# Pull the latest image
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest

# Run it
docker run -p 3000:3000 ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
```

Visit `http://localhost:3000` to see your documentation site.

### Making the Package Public

By default, GitHub Packages are private. To make public:

1. Go to your GitHub repository
2. Click "Packages" in the right sidebar
3. Select your package
4. Go to "Package settings"
5. Scroll to "Danger Zone"
6. Click "Change visibility" → Select "Public"

## Project Structure

```
.
├── pages/              # Documentation pages (MDX)
│   ├── _app.tsx       # Custom App component
│   ├── _meta.json     # Navigation configuration
│   ├── index.mdx      # Home page
│   └── docs/          # Documentation section
├── public/            # Static assets
├── .github/
│   └── workflows/     # GitHub Actions workflows
├── Dockerfile         # Multi-stage Docker build
├── next.config.js     # Next.js configuration
├── theme.config.tsx   # Nextra theme configuration
└── package.json       # Dependencies and scripts
```

## Layout Structure

The documentation uses a 3-column layout:
- **Left Sidebar**: Navigation menu (auto-generated from `_meta.ts` files)
- **Center**: Main content from `.mdx` files
- **Right TOC**: "On this page" navigation (auto-generated from `##` and `###` headings in MDX)

## Customization

### Theme Configuration

Edit `app/layout.tsx` to customize:
- Logo and navbar
- Project links
- Footer content
- Repository base URL
- Sidebar and TOC behavior

### Navigation

Edit `content/_meta.ts` to configure the navigation structure:

```typescript
export default {
  index: 'Introduction',
  'getting-started': 'Getting Started',
  configuration: 'Configuration',
  api: 'API Reference',
  examples: 'Examples'
} as const
```

### Content

Add or edit `.mdx` files in the `content/` directory to create documentation pages.

**File Structure:**
```
content/
├── _meta.ts           # Navigation configuration
├── index.mdx          # Home page
├── getting-started.mdx
├── configuration.mdx
├── api.mdx
└── examples.mdx
```

### Adding New Pages

1. Create a new `.mdx` file in `content/` directory:
   ```mdx
   # My New Page
   
   Content here...
   ```

2. Add it to `content/_meta.ts`:
   ```typescript
   export default {
     // ... existing pages
     'my-new-page': 'My New Page'
   } as const
   ```

## License

MIT
