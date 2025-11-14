# Tasks: StackDay Productivity Platform

**Input**: Design documents from `/specs/001-stackday-platform/`
**Prerequisites**: plan.md (complete), spec.md (complete with clarifications)

**Tests**: Playwright E2E tests are required per constitutional principle II. Tests are included throughout.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**MVP Scope**: User Story 2 (Prototype & Design System) + User Story 1 (Core Tasks & Focus Blocks) + User Story 3 (Google Calendar) + User Story 3 (Todoist) per clarifications.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Per plan.md, using monorepo structure:
- Frontend: `apps/web/src/`
- Backend: `apps/api/src/`
- Shared UI: `packages/ui/src/`
- Tests: `apps/web/tests/`, `apps/api/tests/`

---

## Phase 0: Technical Research & Decisions

**Purpose**: Resolve remaining NEEDS CLARIFICATION items from plan.md

- [ ] T001 [P] Research and document state management choice (Redux Toolkit vs Zustand vs Jotai vs Context API) in specs/001-stackday-platform/research.md
- [ ] T002 [P] Research and document styling solution (Tailwind CSS vs CSS Modules vs Styled Components) in specs/001-stackday-platform/research.md
- [ ] T003 [P] Research and document package manager choice (npm vs pnpm vs yarn) in specs/001-stackday-platform/research.md
- [ ] T004 [P] Research and document API pattern choice (REST vs GraphQL vs tRPC) in specs/001-stackday-platform/research.md
- [ ] T005 [P] Research and document date/time library (date-fns vs Day.js vs Luxon) in specs/001-stackday-platform/research.md
- [ ] T006 [P] Research and document deployment platform (Vercel vs Netlify vs Railway) in specs/001-stackday-platform/research.md
- [ ] T007 Document Supabase architecture decisions (already chosen) in specs/001-stackday-platform/research.md
- [ ] T008 Document webhook + polling hybrid sync strategy (already chosen) in specs/001-stackday-platform/research.md
- [ ] T009 Create data model documentation in specs/001-stackday-platform/data-model.md based on spec entities
- [ ] T010 Create API contracts in specs/001-stackday-platform/contracts/ directory
- [ ] T011 Create quickstart guide in specs/001-stackday-platform/quickstart.md

**Checkpoint**: All research complete, technical stack finalized

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and monorepo structure

- [ ] T012 Initialize monorepo with chosen package manager at repository root
- [ ] T013 Create project structure: apps/web/, apps/api/, packages/ui/, docs/
- [ ] T014 [P] Configure TypeScript 5.3+ with strict mode in root tsconfig.json
- [ ] T015 [P] Configure ESLint and Prettier in root .eslintrc.js and .prettierrc
- [ ] T016 [P] Setup Vite 5+ for apps/web with React 18+ in apps/web/vite.config.ts
- [ ] T017 [P] Initialize Supabase project and get connection credentials
- [ ] T018 [P] Setup environment variable management (.env files for local, secure storage for production)
- [ ] T019 [P] Configure Vitest for unit/integration tests in apps/web/vitest.config.ts
- [ ] T020 [P] Configure Playwright for E2E tests in apps/web/playwright.config.ts
- [ ] T021 [P] Initialize Storybook 7+ in packages/ui/.storybook/
- [ ] T022 [P] Setup Git hooks (husky/lint-staged) for pre-commit linting
- [ ] T023 Create CI/CD pipeline configuration for chosen deployment platform

**Checkpoint**: Project structure ready, all tooling configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Database & Authentication

- [ ] T024 Create Supabase database schema for User table with preferences in apps/api/supabase/migrations/001_create_users.sql
- [ ] T025 Setup Supabase Auth configuration with email/password and OAuth providers in Supabase dashboard
- [ ] T026 [P] Create authentication middleware for API routes in apps/api/src/middleware/auth.ts
- [ ] T027 [P] Create Supabase client configuration in apps/web/src/lib/supabase.ts
- [ ] T028 [P] Implement user authentication context in apps/web/src/contexts/AuthContext.tsx

### Design System Foundation

- [ ] T029 [P] Define design tokens (colors, typography, spacing) in packages/ui/src/tokens/index.ts
- [ ] T030 [P] Create base Button component with variants in packages/ui/src/components/Button.tsx
- [ ] T031 [P] Create Button Storybook story in packages/ui/src/components/Button.stories.tsx
- [ ] T032 [P] Create base Input component in packages/ui/src/components/Input.tsx
- [ ] T033 [P] Create Input Storybook story in packages/ui/src/components/Input.stories.tsx
- [ ] T034 [P] Create base Card component in packages/ui/src/components/Card.tsx
- [ ] T035 [P] Create Card Storybook story in packages/ui/src/components/Card.stories.tsx

### Core Infrastructure

- [ ] T036 [P] Setup error handling utilities in apps/web/src/utils/errors.ts and apps/api/src/utils/errors.ts
- [ ] T037 [P] Setup logging infrastructure in apps/api/src/utils/logger.ts
- [ ] T038 [P] Create API client wrapper for Supabase queries in apps/web/src/services/api-client.ts
- [ ] T039 [P] Setup routing configuration in apps/web/src/router.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 2 - Create Prototype and Design System (Priority: P1) 🎯 MVP

**Goal**: Build functional prototype to validate core workflows and establish design system before full implementation

**Independent Test**: Prototype demonstrates task creation and focus block workflows on desktop, mobile, and tablet; Storybook documents all components

### Prototype Implementation

- [ ] T040 [US2] Create low-fidelity prototype layouts in Figma or design tool (external to codebase)
- [ ] T041 [P] [US2] Create responsive layout components (Header, Sidebar, Main) in packages/ui/src/components/Layout/
- [ ] T042 [P] [US2] Create Grid/Flex layout utilities in packages/ui/src/components/Layout/Grid.tsx
- [ ] T043 [US2] Create prototype dashboard page in apps/web/src/pages/PrototypeDashboard.tsx
- [ ] T044 [P] [US2] Create prototype task list component in apps/web/src/components/prototype/TaskList.tsx
- [ ] T045 [P] [US2] Create prototype calendar view component in apps/web/src/components/prototype/CalendarView.tsx
- [ ] T046 [P] [US2] Create prototype focus block creation modal in apps/web/src/components/prototype/FocusBlockModal.tsx
- [ ] T047 [US2] Wire up prototype interactions (no backend persistence) with local state

### Design System Components

- [ ] T048 [P] [US2] Create Modal component with variants in packages/ui/src/components/Modal.tsx
- [ ] T049 [P] [US2] Create Modal Storybook story in packages/ui/src/components/Modal.stories.tsx
- [ ] T050 [P] [US2] Create Dropdown component in packages/ui/src/components/Dropdown.tsx
- [ ] T051 [P] [US2] Create Dropdown Storybook story in packages/ui/src/components/Dropdown.stories.tsx
- [ ] T052 [P] [US2] Create DatePicker component in packages/ui/src/components/DatePicker.tsx
- [ ] T053 [P] [US2] Create DatePicker Storybook story in packages/ui/src/components/DatePicker.stories.tsx
- [ ] T054 [P] [US2] Create TimePicker component in packages/ui/src/components/TimePicker.tsx
- [ ] T055 [P] [US2] Create TimePicker Storybook story in packages/ui/src/components/TimePicker.stories.tsx
- [ ] T056 [P] [US2] Create Checkbox component in packages/ui/src/components/Checkbox.tsx
- [ ] T057 [P] [US2] Create Checkbox Storybook story in packages/ui/src/components/Checkbox.stories.tsx
- [ ] T058 [P] [US2] Create Select component in packages/ui/src/components/Select.tsx
- [ ] T059 [P] [US2] Create Select Storybook story in packages/ui/src/components/Select.stories.tsx
- [ ] T060 [P] [US2] Create Badge component for labels in packages/ui/src/components/Badge.tsx
- [ ] T061 [P] [US2] Create Badge Storybook story in packages/ui/src/components/Badge.stories.tsx
- [ ] T062 [P] [US2] Create Alert/Notification component in packages/ui/src/components/Alert.tsx
- [ ] T063 [P] [US2] Create Alert Storybook story in packages/ui/src/components/Alert.stories.tsx

