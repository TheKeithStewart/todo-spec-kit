# Technical Research & Decisions: StackDay Productivity Platform

**Date**: 2025-11-14
**Input**: plan.md NEEDS CLARIFICATION items + spec.md clarifications
**Purpose**: Finalize all technical decisions before implementation begins

---

## 1. State Management

### Decision

**Zustand** for global state management

### Rationale

For an application with 95 functional requirements and complex state (tasks, focus blocks, calendar events, integrations), we need reliable state management. After evaluating options:

- **Zustand**: Lightweight (3KB), TypeScript-first, minimal boilerplate, no Provider wrapping needed
- **Context API**: Sufficient for simple state but causes re-render issues with complex nested state
- **Redux Toolkit**: Powerful but adds significant bundle size (~20KB) and boilerplate
- **Jotai**: Atomic approach excellent but less mature ecosystem

Zustand provides the best balance of simplicity, performance, and TypeScript support while keeping bundle small.

### Alternatives Considered

| Option        | Pros                                 | Cons                                                    | Bundle Impact | Reason Not Chosen                                                  |
| ------------- | ------------------------------------ | ------------------------------------------------------- | ------------- | ------------------------------------------------------------------ |
| Context API   | Built-in, zero dependencies          | Re-render performance issues, verbose for complex state | 0KB           | Performance concerns with deeply nested state and frequent updates |
| Redux Toolkit | Robust, mature, excellent DevTools   | Heavy bundle size, significant boilerplate              | ~20KB         | Violates minimal dependencies principle for this scale             |
| Jotai         | Atomic, performant, TypeScript-first | Smaller ecosystem, learning curve                       | ~3KB          | Less mature than Zustand, fewer examples available                 |

### Implementation Notes

- Install: `npm install zustand`
- Create stores in `apps/web/src/stores/` following pattern: `{entity}-store.ts`
- Use `create` function with TypeScript interfaces
- Enable DevTools in development: `import { devtools } from 'zustand/middleware'`
- Organize stores by domain: tasks, calendar, integrations, auth

### Constitutional Compliance

✅ **Minimal Dependencies**: Zustand is 3KB, essential for complex state, no simpler alternative meets requirements
✅ **Justification**: Application complexity (11 entities, real-time sync, offline state) requires structured state management

---

## 2. Styling Solution

### Decision

**Tailwind CSS** with design tokens

### Rationale

With 50-75 screens, multi-platform responsive design, and Storybook requirement, Tailwind provides:

- Utility-first approach reduces CSS bundle size
- Excellent responsive design support with breakpoint utilities
- Strong Storybook integration
- Design token system built-in via `tailwind.config.js`
- PostCSS-based, no runtime overhead

### Alternatives Considered

| Option               | Pros                           | Cons                                       | Bundle Impact | Reason Not Chosen                                |
| -------------------- | ------------------------------ | ------------------------------------------ | ------------- | ------------------------------------------------ |
| CSS Modules          | Scoped styles, no dependencies | Manual responsive design, larger CSS files | Variable      | More boilerplate, harder to maintain consistency |
| Styled Components    | Component-scoped, dynamic      | Runtime overhead, larger bundle            | ~15KB         | Runtime cost unacceptable for performance goals  |
| Vanilla CSS + tokens | Zero dependencies              | Manual everything, hard to maintain        | Minimal       | Too much manual work for 50-75 screens           |

### Implementation Notes

- Install: `npm install -D tailwindcss postcss autoprefixer`
- Initialize: `npx tailwindcss init -p`
- Configure design tokens in `tailwind.config.js`:
  - Colors: primary, secondary, accent, neutral shades
  - Typography: font families, sizes, weights
  - Spacing: 4px base scale
  - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Use `@apply` directives sparingly in component styles
- Purge unused styles in production via `content` configuration

### Constitutional Compliance

✅ **Minimal Dependencies**: Tailwind is build-time only, adds no runtime overhead
✅ **Justification**: Scale (50-75 screens, responsive design) justifies utility-first CSS framework

