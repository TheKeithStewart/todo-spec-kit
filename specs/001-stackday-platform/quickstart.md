# Quickstart Guide: StackDay Local Development

**Last Updated**: 2025-11-14
**Purpose**: Guide developers through local setup and common development workflows

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: v8.0.0 or higher
  ```bash
  npm install -g pnpm
  ```
- **Git**: Latest version
- **Supabase CLI**: For local database
  ```bash
  npm install -g supabase
  ```
- **VS Code** (recommended): With extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - PostgreSQL (optional, for database queries)

---

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd todo-spec-kit
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

This will install dependencies for:

- Root workspace
- `apps/web` (Frontend)
- `apps/api` (Backend/Edge Functions)
- `packages/ui` (Design system)
- `packages/shared-types` (TypeScript types)

### 3. Environment Variables

Create `.env` files for each app:

**apps/web/.env.local**:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google Calendar (for OAuth)
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# Todoist (for OAuth)
VITE_TODOIST_CLIENT_ID=your-todoist-client-id

# Environment
VITE_ENV=development
```

**apps/api/.env.local** (for Edge Functions):

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth Secrets
GOOGLE_CLIENT_SECRET=your-google-client-secret
TODOIST_CLIENT_SECRET=your-todoist-client-secret

# Webhook Verification
GOOGLE_WEBHOOK_SECRET=your-webhook-secret
TODOIST_WEBHOOK_SECRET=your-webhook-secret
```

### 4. Supabase Setup

#### Option A: Use Cloud Supabase (Recommended for MVP)

1. Create project at [app.supabase.com](https://app.supabase.com)
2. Get credentials from Project Settings > API
3. Copy to `.env.local` files above

#### Option B: Local Supabase (For Development)

```bash
# Start local Supabase (requires Docker)
cd apps/api
supabase start

# Copy the output credentials to .env.local:
# - API URL
# - anon key
# - service_role key
```

### 5. Database Migrations

```bash
# Run migrations
cd apps/api
supabase db push

# Or if using remote Supabase:
supabase link --project-ref your-project-ref
supabase db push
```

### 6. Seed Development Data (Optional)

```bash
# Seed database with test data
cd apps/api
supabase db seed
```

This creates:

- Test user account
- Sample tasks and projects
- Example focus blocks
- Test calendar events

**Test User Credentials**:

- Email: `dev@stackday.local`
- Password: `devpassword123`

---

## Development Workflows

### Start Development Servers

```bash
# From repository root, start all services
pnpm dev
```

This starts:

- **Frontend (Web)**: http://localhost:5173
- **Storybook (UI)**: http://localhost:6006
- **Supabase Studio**: http://localhost:54323 (if using local)

Or start individually:

```bash
# Frontend only
pnpm --filter @stackday/web dev

# Storybook only
pnpm --filter @stackday/ui storybook

# API functions (Vercel local)
pnpm --filter @stackday/api dev
```

### Running Tests

```bash
# Run all tests
pnpm test

# Unit tests (Vitest)
pnpm test:unit

# Integration tests (Vitest)
pnpm test:integration

# E2E tests (Playwright)
pnpm test:e2e

# E2E with UI
pnpm test:e2e:ui

# Test specific workspace
pnpm --filter @stackday/web test
```

### Linting and Formatting

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Fix linting issues
pnpm lint:fix

# Check formatting without writing
pnpm format:check
```

These run automatically on pre-commit via husky.

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific workspace
pnpm --filter @stackday/web build
pnpm --filter @stackday/ui build

# Build outputs:
# - apps/web/dist/ (Frontend)
# - packages/ui/dist/ (Design system)
```

### Type Checking

```bash
# Type check all TypeScript
pnpm type-check

# Watch mode
pnpm type-check:watch
```

---

## Database Operations

### View Database

- **Local**: http://localhost:54323 (Supabase Studio)
- **Remote**: https://app.supabase.com/project/{project}/editor

### Create Migration

```bash
cd apps/api

# Create new migration
supabase migration new add_new_feature

# Edit: apps/api/supabase/migrations/{timestamp}_add_new_feature.sql

# Apply migration
supabase db push
```

### Reset Database (Local Only)

```bash
cd apps/api
supabase db reset
```

**⚠️ Warning**: This drops all data and re-runs migrations.

### Generate TypeScript Types

```bash
# Generate types from database schema
cd apps/api
supabase gen types typescript --local > ../../packages/shared-types/src/database.ts

# Or for remote:
supabase gen types typescript --project-id your-project > ../../packages/shared-types/src/database.ts
```

Run this after any schema changes.

---

## Common Development Tasks

### Add New Component to Design System

```bash
# 1. Create component file
touch packages/ui/src/components/NewComponent.tsx

# 2. Create Storybook story
touch packages/ui/src/components/NewComponent.stories.tsx

# 3. Export from index
# Edit: packages/ui/src/index.ts

# 4. View in Storybook
pnpm --filter @stackday/ui storybook
```

### Add New Page to Web App

```bash
# 1. Create page component
touch apps/web/src/pages/NewPage.tsx

# 2. Add route
# Edit: apps/web/src/router.tsx

# 3. Test locally
pnpm --filter @stackday/web dev
```

### Add New Service

```bash
# 1. Create service file
touch apps/web/src/services/new-service.ts

# 2. Create tests
touch apps/web/tests/unit/services/new-service.spec.ts

# 3. Run tests
pnpm --filter @stackday/web test:unit
```

### Add New Store (Zustand)

```bash
# 1. Create store file
touch apps/web/src/stores/new-store.ts

# 2. Create tests
touch apps/web/tests/unit/stores/new-store.spec.ts

# 3. Use in components
# import { useNewStore } from '@/stores/new-store'
```

### Setup New Integration

```bash
# 1. Create integration service
touch apps/web/src/services/integrations/new-integration-service.ts

# 2. Create webhook handler (Edge Function)
touch apps/api/api/webhooks/new-integration.ts

# 3. Add OAuth configuration
# - Google Cloud Console for OAuth
# - Add redirect URLs
# - Get client ID and secret

# 4. Update .env files with credentials

# 5. Create E2E test
touch apps/web/tests/e2e/integrations/new-integration.spec.ts
```

---

## Debugging

### Frontend Debugging

**VS Code Launch Configuration** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Web App",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/apps/web/src",
      "sourceMaps": true
    }
  ]
}
```

**Browser DevTools**:

- React DevTools extension
- Zustand DevTools (automatic in dev mode)
- Network tab for API requests

### Database Debugging

```bash
# View logs
supabase logs