### Responsive Design Implementation

- [ ] T064 [P] [US2] Implement responsive breakpoint utilities in packages/ui/src/utils/breakpoints.ts
- [ ] T065 [P] [US2] Create mobile navigation component in packages/ui/src/components/MobileNav.tsx
- [ ] T066 [P] [US2] Create tablet-optimized layout adaptations in packages/ui/src/components/Layout/TabletLayout.tsx
- [ ] T067 [US2] Test prototype on desktop (1920x1080), mobile (375x667), tablet (768x1024)
- [ ] T068 [US2] Test prototype rotation behavior on tablet devices

### Prototype Validation & Testing

- [ ] T069 [US2] Conduct user testing sessions with 10+ test users
- [ ] T070 [US2] Document prototype feedback in specs/001-stackday-platform/prototype-feedback.md
- [ ] T071 [US2] Iterate on prototype based on user feedback
- [ ] T072 [P] [US2] Write Playwright E2E test for prototype task creation flow in apps/web/tests/e2e/prototype/task-creation.spec.ts
- [ ] T073 [P] [US2] Write Playwright E2E test for prototype focus block creation in apps/web/tests/e2e/prototype/focus-block.spec.ts
- [ ] T074 [P] [US2] Write Playwright E2E test for responsive behavior in apps/web/tests/e2e/prototype/responsive.spec.ts

### Documentation

- [ ] T075 [P] [US2] Document design system usage guidelines in docs/design-system/README.md
- [ ] T076 [P] [US2] Document component variants and props in Storybook docs tab
- [ ] T077 [US2] Create design system versioning strategy in docs/design-system/versioning.md

**Checkpoint**: Prototype validated with users, design system foundation complete

---

## Phase 4: User Story 1 - View and Manage Tasks with Focus Blocks (Priority: P1) 🎯 MVP

**Goal**: Enable users to create tasks, create focus blocks, assign tasks to blocks, and receive time allocation warnings

**Independent Test**: User can create tasks, create focus blocks, assign tasks to blocks, see warnings when over-allocated, enter focus mode

### Database Schema

- [ ] T078 [P] [US1] Create Task table schema in apps/api/supabase/migrations/002_create_tasks.sql
- [ ] T079 [P] [US1] Create Project table schema in apps/api/supabase/migrations/003_create_projects.sql
- [ ] T080 [P] [US1] Create Label table schema in apps/api/supabase/migrations/004_create_labels.sql
- [ ] T081 [P] [US1] Create FocusBlock table schema in apps/api/supabase/migrations/005_create_focus_blocks.sql
- [ ] T082 [P] [US1] Create task_labels junction table in apps/api/supabase/migrations/006_create_task_labels.sql
- [ ] T083 [P] [US1] Create focus_block_tasks junction table in apps/api/supabase/migrations/007_create_focus_block_tasks.sql
- [ ] T084 Run all migrations on Supabase database

### TypeScript Types

- [ ] T085 [P] [US1] Define Task type in apps/web/src/types/task.ts
- [ ] T086 [P] [US1] Define Project type in apps/web/src/types/project.ts
- [ ] T087 [P] [US1] Define Label type in apps/web/src/types/label.ts
- [ ] T088 [P] [US1] Define FocusBlock type in apps/web/src/types/focus-block.ts

### API Services

- [ ] T089 [P] [US1] Implement Task service with CRUD operations in apps/web/src/services/task-service.ts
- [ ] T090 [P] [US1] Implement Project service with CRUD operations in apps/web/src/services/project-service.ts
- [ ] T091 [P] [US1] Implement Label service with CRUD operations in apps/web/src/services/label-service.ts
- [ ] T092 [P] [US1] Implement FocusBlock service with CRUD operations in apps/web/src/services/focus-block-service.ts
- [ ] T093 [US1] Implement time allocation calculation logic in apps/web/src/utils/time-allocation.ts
- [ ] T094 [US1] Implement focus block warning logic in apps/web/src/utils/focus-block-warnings.ts

### State Management

- [ ] T095 [P] [US1] Create task store/state management in apps/web/src/stores/task-store.ts
- [ ] T096 [P] [US1] Create focus block store/state management in apps/web/src/stores/focus-block-store.ts
- [ ] T097 [P] [US1] Create project store/state management in apps/web/src/stores/project-store.ts
- [ ] T098 [P] [US1] Create label store/state management in apps/web/src/stores/label-store.ts

### UI Components

- [ ] T099 [P] [US1] Create TaskCard component in apps/web/src/components/TaskCard.tsx
- [ ] T100 [P] [US1] Create TaskList component in apps/web/src/components/TaskList.tsx
- [ ] T101 [P] [US1] Create TaskForm component for create/edit in apps/web/src/components/TaskForm.tsx
- [ ] T102 [P] [US1] Create FocusBlockCard component in apps/web/src/components/FocusBlockCard.tsx
- [ ] T103 [P] [US1] Create FocusBlockForm component in apps/web/src/components/FocusBlockForm.tsx
- [ ] T104 [P] [US1] Create TimeAllocationWarning component in apps/web/src/components/TimeAllocationWarning.tsx
- [ ] T105 [P] [US1] Create ProjectSelector component in apps/web/src/components/ProjectSelector.tsx
- [ ] T106 [P] [US1] Create LabelSelector component in apps/web/src/components/LabelSelector.tsx
- [ ] T107 [US1] Create FocusMode view component in apps/web/src/components/FocusMode.tsx

### Pages

- [ ] T108 [US1] Create Dashboard page in apps/web/src/pages/Dashboard.tsx
- [ ] T109 [US1] Create Tasks page in apps/web/src/pages/Tasks.tsx
- [ ] T110 [US1] Wire up routing for dashboard and tasks pages

### Integration & Polish

- [ ] T111 [US1] Implement drag-and-drop for assigning tasks to focus blocks
- [ ] T112 [US1] Implement keyboard shortcuts for task creation (Ctrl/Cmd+K)
- [ ] T113 [US1] Add loading states and error handling to all components
- [ ] T114 [US1] Implement optimistic updates for task operations

### Playwright E2E Tests

- [ ] T115 [P] [US1] Write E2E test for creating a task in apps/web/tests/e2e/us1/create-task.spec.ts
- [ ] T116 [P] [US1] Write E2E test for creating focus block in apps/web/tests/e2e/us1/create-focus-block.spec.ts
- [ ] T117 [P] [US1] Write E2E test for assigning tasks to focus block in apps/web/tests/e2e/us1/assign-tasks.spec.ts
- [ ] T118 [P] [US1] Write E2E test for time allocation warning in apps/web/tests/e2e/us1/time-warning.spec.ts
- [ ] T119 [P] [US1] Write E2E test for entering focus mode in apps/web/tests/e2e/us1/focus-mode.spec.ts
- [ ] T120 [P] [US1] Write E2E test for spontaneous focus mode creation in apps/web/tests/e2e/us1/spontaneous-focus.spec.ts