---

## 3. Package Manager

### Decision

**pnpm** (performant npm)

### Rationale

For a monorepo with multiple workspaces (apps/web, apps/api, packages/ui), pnpm provides:

- Fastest installation speed (~30% faster than npm)
- Efficient disk usage with content-addressable store
- Strict dependency resolution prevents phantom dependencies
- Native monorepo support via workspaces
- Drop-in npm replacement (same commands)

### Alternatives Considered

| Option | Pros                        | Cons                           | Bundle Impact | Reason Not Chosen                                   |
| ------ | --------------------------- | ------------------------------ | ------------- | --------------------------------------------------- |
| npm    | Built-in, no install needed | Slower, inefficient disk usage | N/A           | Performance and disk efficiency matter for monorepo |
| yarn   | Fast, good monorepo support | Additional tool to install     | N/A           | pnpm is faster and more efficient                   |

### Implementation Notes

- Install globally: `npm install -g pnpm`
- Initialize monorepo: `pnpm init` in root
- Create `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```
- Use `pnpm -w` for root commands
- Use `pnpm --filter <package>` for workspace-specific commands
- Configure in `.npmrc`:
  ```
  shamefully-hoist=true
  strict-peer-dependencies=false
  ```

### Constitutional Compliance

✅ **Minimal Dependencies**: Package manager is infrastructure, not application dependency
✅ **Justification**: Monorepo architecture requires efficient workspace management

---

## 4. API Pattern

### Decision

**REST** with TypeScript types

### Rationale

For StackDay's MVP requirements, REST provides the best balance:

- Simple, well-understood paradigm
- Supabase PostgREST provides automatic REST API from database
- No additional dependencies needed
- TypeScript types provide end-to-end type safety
- CRUD operations map cleanly to REST verbs

### Alternatives Considered

| Option  | Pros                               | Cons                                      | Bundle Impact  | Reason Not Chosen                               |
| ------- | ---------------------------------- | ----------------------------------------- | -------------- | ----------------------------------------------- |
| GraphQL | Flexible queries, single endpoint  | Complex setup, requires additional server | ~20KB (client) | Over-engineering for CRUD-heavy application     |
| tRPC    | End-to-end TypeScript, no code gen | Requires Node.js backend, learning curve  | ~10KB          | Adds complexity, Supabase already provides REST |

### Implementation Notes

- Use Supabase PostgREST API directly from client
- Create TypeScript types in `packages/shared-types/`
- Organize API client by domain in `apps/web/src/services/`:
  - `task-service.ts`, `calendar-service.ts`, `integration-service.ts`
- Use Supabase client methods:
  ```typescript
  const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId);
  ```
- Implement request/response type checking with Zod if needed

### Constitutional Compliance

✅ **Minimal Dependencies**: REST requires no additional dependencies, Supabase provides it
✅ **Justification**: No simpler alternative exists - API layer is essential

---

## 5. Date/Time Library

### Decision

**date-fns** for calendar and time operations

### Rationale

StackDay requires complex calendar math (focus blocks, routines, break times). date-fns provides:

- Tree-shakeable, import only what you need
- Immutable, functional API (no date mutation bugs)
- Excellent time zone support via `date-fns-tz`
- Comprehensive calendar operations (add, subtract, format, parse)
- Smallest bundle impact with tree-shaking

### Alternatives Considered

| Option            | Pros                            | Cons                                    | Bundle Impact | Reason Not Chosen                                            |
| ----------------- | ------------------------------- | --------------------------------------- | ------------- | ------------------------------------------------------------ |
| Day.js            | Very small, chainable API       | Mutable by default, smaller feature set | ~2KB base     | Time zone support requires plugins, API not as comprehensive |
| Luxon             | Immutable, excellent time zones | Larger bundle size                      | ~20KB         | Bundle size too large for minimal dependencies principle     |
| Temporal polyfill | Future standard, comprehensive  | Polyfill is huge, not stable yet        | ~80KB+        | Way too large, not production-ready                          |