# Run query in psql
supabase db psql
```

Example queries:

```sql
-- View all tables
\dt

-- Describe table
\d tasks

-- Count tasks by user
SELECT user_id, COUNT(*) FROM tasks GROUP BY user_id;

-- View RLS policies
SELECT * FROM pg_policies WHERE tablename = 'tasks';
```

### Supabase Debugging

- **Local**: Check docker logs: `docker logs supabase_db_stackday`
- **Remote**: View logs in Supabase dashboard
- **Auth issues**: Check JWT token expiration
- **RLS issues**: Verify policies in Supabase Studio > Authentication > Policies

---

## Troubleshooting

### "Module not found" errors

```bash
# Clean install
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Supabase connection fails

1. Check `.env.local` has correct URL and keys
2. Verify Supabase project is running (local or remote)
3. Check network connectivity
4. Verify API key hasn't been revoked

### Storybook won't start

```bash
# Clear Storybook cache
pnpm --filter @stackday/ui storybook:clean

# Rebuild
pnpm --filter @stackday/ui build
```

### Playwright tests fail

```bash
# Install browsers
pnpm playwright install

# Run with UI to debug
pnpm test:e2e:ui
```

### Type errors after database schema change

```bash
# Regenerate types
cd apps/api
supabase gen types typescript --local > ../../packages/shared-types/src/database.ts

# Rebuild packages
pnpm build
```

### Port already in use

```bash
# Kill process on port 5173 (frontend)
kill -9 $(lsof -ti:5173)

# Or change port in apps/web/vite.config.ts:
server: { port: 5174 }
```

---