**Checkpoint**: Core task and focus block management functional, independently tested

---

## Phase 5: User Story 3 - Integrate Google Calendar (Priority: P2) 🎯 MVP

**Goal**: Connect Google Calendar, display events, create focus blocks around meetings, handle break times

**Independent Test**: User connects Google Calendar account, sees calendar events, creates focus blocks that respect existing meetings, break times calculated correctly

### Database Schema

- [ ] T121 [P] [US3] Create Integration table schema in apps/api/supabase/migrations/008_create_integrations.sql
- [ ] T122 [P] [US3] Create Calendar table schema in apps/api/supabase/migrations/009_create_calendars.sql
- [ ] T123 [P] [US3] Create CalendarEvent table schema in apps/api/supabase/migrations/010_create_calendar_events.sql
- [ ] T124 [P] [US3] Create calendar_event_tasks junction table in apps/api/supabase/migrations/011_create_calendar_event_tasks.sql
- [ ] T125 Run all new migrations on Supabase database

### TypeScript Types

- [ ] T126 [P] [US3] Define Integration type in apps/web/src/types/integration.ts
- [ ] T127 [P] [US3] Define Calendar type in apps/web/src/types/calendar.ts
- [ ] T128 [P] [US3] Define CalendarEvent type in apps/web/src/types/calendar-event.ts

### Google Calendar OAuth Integration

- [ ] T129 [US3] Setup Google Cloud Console project and OAuth 2.0 credentials
- [ ] T130 [US3] Configure OAuth consent screen in Google Cloud Console
- [ ] T131 [US3] Add authorized redirect URIs to Google Cloud Console
- [ ] T132 [P] [US3] Implement Google Calendar OAuth flow initiation in apps/api/src/integrations/google-calendar/oauth.ts
- [ ] T133 [P] [US3] Implement OAuth callback handler in apps/api/src/integrations/google-calendar/callback.ts
- [ ] T134 [US3] Implement token refresh logic in apps/api/src/integrations/google-calendar/token-refresh.ts
- [ ] T135 [US3] Store OAuth tokens securely in Supabase Integration table

### Webhook Setup

- [ ] T136 [US3] Setup public HTTPS endpoint for Google Calendar webhooks
- [ ] T137 [US3] Implement domain verification in Google Search Console
- [ ] T138 [US3] Whitelist webhook URL in Google Cloud Console
- [ ] T139 [P] [US3] Implement webhook receiver endpoint in apps/api/src/integrations/google-calendar/webhook-receiver.ts
- [ ] T140 [P] [US3] Implement watch channel creation logic in apps/api/src/integrations/google-calendar/watch-channel.ts
- [ ] T141 [US3] Implement channel renewal logic (30-day expiration) in apps/api/src/integrations/google-calendar/channel-renewal.ts
- [ ] T142 [US3] Setup daily full sync check as fallback in apps/api/src/integrations/google-calendar/daily-sync.ts

### Sync Logic

- [ ] T143 [US3] Implement sync token retrieval on webhook notification in apps/api/src/integrations/google-calendar/sync-token.ts
- [ ] T144 [US3] Implement calendar list sync in apps/api/src/integrations/google-calendar/sync-calendars.ts
- [ ] T145 [US3] Implement calendar event sync in apps/api/src/integrations/google-calendar/sync-events.ts
- [ ] T146 [US3] Implement bi-directional sync (StackDay → Google) in apps/api/src/integrations/google-calendar/push-changes.ts
- [ ] T147 [US3] Implement 410 error handling for expired sync tokens in apps/api/src/integrations/google-calendar/error-handling.ts

### Conflict Detection & Break Handling

- [ ] T148 [US3] Implement conflict detection logic in apps/web/src/utils/conflict-detection.ts
- [ ] T149 [US3] Implement break time calculation in apps/web/src/utils/break-calculation.ts
- [ ] T150 [US3] Implement smart break handling (reduce to fit, minimum 5 min) in apps/web/src/utils/smart-breaks.ts

### API Services

- [ ] T151 [P] [US3] Implement Google Calendar integration service in apps/web/src/services/google-calendar-service.ts
- [ ] T152 [P] [US3] Implement Calendar service with CRUD operations in apps/web/src/services/calendar-service.ts
- [ ] T153 [P] [US3] Implement CalendarEvent service with CRUD operations in apps/web/src/services/calendar-event-service.ts

### State Management

- [ ] T154 [P] [US3] Create calendar store/state management in apps/web/src/stores/calendar-store.ts
- [ ] T155 [P] [US3] Create calendar event store in apps/web/src/stores/calendar-event-store.ts
- [ ] T156 [P] [US3] Create integration store in apps/web/src/stores/integration-store.ts

### UI Components

- [ ] T157 [P] [US3] Create GoogleCalendarConnect button component in apps/web/src/components/integrations/GoogleCalendarConnect.tsx
- [ ] T158 [P] [US3] Create CalendarSelector component for choosing calendars in apps/web/src/components/CalendarSelector.tsx
- [ ] T159 [P] [US3] Create CalendarEventCard component in apps/web/src/components/CalendarEventCard.tsx
- [ ] T160 [P] [US3] Create CalendarView component (month/week/day views) in apps/web/src/components/CalendarView.tsx
- [ ] T161 [P] [US3] Create ConflictNotification component in apps/web/src/components/ConflictNotification.tsx
- [ ] T162 [P] [US3] Create BreakTimeIndicator visual component in apps/web/src/components/BreakTimeIndicator.tsx

### Pages & Integration

- [ ] T163 [US3] Create Integrations settings page in apps/web/src/pages/Integrations.tsx
- [ ] T164 [US3] Update Dashboard to show calendar events alongside tasks and focus blocks
- [ ] T165 [US3] Implement real-time sync updates using Supabase real-time subscriptions
- [ ] T166 [US3] Implement manual sync trigger button

### Playwright E2E Tests

- [ ] T167 [P] [US3] Write E2E test for Google Calendar OAuth connection flow in apps/web/tests/e2e/us3/connect-google-calendar.spec.ts
- [ ] T168 [P] [US3] Write E2E test for viewing calendar events in apps/web/tests/e2e/us3/view-calendar-events.spec.ts
- [ ] T169 [P] [US3] Write E2E test for creating focus block around meetings in apps/web/tests/e2e/us3/focus-block-around-meetings.spec.ts
- [ ] T170 [P] [US3] Write E2E test for break time calculation in apps/web/tests/e2e/us3/break-times.spec.ts
- [ ] T171 [P] [US3] Write E2E test for conflict detection and warnings in apps/web/tests/e2e/us3/conflict-detection.spec.ts
- [ ] T172 [P] [US3] Write E2E test for moving focus blocks between calendars in apps/web/tests/e2e/us3/move-between-calendars.spec.ts

**Checkpoint**: Google Calendar integration functional, webhook sync working, conflicts detected

---

## Phase 6: User Story 3 - Integrate with Todoist (Priority: P2) 🎯 MVP