### Implementation Notes

- Install: `npm install date-fns date-fns-tz`
- Use tree-shakeable imports:
  ```typescript
  import { addDays, format, parseISO } from 'date-fns';
  import { formatInTimeZone } from 'date-fns-tz';
  ```
- Create utility functions in `apps/web/src/utils/date-utils.ts`:
  - `calculateFocusBlockEnd(start, duration, breakTime)`
  - `findAvailableTimeSlots(events, duration)`
  - `generateRoutineInstances(routine, startDate, endDate)`
- Always use UTC internally, convert to user's timezone for display
- Store dates as ISO 8601 strings in database

### Constitutional Compliance

✅ **Minimal Dependencies**: date-fns is tree-shakeable, only imports used functions (~5-10KB typical)
✅ **Justification**: Complex calendar math essential for focus blocks and routines, no built-in alternative

---

## 6. Deployment Platform

### Decision

**Vercel** for frontend and serverless functions

### Rationale

Vercel provides optimal integration for our stack:

- Native Vite support (fastest builds)
- Zero-config deployment from Git
- Automatic preview deployments for PRs
- Edge Functions for webhooks (Google Calendar, Todoist)
- Free tier sufficient for MVP (100GB bandwidth, unlimited sites)
- Excellent DX with CLI and dashboard

Supabase handles database and backend, Vercel handles frontend and webhook endpoints.

### Alternatives Considered

| Option  | Pros                      | Cons                                              | Bundle Impact | Reason Not Chosen                               |
| ------- | ------------------------- | ------------------------------------------------- | ------------- | ----------------------------------------------- |
| Netlify | Similar features, good DX | Slower builds than Vercel, less Vite optimization | N/A           | Vercel has better Vite support                  |
| Railway | Full stack hosting        | More expensive, less mature ecosystem             | N/A           | Don't need full backend hosting (have Supabase) |
| AWS     | Maximum flexibility       | Complex setup, requires DevOps expertise          | N/A           | Over-engineering for MVP scale                  |

### Implementation Notes

- Install Vercel CLI: `npm install -g vercel`
- Configure `vercel.json` in root:
  ```json
  {
    "buildCommand": "pnpm build",
    "outputDirectory": "apps/web/dist",
    "installCommand": "pnpm install",
    "framework": "vite"
  }
  ```
- Setup Edge Functions for webhooks in `api/webhooks/`:
  - `google-calendar.ts`
  - `todoist.ts`
- Environment variables via Vercel dashboard:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `TODOIST_CLIENT_ID`, `TODOIST_CLIENT_SECRET`
- Connect Git repository for automatic deployments
- Setup custom domain after MVP launch

### Constitutional Compliance

✅ **Minimal Dependencies**: Deployment platform is infrastructure, not application dependency
✅ **Justification**: Managed platform reduces operational complexity, allows focus on features

---

## 7. Supabase Architecture (Already Chosen)

### Decision

**Supabase** for database, authentication, real-time subscriptions, and storage

### Rationale

Supabase was selected in specification clarifications as the cloud-first database solution. It provides:

- **PostgreSQL database**: Relational data model perfect for tasks, projects, calendar events
- **Supabase Auth**: Email/password + OAuth providers (Google, GitHub) built-in
- **Real-time subscriptions**: Live sync across devices via PostgreSQL replication
- **Row Level Security (RLS)**: Data security at database level
- **Storage**: For future note attachments, user uploads
- **PostgREST API**: Automatic REST API from database schema
- **Minimal dependencies**: Single platform replaces Auth0, PostgreSQL hosting, API server

### Architecture Details

**Database**:

