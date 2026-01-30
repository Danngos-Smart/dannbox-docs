# Contributing to Dannbox Documentation

Thank you for your interest in contributing to Dannbox Documentation!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Install Bun** (if not already installed)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

3. **Install dependencies**
   ```bash
   bun install
   ```

4. **Run development server**
   ```bash
   bun run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
dannbox_docs/
├── app/                      # Next.js App Router
│   ├── [[...mdxPath]]/      # Catch-all route for content
│   ├── layout.tsx           # Root layout with Nextra theme
│   └── globals.css          # Global styles
├── content/                  # Documentation content (MDX files)
│   ├── _meta.ts             # Navigation configuration
│   ├── index.mdx            # Home page
│   └── *.mdx                # Documentation pages
├── public/                   # Static assets
├── .github/workflows/        # CI/CD pipelines
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
└── package.json             # Dependencies and scripts
```

## Writing Documentation

### Creating a New Page

1. Create a new `.mdx` file in the `content/` directory:

```mdx
# Page Title

Introduction paragraph...

## Section 1

Content here...

### Subsection

More content...

## Code Examples

\```typescript
const example = "code";
\```
```

2. Add the page to navigation in `content/_meta.ts`:

```typescript
export default {
  index: 'Introduction',
  'your-new-page': 'Your New Page Title',
  // ... rest
} as const
```

### Markdown Features

Nextra supports all standard Markdown plus:

- **Syntax highlighting**
  \```javascript
  console.log('Hello World')
  \```

- **Callouts**
  ```mdx
  > **Note**
  > This is a note callout
  
  > **Warning**
  > This is a warning
  ```

- **Tables**
  ```markdown
  | Column 1 | Column 2 |
  |----------|----------|
  | Data 1   | Data 2   |
  ```

- **Links**
  ```markdown
  [Internal Link](/docs/page)
  [External Link](https://example.com)
  ```

### Best Practices

1. **Use descriptive headings** - Make them scannable
2. **Keep paragraphs short** - 2-4 sentences max
3. **Use code examples** - Show, don't just tell
4. **Add links** - Cross-reference related topics
5. **Check spelling** - Use a spell checker

## Code Style

### TypeScript/JavaScript

- Use ES6+ features
- Prefer `const` over `let`
- Use descriptive variable names
- Add type annotations in TypeScript

### MDX

- Use proper heading hierarchy (h1 → h2 → h3)
- Add code language identifiers
- Use relative links for internal pages
- Keep line length reasonable (80-100 chars)

## Testing

### Local Testing

```bash
# Start dev server
bun run dev

# Build for production
bun run build

# Test production build
bun run start
```

### Docker Testing

```bash
# Build Docker image
bun run docker:build

# Run container
bun run docker:run

# Or use Docker Compose
bun run docker:compose
```

### Linting

```bash
bun run lint
```

## Making a Contribution

### 1. Fork the Repository

Click "Fork" on GitHub to create your copy.

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

- Write your code/documentation
- Test locally
- Follow the style guide

### 4. Commit Changes

```bash
git add .
git commit -m "add: descriptive commit message"
```

**Commit Message Format:**
- `add: description` - New features/pages
- `update: description` - Improvements to existing content
- `fix: description` - Bug fixes
- `docs: description` - Documentation changes
- `style: description` - Formatting, no code change
- `refactor: description` - Code restructuring

### 5. Push to GitHub

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Select your branch
4. Write a clear description
5. Submit PR

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors
- [ ] Tests pass (if applicable)
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### PR Description Should Include

1. **What** - What changes does this PR make?
2. **Why** - Why are these changes needed?
3. **How** - How were the changes implemented?
4. **Testing** - How was this tested?

### Example PR Description

```markdown
## What
Adds configuration guide for environment variables

## Why
Users need clear documentation on how to configure the application

## How
- Created new configuration.mdx page
- Added examples for each env variable
- Updated navigation in _meta.ts

## Testing
- Tested locally with `bun run dev`
- Verified all links work
- Checked responsive design
```

## Code Review Process

1. **Automated checks** - CI/CD runs automatically
2. **Maintainer review** - A maintainer will review your PR
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, PR will be merged
5. **Deployment** - Changes automatically deploy on merge to main

## Getting Help

- **Questions?** Open a [Discussion](https://github.com/YOUR_USERNAME/YOUR_REPO/discussions)
- **Bug?** Open an [Issue](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)
- **Security?** Email security@example.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## Thank You! 🎉

Your contributions make this project better for everyone!