**Goal**: Connect Todoist account, sync tasks/projects/labels bi-directionally, assign Todoist tasks to focus blocks

**Independent Test**: User connects Todoist, sees existing projects and tasks, completes task in StackDay and syncs to Todoist, creates sub-task that syncs back

### Database Schema Updates

- [ ] T173 [US3-Todoist] Add todoist_id and todoist_project_id columns to existing Task and Project tables in apps/api/supabase/migrations/012_add_todoist_columns.sql
- [ ] T174 Run migration on Supabase database

### Todoist OAuth Integration

- [ ] T175 [US3-Todoist] Setup Todoist app and OAuth credentials in Todoist developer console
- [ ] T176 [P] [US3-Todoist] Implement Todoist OAuth flow initiation in apps/api/src/integrations/todoist/oauth.ts
- [ ] T177 [P] [US3-Todoist] Implement OAuth callback handler in apps/api/src/integrations/todoist/callback.ts
- [ ] T178 [US3-Todoist] Store OAuth tokens in Supabase Integration table

### Webhook Setup

- [ ] T179 [US3-Todoist] Setup public HTTPS endpoint for Todoist webhooks (same as Google Calendar endpoint or separate)
- [ ] T180 [P] [US3-Todoist] Implement webhook receiver with HMAC signature verification in apps/api/src/integrations/todoist/webhook-receiver.ts
- [ ] T181 [P] [US3-Todoist] Implement duplicate detection using X-Todoist-Delivery-ID header in apps/api/src/integrations/todoist/deduplication.ts
- [ ] T182 [P] [US3-Todoist] Implement out-of-order handling logic in apps/api/src/integrations/todoist/order-handling.ts

### Fallback Polling

- [ ] T183 [US3-Todoist] Implement scheduled polling every 5-15 minutes in apps/api/src/integrations/todoist/scheduled-poll.ts
- [ ] T184 [US3-Todoist] Setup cron job or scheduled function for polling

### Sync Logic

- [ ] T185 [US3-Todoist] Implement project sync (Todoist → StackDay) in apps/api/src/integrations/todoist/sync-projects.ts
- [ ] T186 [US3-Todoist] Implement task sync (Todoist → StackDay) in apps/api/src/integrations/todoist/sync-tasks.ts
- [ ] T187 [US3-Todoist] Implement label sync (Todoist → StackDay) in apps/api/src/integrations/todoist/sync-labels.ts
- [ ] T188 [US3-Todoist] Implement completion status sync (StackDay → Todoist) in apps/api/src/integrations/todoist/sync-completions.ts
- [ ] T189 [US3-Todoist] Implement sub-task creation sync (StackDay → Todoist) in apps/api/src/integrations/todoist/sync-subtasks.ts
- [ ] T190 [US3-Todoist] Implement conflict resolution (last-write-wins) in apps/api/src/integrations/todoist/conflict-resolution.ts

### API Services

- [ ] T191 [P] [US3-Todoist] Implement Todoist integration service in apps/web/src/services/todoist-service.ts
- [ ] T192 [US3-Todoist] Update task service to handle Todoist-sourced tasks

### UI Components

- [ ] T193 [P] [US3-Todoist] Create TodoistConnect button component in apps/web/src/components/integrations/TodoistConnect.tsx
- [ ] T194 [P] [US3-Todoist] Create TodoistSyncStatus indicator in apps/web/src/components/integrations/TodoistSyncStatus.tsx
- [ ] T195 [US3-Todoist] Update TaskCard to show Todoist metadata (labels, project)

### Pages & Integration

- [ ] T196 [US3-Todoist] Add Todoist connection to Integrations settings page
- [ ] T197 [US3-Todoist] Update Dashboard to show Todoist tasks with visual distinction
- [ ] T198 [US3-Todoist] Implement real-time sync updates using Supabase real-time subscriptions

### Playwright E2E Tests

- [ ] T199 [P] [US3-Todoist] Write E2E test for Todoist OAuth connection flow in apps/web/tests/e2e/us3-todoist/connect-todoist.spec.ts
- [ ] T200 [P] [US3-Todoist] Write E2E test for viewing Todoist projects and tasks in apps/web/tests/e2e/us3-todoist/view-todoist-tasks.spec.ts
- [ ] T201 [P] [US3-Todoist] Write E2E test for completing task syncing to Todoist in apps/web/tests/e2e/us3-todoist/complete-task-sync.spec.ts
- [ ] T202 [P] [US3-Todoist] Write E2E test for creating sub-task syncing to Todoist in apps/web/tests/e2e/us3-todoist/subtask-sync.spec.ts
- [ ] T203 [P] [US3-Todoist] Write E2E test for assigning Todoist task to focus block in apps/web/tests/e2e/us3-todoist/assign-to-focus-block.spec.ts

**Checkpoint**: Todoist integration functional, bi-directional sync working, tasks assignable to focus blocks

---

## Phase 7: User Story 4 - Learn Task Durations (Priority: P3)

**Goal**: Track actual task durations and suggest learned durations for similar tasks

**Independent Test**: User completes 10 similar tasks, system suggests learned duration for new similar task, confidence indicator shown

### Database Schema

- [ ] T204 [P] [US4] Create DurationModel table schema in apps/api/supabase/migrations/013_create_duration_models.sql
- [ ] T205 [P] [US4] Add actual_duration and tracking_method columns to Task table in apps/api/supabase/migrations/014_add_duration_tracking.sql
- [ ] T206 Run migrations on Supabase database

### TypeScript Types

- [ ] T207 [P] [US4] Define DurationModel type in apps/web/src/types/duration-model.ts
- [ ] T208 [P] [US4] Define TrackingMethod enum in apps/web/src/types/tracking.ts

### Duration Tracking Implementation

- [ ] T209 [P] [US4] Implement automatic focus mode tracking in apps/web/src/utils/duration-tracking/automatic.ts
- [ ] T210 [P] [US4] Implement manual timer functionality in apps/web/src/utils/duration-tracking/manual-timer.ts
- [ ] T211 [P] [US4] Implement bulk estimation prompt logic in apps/web/src/utils/duration-tracking/bulk-estimation.ts

### Machine Learning & Pattern Matching

- [ ] T212 [US4] Implement task pattern matching (labels, keywords) in apps/api/src/services/duration-learning/pattern-matching.ts
- [ ] T213 [US4] Implement duration aggregation and averaging in apps/api/src/services/duration-learning/aggregation.ts
- [ ] T214 [US4] Implement confidence score calculation in apps/api/src/services/duration-learning/confidence.ts
- [ ] T215 [US4] Implement duration suggestion service in apps/api/src/services/duration-learning/suggestions.ts

### API Services

- [ ] T216 [P] [US4] Create duration tracking service in apps/web/src/services/duration-tracking-service.ts
- [ ] T217 [P] [US4] Create duration learning service in apps/web/src/services/duration-learning-service.ts

### State Management

- [ ] T218 [US4] Add duration tracking state to task store in apps/web/src/stores/task-store.ts

### UI Components

- [ ] T219 [P] [US4] Create ManualTimer component in apps/web/src/components/duration/ManualTimer.tsx
- [ ] T220 [P] [US4] Create BulkEstimationModal component in apps/web/src/components/duration/BulkEstimationModal.tsx
- [ ] T221 [P] [US4] Create DurationSuggestion component showing confidence in apps/web/src/components/duration/DurationSuggestion.tsx
- [ ] T222 [P] [US4] Create DurationHistoryChart component in apps/web/src/components/duration/DurationHistoryChart.tsx