- PostgreSQL 15+ on Supabase cloud
- 11 core tables: User, Task, Project, Label, FocusBlock, CalendarEvent, Calendar, Note, Routine, Integration, DurationModel
- Foreign keys for relationships
- JSONB for flexible data (routine recurrence patterns, integration tokens)
- Indexes on frequently queried columns (user_id, due_date, start_time)

**Authentication**:

- Supabase Auth with JWT tokens
- Email/password for user accounts
- OAuth providers: Google (for calendar), GitHub (for integration), others as needed
- Refresh token rotation for security
- Row Level Security policies enforce user data isolation

**Real-time Sync**:

- Enable real-time on tables: tasks, focus_blocks, calendar_events
- Client subscribes to changes:
  ```typescript
  supabase
    .channel('tasks')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
      // Update local state
    })
    .subscribe();
  ```
- Syncs across all user's devices automatically

**Storage**:

- Bucket for user uploads: `user-content/{user_id}/{filename}`
- Future: Note attachments, profile images
- RLS policies for access control

### Implementation Notes

- Create Supabase project: https://app.supabase.com/projects
- Get credentials: Project URL, anon key, service role key (for admin)
- Database migrations in `apps/api/supabase/migrations/`
- RLS policies in `apps/api/supabase/policies/`
- Client configuration in `apps/web/src/lib/supabase.ts`:

  ```typescript
  import { createClient } from '@supabase/supabase-js';

  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  ```

### Constitutional Compliance

✅ **Minimal Dependencies**: Supabase consolidates auth, database, API, storage in single platform
✅ **Justification**: Essential infrastructure, replaces 4+ separate services with one integrated solution

---

## 8. Webhook + Polling Hybrid Sync Strategy (Already Chosen)

### Decision

**Webhook-first with polling fallback** for Google Calendar and Todoist integrations

### Rationale

This strategy was selected in specification clarifications to provide:

- Near real-time sync when webhooks work (optimal UX)
- Reliability through fallback polling (handles webhook failures)
- 99.8% reduction in API calls vs. pure polling
- Handles service-specific webhook maturity (Google solid, Todoist "best effort")

### Google Calendar Implementation

**Primary: Webhook Notifications**

- Use Google Calendar API watch channels
- Setup requirements:
  - HTTPS endpoint with valid SSL (Vercel provides)
  - Domain verification via Google Search Console
  - Webhook URL whitelist in Google Cloud Console
- Channel expiration: 30 days maximum
- Renewal strategy: Create new channel 1 day before expiration, overlap during transition
- Webhook payload: Headers only (X-Goog-Resource-State, X-Goog-Channel-ID, X-Goog-Message-Number)
- On notification: Call sync token endpoint to retrieve actual changes

**Fallback: Polling**

- Daily full sync check at 3am user's timezone
- Immediate full re-sync on 410 error (expired sync token)
- Per-calendar polling for calendars that don't support webhooks (e.g., "Public holidays")

**Conflict Resolution**:

- Last-write-wins based on timestamp comparison
- External deletion with StackDay dependencies: Mark as "disconnected", notify user
- StackDay edit of deleted item: Show error, offer to recreate or remove

### Todoist Implementation

**Primary: Webhook Optimization**

- Todoist webhooks are "best effort", not reliable
- Setup requirements:
  - HTTPS endpoint (same as Google Calendar)
  - OAuth authentication (required for webhooks)
  - HMAC signature verification (X-Todoist-Hmac-SHA256)
- Webhook limitations:
  - Can arrive out of order
  - May be duplicated (use X-Todoist-Delivery-ID for deduplication)
  - May fail without retry
- Use webhooks as latency optimization, not reliability mechanism

**Fallback: Mandatory Polling**

- Scheduled polling every 5-15 minutes regardless of webhooks
- Treat as primary sync mechanism, webhooks just reduce latency
- Full sync on each poll (projects, tasks, labels, completion status)

**Conflict Resolution**:

- Same as Google Calendar: last-write-wins with user notification
- Handle out-of-order webhooks with timestamp-based conflict resolution
- Deduplicate events using X-Todoist-Delivery-ID header