## Production Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Or connect Git repo for auto-deploy:
# - Link repository in Vercel dashboard
# - Set environment variables in Vercel project settings
# - Push to main branch triggers deployment
```

### Database (Supabase)

Database is already hosted on Supabase. Run migrations:

```bash
cd apps/api
supabase link --project-ref your-production-project
supabase db push
```

### Environment Variables (Vercel)

In Vercel Dashboard > Project Settings > Environment Variables:

- Add all production secrets
- Use different values than development
- Set scope to "Production"

---

## Project Structure Reference

```
todo-spec-kit/
├── apps/
│   ├── web/                    # Frontend React app
│   │   ├── src/
│   │   │   ├── components/     # Page-specific components
│   │   │   ├── pages/          # Route components
│   │   │   ├── services/       # API clients
│   │   │   ├── stores/         # Zustand stores
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── utils/          # Helper functions
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── lib/            # Third-party configs
│   │   │   └── router.tsx      # Route configuration
│   │   ├── tests/
│   │   │   ├── e2e/            # Playwright tests
│   │   │   ├── integration/    # Integration tests
│   │   │   └── unit/           # Unit tests
│   │   └── vite.config.ts
│   │
│   └── api/                    # Backend Edge Functions
│       ├── api/
│       │   ├── webhooks/       # Webhook handlers
│       │   └── cron/           # Scheduled jobs
│       └── supabase/
│           ├── migrations/     # Database migrations
│           └── seed.sql        # Development seed data
│
├── packages/
│   ├── ui/                     # Design system
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── tokens/         # Design tokens
│   │   │   └── styles/         # Global styles
│   │   └── .storybook/         # Storybook config
│   │
│   ├── shared-types/           # Shared TypeScript types
│   │   └── src/
│   │       └── database.ts     # Generated from Supabase
│   │
│   └── utils/                  # Shared utilities
│       └── src/
│
├── specs/                      # Design documents
│   └── 001-stackday-platform/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── tasks.md
│       └── quickstart.md       # This file
│
├── pnpm-workspace.yaml         # Workspace configuration
├── package.json                # Root package.json
├── tsconfig.json               # Root TypeScript config
└── .gitignore
```

---

## Useful Commands Cheat Sheet

```bash
# Development
pnpm dev                        # Start all dev servers
pnpm --filter @stackday/web dev # Start frontend only
pnpm --filter @stackday/ui storybook # Start Storybook

# Testing
pnpm test                       # Run all tests
pnpm test:unit                  # Unit tests only
pnpm test:e2e                   # E2E tests only
pnpm test:e2e:ui                # E2E with Playwright UI

# Building
pnpm build                      # Build all packages
pnpm type-check                 # Type check all TypeScript

# Linting/Formatting
pnpm lint                       # Lint all code
pnpm format                     # Format all code
pnpm lint:fix                   # Auto-fix linting issues

# Database (from apps/api/)
supabase start                  # Start local Supabase
supabase stop                   # Stop local Supabase
supabase db reset               # Reset local database
supabase db push                # Run migrations
supabase migration new {name}   # Create new migration
supabase gen types typescript   # Generate TypeScript types

# Package Management
pnpm add {package}              # Add to root
pnpm add {package} --filter @stackday/web # Add to specific workspace
pnpm remove {package}           # Remove from root
pnpm update {package}           # Update package

# Deployment
vercel --prod                   # Deploy to production
```

---

## Getting Help

- **Documentation**: `specs/001-stackday-platform/` directory
- **Issues**: GitHub Issues
- **Team Chat**: Slack #stackday-dev
- **Database**: Supabase Dashboard or local Studio
- **Design System**: Storybook at http://localhost:6006

---

## Next Steps After Setup

1. **Explore Storybook**: View all available components

   ```bash
   pnpm --filter @stackday/ui storybook
   ```

2. **Run Frontend**: See the app in action

   ```bash
   pnpm --filter @stackday/web dev
   ```

3. **Review Database**: Explore schema in Supabase Studio

4. **Run Tests**: Ensure everything works

   ```bash
   pnpm test
   ```

5. **Read Implementation Plan**: `specs/001-stackday-platform/plan.md`

6. **Check Tasks**: `specs/001-stackday-platform/tasks.md` for implementation order

---

**Setup Complete!** 🎉

You should now have:

- ✅ All dependencies installed
- ✅ Environment variables configured
- ✅ Database running with migrations
- ✅ Development servers running
- ✅ Tests passing

Start implementing features from `tasks.md` Phase 2 onwards!