### Integration

- [ ] T223 [US4] Update TaskForm to show duration suggestions with confidence indicators
- [ ] T224 [US4] Update FocusMode to automatically track task durations
- [ ] T225 [US4] Implement bulk estimation prompt in evening review or next session
- [ ] T226 [US4] Implement duration editing UI for completed tasks

### Playwright E2E Tests

- [ ] T227 [P] [US4] Write E2E test for automatic duration tracking in focus mode in apps/web/tests/e2e/us4/automatic-tracking.spec.ts
- [ ] T228 [P] [US4] Write E2E test for manual timer usage in apps/web/tests/e2e/us4/manual-timer.spec.ts
- [ ] T229 [P] [US4] Write E2E test for bulk estimation prompt in apps/web/tests/e2e/us4/bulk-estimation.spec.ts
- [ ] T230 [P] [US4] Write E2E test for duration suggestions appearing in apps/web/tests/e2e/us4/duration-suggestions.spec.ts

**Checkpoint**: Duration learning system functional, suggestions improve over time

---

## Phase 8: User Story 5 - Morning Planning Routine (Priority: P3)

**Goal**: Daily planning workflow to review tasks, create schedule, detect over-allocation

**Independent Test**: User enables morning planning, routine triggers at 8am, reviews tasks, creates focus blocks, sees over-allocation warning

### Database Schema

- [ ] T231 [US5] Add morning_routine_enabled and morning_routine_time to User preferences in apps/api/supabase/migrations/015_add_routine_preferences.sql
- [ ] T232 Run migration on Supabase database

### Planning Logic

- [ ] T233 [US5] Implement available time calculation (total time - meetings) in apps/web/src/utils/planning/available-time.ts
- [ ] T234 [US5] Implement over-allocation detection in apps/web/src/utils/planning/over-allocation.ts
- [ ] T235 [US5] Implement planning summary generation in apps/web/src/utils/planning/summary.ts

### UI Components

- [ ] T236 [P] [US5] Create MorningPlanningModal component in apps/web/src/components/routines/MorningPlanningModal.tsx
- [ ] T237 [P] [US5] Create AvailableTimeIndicator component in apps/web/src/components/planning/AvailableTimeIndicator.tsx
- [ ] T238 [P] [US5] Create OverAllocationWarning component in apps/web/src/components/planning/OverAllocationWarning.tsx
- [ ] T239 [P] [US5] Create DailyTaskScheduler drag-and-drop component in apps/web/src/components/planning/DailyTaskScheduler.tsx

### Integration

- [ ] T240 [US5] Implement routine trigger logic (app open before noon) in apps/web/src/utils/routines/trigger.ts
- [ ] T241 [US5] Create user preferences page for routine settings in apps/web/src/pages/Preferences.tsx
- [ ] T242 [US5] Implement focus block batch creation from planning in apps/web/src/services/planning-service.ts

### Playwright E2E Tests

- [ ] T243 [P] [US5] Write E2E test for enabling morning planning routine in apps/web/tests/e2e/us5/enable-routine.spec.ts
- [ ] T244 [P] [US5] Write E2E test for morning planning modal appearing in apps/web/tests/e2e/us5/routine-trigger.spec.ts
- [ ] T245 [P] [US5] Write E2E test for over-allocation warning in apps/web/tests/e2e/us5/over-allocation.spec.ts
- [ ] T246 [P] [US5] Write E2E test for creating focus blocks from plan in apps/web/tests/e2e/us5/create-blocks-from-plan.spec.ts

**Checkpoint**: Morning planning routine functional, helps users start day organized

---

## Phase 9: User Story 6 - Evening Review Routine (Priority: P3)

**Goal**: End-of-day review to mark completed tasks, reschedule incomplete tasks

**Independent Test**: User enables evening review, routine triggers at 6pm, reviews completed/incomplete tasks, reschedules to next day

### Database Schema

- [ ] T247 [US6] Add evening_routine_enabled and evening_routine_time to User preferences in apps/api/supabase/migrations/016_add_evening_routine.sql
- [ ] T248 Run migration on Supabase database

### Review Logic

- [ ] T249 [US6] Implement completion detection for unmarked tasks in apps/web/src/utils/review/completion-detection.ts
- [ ] T250 [US6] Implement next-day capacity calculation in apps/web/src/utils/review/next-day-capacity.ts
- [ ] T251 [US6] Implement rescheduling suggestions in apps/web/src/utils/review/reschedule-suggestions.ts

### UI Components

- [ ] T252 [P] [US6] Create EveningReviewModal component in apps/web/src/components/routines/EveningReviewModal.tsx
- [ ] T253 [P] [US6] Create CompletedTasksList with "Did you complete these?" prompt in apps/web/src/components/review/CompletedTasksList.tsx
- [ ] T254 [P] [US6] Create IncompleteTasksList component in apps/web/src/components/review/IncompleteTasksList.tsx
- [ ] T255 [P] [US6] Create RescheduleCalendar showing next day slots in apps/web/src/components/review/RescheduleCalendar.tsx

### Integration

- [ ] T256 [US6] Implement routine trigger logic (6pm or app open after 5pm) in apps/web/src/utils/routines/evening-trigger.ts
- [ ] T257 [US6] Implement task rescheduling service in apps/web/src/services/reschedule-service.ts
- [ ] T258 [US6] Update preferences page with evening routine settings

### Playwright E2E Tests

- [ ] T259 [P] [US6] Write E2E test for enabling evening review routine in apps/web/tests/e2e/us6/enable-routine.spec.ts
- [ ] T260 [P] [US6] Write E2E test for evening review modal appearing in apps/web/tests/e2e/us6/routine-trigger.spec.ts
- [ ] T261 [P] [US6] Write E2E test for marking unchecked tasks complete in apps/web/tests/e2e/us6/mark-completed.spec.ts
- [ ] T262 [P] [US6] Write E2E test for rescheduling incomplete tasks in apps/web/tests/e2e/us6/reschedule-tasks.spec.ts
- [ ] T263 [P] [US6] Write E2E test for capacity warning when rescheduling in apps/web/tests/e2e/us6/capacity-warning.spec.ts

**Checkpoint**: Evening review routine functional, helps users end day organized

---

## Phase 10: User Story 7 - Add Notes to Tasks and Projects (Priority: P4)

**Goal**: Create and manage notes attached to tasks, projects, or standalone

**Independent Test**: User creates note on task, creates standalone note, associates multiple notes with project

### Database Schema

- [ ] T264 [P] [US7] Create Note table schema in apps/api/supabase/migrations/017_create_notes.sql
- [ ] T265 Run migration on Supabase database

### TypeScript Types

- [ ] T266 [US7] Define Note type in apps/web/src/types/note.ts

### API Services

- [ ] T267 [P] [US7] Implement Note service with CRUD operations in apps/web/src/services/note-service.ts
- [ ] T268 [US7] Implement rich text formatting utilities in apps/web/src/utils/rich-text.ts

### State Management

- [ ] T269 [US7] Create note store/state management in apps/web/src/stores/note-store.ts

### UI Components