### Infrastructure Requirements

- Webhook endpoints in Vercel Edge Functions: `api/webhooks/google-calendar.ts`, `api/webhooks/todoist.ts`
- SSL certificate: Automatic via Vercel
- Domain verification: One-time setup in Google Search Console
- Channel renewal job: Scheduled function (daily check) in `api/cron/renew-channels.ts`
- Polling job: Scheduled function in `api/cron/poll-integrations.ts`

### Implementation Notes

**Google Calendar Watch Channel**:

```typescript
// Create watch channel
const response = await google.calendar.events.watch({
  calendarId: 'primary',
  requestBody: {
    id: channelId, // UUID
    type: 'web_hook',
    address: 'https://stackday.com/api/webhooks/google-calendar',
    expiration: Date.now() + 29 * 24 * 60 * 60 * 1000, // 29 days
  },
});
```

**Todoist Webhook Verification**:

```typescript
import crypto from 'crypto';

function verifyTodoistWebhook(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('base64');
  return signature === expectedSignature;
}
```

### Constitutional Compliance

✅ **Minimal Dependencies**: Uses official Google/Todoist SDKs, no additional sync libraries
✅ **Justification**: Complex integration requirements necessitate robust sync strategy

---

## 9. Data Model Documentation

### Decision

Documented in separate file: `data-model.md`

See `specs/001-stackday-platform/data-model.md` for complete entity definitions, relationships, and validation rules.

---

## 10. API Contracts Documentation

### Decision

Documented in separate directory: `contracts/`

See `specs/001-stackday-platform/contracts/` for REST API endpoint specifications.

---

## 11. Quickstart Guide

### Decision

Documented in separate file: `quickstart.md`

See `specs/001-stackday-platform/quickstart.md` for local development setup instructions.

---

## Summary of Technical Stack

| Category         | Choice            | Bundle Impact   | Justification                             |
| ---------------- | ----------------- | --------------- | ----------------------------------------- |
| State Management | Zustand           | ~3KB            | Minimal, performant, TypeScript-first     |
| Styling          | Tailwind CSS      | Build-time only | Utility-first, design tokens, responsive  |
| Package Manager  | pnpm              | N/A             | Fastest, efficient, monorepo support      |
| API Pattern      | REST (PostgREST)  | 0KB             | Supabase provides, no additional deps     |
| Date/Time        | date-fns          | ~5-10KB         | Tree-shakeable, immutable, comprehensive  |
| Deployment       | Vercel            | N/A             | Optimal Vite integration, Edge Functions  |
| Database         | Supabase          | N/A             | PostgreSQL, auth, real-time, storage      |
| Sync Strategy    | Webhook + Polling | N/A             | Optimal UX, reliable, 99.8% API reduction |

**Total Added Bundle Size**: ~8-13KB (Zustand + date-fns only)

All other dependencies are build-time (Tailwind), infrastructure (Supabase, Vercel), or development tools (pnpm).

---

## Constitutional Compliance Summary

✅ **Design-First Development**: Prototype (User Story 2) comes before feature implementation
✅ **Comprehensive Testing**: Playwright configured, E2E tests throughout implementation plan
✅ **Minimal Dependencies**: Every dependency justified, total runtime bundle additions < 15KB

**Approved Dependencies**:

- React, TypeScript, Vite: Required for application architecture (95 requirements, 50-75 screens)
- Storybook: Constitutional requirement for design system (spec FR-009)
- Playwright: Constitutional requirement for E2E testing (Principle II)
- Zustand: Essential for complex state management across 11 entities
- Tailwind CSS: Build-time only, essential for responsive multi-platform design
- date-fns: Tree-shakeable, essential for calendar and routine operations
- Supabase SDK: Essential for database, auth, real-time sync

**Research Complete**: All technical decisions finalized and documented.

**Next Steps**: Proceed to Phase 1 (Setup) to initialize monorepo structure and tooling.