- [ ] T270 [P] [US7] Create RichTextEditor component (markdown or WYSIWYG) in apps/web/src/components/notes/RichTextEditor.tsx
- [ ] T271 [P] [US7] Create NoteCard component in apps/web/src/components/notes/NoteCard.tsx
- [ ] T272 [P] [US7] Create NotesList component in apps/web/src/components/notes/NotesList.tsx
- [ ] T273 [P] [US7] Create NotesLibrary page component in apps/web/src/pages/NotesLibrary.tsx

### Integration

- [ ] T274 [US7] Update TaskCard to show attached notes
- [ ] T275 [US7] Update ProjectDetails page to show associated notes
- [ ] T276 [US7] Update FocusMode to allow viewing/editing task notes
- [ ] T277 [US7] Create routing for notes library

### Playwright E2E Tests

- [ ] T278 [P] [US7] Write E2E test for creating note on task in apps/web/tests/e2e/us7/create-task-note.spec.ts
- [ ] T279 [P] [US7] Write E2E test for creating standalone note in apps/web/tests/e2e/us7/create-standalone-note.spec.ts
- [ ] T280 [P] [US7] Write E2E test for associating notes with project in apps/web/tests/e2e/us7/project-notes.spec.ts
- [ ] T281 [P] [US7] Write E2E test for rich text formatting in apps/web/tests/e2e/us7/rich-text.spec.ts

**Checkpoint**: Note-taking system functional, integrated with tasks and projects

---

## Phase 11: User Story 8 - Create Custom Routines (Priority: P4)

**Goal**: Define custom recurring routines with associated tasks

**Independent Test**: User creates "Weekly Review" routine every Friday, creates "Morning Workout" routine Mon/Wed/Fri, routines appear on schedule

### Database Schema

- [ ] T282 [P] [US8] Create Routine table schema in apps/api/supabase/migrations/018_create_routines.sql
- [ ] T283 [P] [US8] Create RoutineTask table for routine-task associations in apps/api/supabase/migrations/019_create_routine_tasks.sql
- [ ] T284 [P] [US8] Create RoutineInstance table for tracking occurrences in apps/api/supabase/migrations/020_create_routine_instances.sql
- [ ] T285 Run migrations on Supabase database

### TypeScript Types

- [ ] T286 [P] [US8] Define Routine type with recurrence patterns in apps/web/src/types/routine.ts
- [ ] T287 [P] [US8] Define RoutineInstance type in apps/web/src/types/routine-instance.ts

### Recurrence Logic

- [ ] T288 [US8] Implement recurrence pattern parsing (daily, weekly, monthly) in apps/web/src/utils/routines/recurrence-parser.ts
- [ ] T289 [US8] Implement routine instance generation in apps/web/src/utils/routines/instance-generator.ts
- [ ] T290 [US8] Implement routine scheduling logic in apps/web/src/utils/routines/scheduler.ts

### API Services

- [ ] T291 [P] [US8] Implement Routine service with CRUD operations in apps/web/src/services/routine-service.ts
- [ ] T292 [P] [US8] Implement RoutineInstance service in apps/web/src/services/routine-instance-service.ts

### State Management

- [ ] T293 [US8] Create routine store/state management in apps/web/src/stores/routine-store.ts

### UI Components

- [ ] T294 [P] [US8] Create RoutineForm component in apps/web/src/components/routines/RoutineForm.tsx
- [ ] T295 [P] [US8] Create RecurrencePatternSelector component in apps/web/src/components/routines/RecurrencePatternSelector.tsx
- [ ] T296 [P] [US8] Create RoutineCard component in apps/web/src/components/routines/RoutineCard.tsx
- [ ] T297 [P] [US8] Create RoutinesList page in apps/web/src/pages/Routines.tsx
- [ ] T298 [P] [US8] Create RoutineHistoryView component in apps/web/src/components/routines/RoutineHistoryView.tsx

### Integration

- [ ] T299 [US8] Update Dashboard to show today's routine instances
- [ ] T300 [US8] Implement routine instance completion (without auto-rescheduling incomplete tasks)
- [ ] T301 [US8] Create routing for routines page

### Playwright E2E Tests

- [ ] T302 [P] [US8] Write E2E test for creating weekly routine in apps/web/tests/e2e/us8/create-weekly-routine.spec.ts
- [ ] T303 [P] [US8] Write E2E test for creating Mon/Wed/Fri routine in apps/web/tests/e2e/us8/create-mwf-routine.spec.ts
- [ ] T304 [P] [US8] Write E2E test for month-end routine in apps/web/tests/e2e/us8/month-end-routine.spec.ts
- [ ] T305 [P] [US8] Write E2E test for incomplete tasks not rescheduling in apps/web/tests/e2e/us8/no-auto-reschedule.spec.ts
- [ ] T306 [P] [US8] Write E2E test for routine completion history in apps/web/tests/e2e/us8/routine-history.spec.ts

**Checkpoint**: Custom routines system functional, recurring workflows automated

---

## Phase 12: User Story 9 - Integrate GitHub and Linear (Priority: P5)

**Goal**: Connect GitHub and Linear accounts to see PRs, issues, and development tasks

**Independent Test**: User connects GitHub and Linear, sees assigned PRs and issues, assigns them to focus blocks, learns PR review durations based on PR size

### Database Schema Updates

- [ ] T307 [US9] Add github_pr_id and linear_issue_id columns to Task table in apps/api/supabase/migrations/021_add_github_linear_columns.sql
- [ ] T308 Run migration on Supabase database

### GitHub Integration

- [ ] T309 [US9] Setup GitHub OAuth app and credentials
- [ ] T310 [P] [US9] Implement GitHub OAuth flow in apps/api/src/integrations/github/oauth.ts
- [ ] T311 [P] [US9] Implement GitHub PR fetching with metadata (lines changed, files changed) in apps/api/src/integrations/github/fetch-prs.ts
- [ ] T312 [US9] Implement GitHub PR sync in apps/api/src/integrations/github/sync-prs.ts
- [ ] T313 [US9] Implement PR size-based duration learning in apps/api/src/services/duration-learning/github-pr-learning.ts

### Linear Integration

- [ ] T314 [US9] Setup Linear OAuth app and credentials (or API key)
- [ ] T315 [P] [US9] Implement Linear OAuth flow in apps/api/src/integrations/linear/oauth.ts
- [ ] T316 [P] [US9] Implement Linear issue fetching in apps/api/src/integrations/linear/fetch-issues.ts
- [ ] T317 [US9] Implement Linear issue sync in apps/api/src/integrations/linear/sync-issues.ts
- [ ] T318 [US9] Implement bi-directional status sync (StackDay ↔ Linear) in apps/api/src/integrations/linear/sync-status.ts

### API Services

- [ ] T319 [P] [US9] Create GitHub integration service in apps/web/src/services/github-service.ts
- [ ] T320 [P] [US9] Create Linear integration service in apps/web/src/services/linear-service.ts

### UI Components

- [ ] T321 [P] [US9] Create GitHubConnect button component in apps/web/src/components/integrations/GitHubConnect.tsx
- [ ] T322 [P] [US9] Create LinearConnect button component in apps/web/src/components/integrations/LinearConnect.tsx
- [ ] T323 [P] [US9] Create GitHubPRCard component showing PR metadata in apps/web/src/components/integrations/GitHubPRCard.tsx
- [ ] T324 [P] [US9] Create LinearIssueCard component in apps/web/src/components/integrations/LinearIssueCard.tsx

### Integration

- [ ] T325 [US9] Update Dashboard to show GitHub PRs and Linear issues
- [ ] T326 [US9] Update Integrations page with GitHub and Linear connections
- [ ] T327 [US9] Implement PR size-based duration suggestions in task creation

### Playwright E2E Tests

- [ ] T328 [P] [US9] Write E2E test for connecting GitHub in apps/web/tests/e2e/us9/connect-github.spec.ts
- [ ] T329 [P] [US9] Write E2E test for connecting Linear in apps/web/tests/e2e/us9/connect-linear.spec.ts
- [ ] T330 [P] [US9] Write E2E test for viewing PRs and issues in apps/web/tests/e2e/us9/view-prs-issues.spec.ts
- [ ] T331 [P] [US9] Write E2E test for assigning PR to focus block in apps/web/tests/e2e/us9/assign-pr-to-block.spec.ts
- [ ] T332 [P] [US9] Write E2E test for PR size-based duration suggestion in apps/web/tests/e2e/us9/pr-duration-learning.spec.ts

**Checkpoint**: GitHub and Linear integrations functional for developer users

---

## Phase 13: User Story 10 - Focus Mode with Music Integration (Priority: P5)

**Goal**: Optional music service integration that plays focus music during focus mode

**Independent Test**: User connects music service, enters focus mode, music plays automatically, pauses during breaks

### Database Schema

- [ ] T333 [US10] Add music integration support to Integration table (service_type enum) in apps/api/supabase/migrations/022_add_music_integration.sql
- [ ] T334 [US10] Add music preferences to User preferences in apps/api/supabase/migrations/023_add_music_preferences.sql
- [ ] T335 Run migrations on Supabase database

### Music Service Integration (choose one: Spotify, Apple Music, or YouTube Music)

- [ ] T336 [US10] Research and choose music service for MVP integration
- [ ] T337 [US10] Setup music service OAuth app and credentials
- [ ] T338 [P] [US10] Implement music service OAuth flow in apps/api/src/integrations/music/oauth.ts
- [ ] T339 [P] [US10] Implement playlist fetching in apps/api/src/integrations/music/fetch-playlists.ts
- [ ] T340 [P] [US10] Implement playback control (play/pause/skip) in apps/api/src/integrations/music/playback-control.ts

### API Services

- [ ] T341 [US10] Create music integration service in apps/web/src/services/music-service.ts

### UI Components

- [ ] T342 [P] [US10] Create MusicServiceConnect button component in apps/web/src/components/integrations/MusicServiceConnect.tsx
- [ ] T343 [P] [US10] Create PlaylistSelector component in apps/web/src/components/music/PlaylistSelector.tsx
- [ ] T344 [P] [US10] Create MusicPlayer component for focus mode in apps/web/src/components/music/MusicPlayer.tsx
- [ ] T345 [P] [US10] Create MusicPreferences settings UI in apps/web/src/components/music/MusicPreferences.tsx

### Integration

- [ ] T346 [US10] Update FocusMode to include "Play Focus Music" option
- [ ] T347 [US10] Implement automatic music pause during breaks
- [ ] T348 [US10] Update Integrations page with music service connection
- [ ] T349 [US10] Implement music preference storage and retrieval

### Playwright E2E Tests

- [ ] T350 [P] [US10] Write E2E test for connecting music service in apps/web/tests/e2e/us10/connect-music.spec.ts
- [ ] T351 [P] [US10] Write E2E test for playing music in focus mode in apps/web/tests/e2e/us10/play-music.spec.ts
- [ ] T352 [P] [US10] Write E2E test for music pausing during breaks in apps/web/tests/e2e/us10/pause-during-breaks.spec.ts
- [ ] T353 [P] [US10] Write E2E test for playback controls in apps/web/tests/e2e/us10/playback-controls.spec.ts

**Checkpoint**: Music integration functional, enhances focus mode experience

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and production readiness

### Performance Optimization

- [ ] T354 [P] Implement virtual scrolling for large task lists in apps/web/src/components/VirtualTaskList.tsx
- [ ] T355 [P] Implement pagination for calendar events in apps/web/src/services/calendar-service.ts
- [ ] T356 [P] Optimize Supabase queries with proper indexing in apps/api/supabase/migrations/024_add_indexes.sql
- [ ] T357 [P] Implement code splitting for route-based chunks in apps/web/vite.config.ts
- [ ] T358 [P] Implement lazy loading for integrations in apps/web/src/pages/Integrations.tsx
- [ ] T359 Audit and optimize bundle size (target: <500KB initial, <2MB total)

### Accessibility

- [ ] T360 [P] Add ARIA labels to all interactive components
- [ ] T361 [P] Implement keyboard navigation for all modals and forms
- [ ] T362 [P] Add focus indicators for keyboard users
- [ ] T363 [P] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] T364 [P] Ensure color contrast meets WCAG AA standards
- [ ] T365 Run accessibility audit with axe-core or Lighthouse

### Security

- [ ] T366 [P] Implement rate limiting for API endpoints in apps/api/src/middleware/rate-limit.ts
- [ ] T367 [P] Add CSRF protection in apps/api/src/middleware/csrf.ts
- [ ] T368 [P] Implement input sanitization for all user inputs
- [ ] T369 [P] Setup Content Security Policy headers
- [ ] T370 [P] Implement secure token storage (httpOnly cookies or secure storage)
- [ ] T371 Conduct security audit and penetration testing

### Error Handling & Monitoring

- [ ] T372 [P] Implement error boundary components in apps/web/src/components/ErrorBoundary.tsx
- [ ] T373 [P] Setup error logging service (Sentry, LogRocket, or similar)
- [ ] T374 [P] Implement user-friendly error messages throughout app
- [ ] T375 [P] Create error recovery workflows (retry, refresh, contact support)
- [ ] T376 [P] Setup performance monitoring (Web Vitals)

### Documentation

- [ ] T377 [P] Update quickstart.md with final setup instructions in specs/001-stackday-platform/quickstart.md
- [ ] T378 [P] Create deployment guide in docs/deployment.md
- [ ] T379 [P] Document API endpoints in docs/api-reference.md (or Swagger/OpenAPI)
- [ ] T380 [P] Create user documentation/help center
- [ ] T381 [P] Document architecture decisions in docs/architecture/
- [ ] T382 Update README.md with project overview and setup

### Testing

- [ ] T383 [P] Write integration tests for authentication flows in apps/web/tests/integration/auth.spec.ts
- [ ] T384 [P] Write integration tests for sync mechanisms in apps/api/tests/integration/sync.spec.ts
- [ ] T385 [P] Achieve 80%+ unit test coverage for critical business logic
- [ ] T386 Run full Playwright E2E test suite and ensure all tests pass
- [ ] T387 Conduct cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T388 Conduct mobile browser testing (iOS Safari, Android Chrome)

### Production Readiness

- [ ] T389 [P] Setup production environment variables and secrets
- [ ] T390 [P] Configure production Supabase project
- [ ] T391 [P] Setup database backups and disaster recovery
- [ ] T392 [P] Configure CDN for static assets
- [ ] T393 [P] Setup monitoring and alerting
- [ ] T394 [P] Create runbook for common operations
- [ ] T395 Deploy to staging environment and conduct UAT
- [ ] T396 Setup production domain and SSL certificates
- [ ] T397 Deploy to production
- [ ] T398 Monitor production metrics and errors

**Checkpoint**: Application production-ready, all quality gates passed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Research)**: No dependencies - can start immediately
- **Phase 1 (Setup)**: Depends on research completion (some decisions needed for tooling)
- **Phase 2 (Foundational)**: Depends on Setup completion - BLOCKS all user stories
- **Phase 3-13 (User Stories)**: All depend on Foundational phase completion
  - MVP Stories (US2, US1, US3-Calendar, US3-Todoist) should be completed first
  - Post-MVP stories can follow in priority order
- **Phase 14 (Polish)**: Depends on all desired user stories being complete

### User Story Dependencies

**MVP Stories** (must complete for initial release):
- **User Story 2 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 1 (P1)**: Can start after Foundational - Should follow US2 to use design system
- **User Story 3 - Google Calendar (P2)**: Depends on US1 (needs Task and FocusBlock entities)
- **User Story 3 - Todoist (P2)**: Depends on US1 (needs Task and Project entities)

**Post-MVP Stories** (can be prioritized and sequenced after MVP):
- **User Story 4 (P3)**: Depends on US1 (needs Task completion tracking)
- **User Story 5 (P3)**: Depends on US1 and US3-Calendar (needs tasks and calendar for planning)
- **User Story 6 (P3)**: Depends on US1 (needs task completion and rescheduling)
- **User Story 7 (P4)**: Depends on US1 (needs Task and Project entities)
- **User Story 8 (P4)**: Independent after Foundational (but benefits from US5/US6 patterns)
- **User Story 9 (P5)**: Depends on US1 and US4 (needs Task entity and duration learning for PR sizing)
- **User Story 10 (P5)**: Depends on US1 (needs FocusMode)

### Within Each User Story

1. Database schema migrations first
2. TypeScript types next (parallel)
3. API services and business logic (depends on types)
4. State management (depends on services)
5. UI components (parallel, depends on types and state)
6. Pages and integration (depends on components)
7. Playwright E2E tests (parallel, can run alongside implementation)

### Parallel Opportunities

**Phase 0 Research**: T001-T006 can all run in parallel

**Phase 1 Setup**: Most tasks marked [P] can run in parallel after T012-T013 (project structure)

**Phase 2 Foundational**:
- Database tasks (T024-T025) can run in parallel
- Design system components (T029-T035) can all run in parallel
- Infrastructure utilities (T036-T039) can run in parallel

**Within Each User Story**:
- All TypeScript type definitions can run in parallel
- All API services can run in parallel after types complete
- All UI components can run in parallel after state management complete
- All Playwright tests can run in parallel at any time

**User Stories Can Run in Parallel** (if team capacity allows):
- After Foundational phase completes, different team members can work on different user stories simultaneously

---

## Parallel Example: User Story 1 Core Implementation

After foundational phase completes, these tasks can run concurrently:

```bash
# Sprint 1: Database & Types (parallel)
T078, T079, T080, T081, T082, T083 (database migrations - parallel)
T085, T086, T087, T088 (TypeScript types - parallel after migrations)

# Sprint 2: Services (parallel after types)
T089, T090, T091, T092 (API services - parallel)
T093, T094 (utilities - parallel)

# Sprint 3: State & Components (parallel after services)
T095, T096, T097, T098 (stores - parallel)
T099, T100, T101, T102, T103, T104, T105, T106, T107 (components - parallel after stores)

# Sprint 4: Integration & Tests (parallel)
T108, T109, T110, T111, T112, T113, T114 (integration)
T115, T116, T117, T118, T119, T120 (E2E tests - parallel with integration)
```

---

## Implementation Strategy

### MVP-First (Recommended)

Complete only the MVP user stories first, validate, then add post-MVP features:

1. **Phase 0-2**: Research, Setup, Foundational → Foundation ready
2. **Phase 3**: User Story 2 (Prototype & Design System) → Design validated
3. **Phase 4**: User Story 1 (Core Tasks & Focus Blocks) → Core features working
4. **Phase 5-6**: User Story 3 (Google Calendar + Todoist) → Integrations functional
5. **Validate MVP**: Test with real users, gather feedback
6. **Deploy MVP**: Launch to initial user base
7. **Phase 7+**: Add post-MVP features based on user feedback and priorities

### Incremental Delivery (Alternative)

Deliver each user story independently as it completes:

1. Complete Phases 0-2 → Foundation ready
2. Complete Phase 3 (US2) → Deploy design system and prototype
3. Complete Phase 4 (US1) → Deploy core task management (MVP v1)
4. Complete Phase 5 (US3-Calendar) → Deploy calendar integration (MVP v2)
5. Complete Phase 6 (US3-Todoist) → Deploy Todoist integration (MVP v3)
6. Continue with remaining stories in priority order
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers (3+):

1. Team completes Phases 0-2 together → Foundation ready
2. Once Foundational is done:
   - **Developer A**: User Story 2 (Prototype & Design System)
   - **Developer B**: User Story 1 (after US2 completes or uses prototype components)
   - **Developer C**: Start on Google Calendar research/OAuth setup
3. Once MVP stories complete:
   - Developers work on post-MVP stories in parallel
   - Regular integration to ensure stories work together

---

## Task Count Summary

- **Phase 0 (Research)**: 11 tasks
- **Phase 1 (Setup)**: 12 tasks
- **Phase 2 (Foundational)**: 16 tasks
- **Phase 3 (US2 - Prototype & Design System)**: 38 tasks
- **Phase 4 (US1 - Core Tasks & Focus Blocks)**: 43 tasks
- **Phase 5 (US3 - Google Calendar)**: 52 tasks
- **Phase 6 (US3 - Todoist)**: 31 tasks
- **Phase 7 (US4 - Duration Learning)**: 27 tasks
- **Phase 8 (US5 - Morning Planning)**: 16 tasks
- **Phase 9 (US6 - Evening Review)**: 17 tasks
- **Phase 10 (US7 - Notes)**: 18 tasks
- **Phase 11 (US8 - Custom Routines)**: 25 tasks
- **Phase 12 (US9 - GitHub & Linear)**: 26 tasks
- **Phase 13 (US10 - Music Integration)**: 18 tasks
- **Phase 14 (Polish)**: 45 tasks

**Total Tasks**: 398 tasks

**MVP Tasks** (Phases 0-6): 203 tasks
**Post-MVP Tasks** (Phases 7-13): 150 tasks
**Polish Tasks** (Phase 14): 45 tasks

**Parallel Opportunities**: ~60% of tasks within each phase can run in parallel (marked with [P])

---

## Notes

- All tasks follow strict checklist format: `- [ ] [ID] [P?] [Story] Description with file path`
- [P] indicates tasks that can run in parallel (different files, no dependencies)
- [Story] label (US1, US2, etc.) maps tasks to specific user stories
- Each user story phase is independently completable and testable
- Playwright E2E tests are included throughout per constitutional requirement
- Tasks include exact file paths for implementation
- MVP scope is clearly defined: US2 + US1 + US3 (both integrations)
- Post-MVP features can be prioritized based on user feedback after MVP launch

**Recommended Next Steps**:
1. Complete Phase 0 research to finalize all technical decisions
2. Begin Phase 1 setup to establish project structure
3. Complete Phase 2 foundational work (critical blocker for all stories)
4. Implement MVP stories (US2, US1, US3) in sequence
5. Validate MVP with real users before continuing with post-MVP features
