# REST API Contracts: StackDay Productivity Platform

**Date**: 2025-11-14
**Pattern**: RESTful JSON API via Supabase PostgREST
**Base URL**: `https://{project}.supabase.co/rest/v1/`
**Authentication**: Bearer token (Supabase JWT) in Authorization header

---

## Authentication

All API requests require authentication via Supabase JWT token:

```http
Authorization: Bearer {access_token}
```

Tokens obtained via Supabase Auth:

- Email/password sign up/in
- OAuth providers (Google, GitHub, etc.)

---

## Tasks

### List Tasks

```http
GET /tasks?user_id=eq.{user_id}&select=*,labels(*),project(*)
```

**Query Parameters**:

- `project_id=eq.{uuid}` - Filter by project
- `completed_at=is.null` - Get incomplete tasks
- `due_date=gte.{date}` - Tasks due after date
- `source=eq.todoist` - Filter by source

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Review PR #123",
    "description": "Code review for authentication",
    "estimated_duration": 30,
    "actual_duration": 25,
    "tracking_method": "automatic",
    "due_date": "2025-11-15T17:00:00Z",
    "completed_at": null,
    "parent_task_id": null,
    "project_id": "uuid",
    "source": "github",
    "github_pr_id": "123",
    "created_at": "2025-11-14T10:00:00Z",
    "updated_at": "2025-11-14T15:30:00Z",
    "labels": [
      {
        "id": "uuid",
        "name": "code-review",
        "color": "#3B82F6"
      }
    ],
    "project": {
      "id": "uuid",
      "name": "StackDay MVP",
      "color": "#10B981"
    }
  }
]
```

### Create Task

```http
POST /tasks
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "Implement webhook handler",
  "description": "Handle Google Calendar notifications",
  "estimated_duration": 60,
  "due_date": "2025-11-16T17:00:00Z",
  "project_id": "uuid",
  "source": "native"
}
```

**Response**: `201 Created`

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Implement webhook handler",
  "estimated_duration": 60,
  "created_at": "2025-11-14T16:00:00Z",
  ...
}
```

### Get Task Details

```http
GET /tasks?id=eq.{uuid}&select=*,labels(*),project(*),notes(*)
```

**Response**: `200 OK`

```json
{
  "id": "uuid",
  "title": "Review PR #123",
  ...,
  "labels": [...],
  "project": {...},
  "notes": [
    {
      "id": "uuid",
      "title": "Review notes",
      "content": "Found 3 issues with authentication flow",
      "created_at": "2025-11-14T14:30:00Z"
    }
  ]
}
```

### Update Task

```http
PATCH /tasks?id=eq.{uuid}
Content-Type: application/json
```

**Request Body** (partial update):

```json
{
  "estimated_duration": 45,
  "completed_at": "2025-11-14T16:30:00Z",
  "actual_duration": 40,
  "tracking_method": "automatic"
}
```

**Response**: `200 OK`

### Delete Task

```http
DELETE /tasks?id=eq.{uuid}
```

**Response**: `204 No Content`

---

## Focus Blocks

### List Focus Blocks

```http
GET /focus_blocks?user_id=eq.{user_id}&start_time=gte.{date}&end_time=lte.{date}&select=*,tasks(*)
```

**Query Parameters**:

- `start_time=gte.{timestamp}` - Blocks starting after
- `end_time=lte.{timestamp}` - Blocks ending before

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "start_time": "2025-11-14T14:00:00Z",
    "end_time": "2025-11-14T16:00:00Z",
    "break_enabled": true,
    "break_duration": 15,
    "break_position": "after",
    "calendar_event_id": null,
    "created_at": "2025-11-14T10:00:00Z",
    "tasks": [
      {
        "id": "uuid",
        "title": "Review PR #123",
        "estimated_duration": 30
      },
      {
        "id": "uuid",
        "title": "Write documentation",
        "estimated_duration": 45
      }
    ]
  }
]
```

### Create Focus Block

```http
POST /focus_blocks
Content-Type: application/json
```

**Request Body**:

```json
{
  "start_time": "2025-11-15T09:00:00Z",
  "end_time": "2025-11-15T11:00:00Z",
  "break_enabled": true,
  "break_duration": 15,
  "break_position": "after"
}
```

**Response**: `201 Created`

**Then assign tasks via junction table**:

```http
POST /focus_block_tasks
Content-Type: application/json
```

**Request Body**:

```json
{
  "focus_block_id": "uuid",
  "task_id": "uuid"
}
```

### Update Focus Block

```http
PATCH /focus_blocks?id=eq.{uuid}
Content-Type: application/json
```

**Request Body**:

```json
{
  "end_time": "2025-11-15T11:30:00Z",
  "break_duration": 10
}
```

**Response**: `200 OK`

### Delete Focus Block

```http
DELETE /focus_blocks?id=eq.{uuid}
```

**Response**: `204 No Content`

---

## Calendar Events

### List Calendar Events

```http
GET /calendar_events?user_id=eq.{user_id}&start_time=gte.{date}&end_time=lte.{date}&select=*,calendar(*),tasks(*)
```

**Query Parameters**:

- `calendar_id=eq.{uuid}` - Filter by calendar
- `source=eq.google_calendar` - Filter by source

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "calendar_id": "uuid",
    "title": "Team standup",
    "start_time": "2025-11-15T10:00:00Z",
    "end_time": "2025-11-15T10:30:00Z",
    "location": "Zoom",
    "description": "Daily team sync",
    "source": "google_calendar",
    "sync_status": "synced",
    "external_id": "google_event_id",
    "calendar": {
      "id": "uuid",
      "name": "Work Calendar",
      "color": "#3B82F6"
    },
    "tasks": []
  }
]
```

### Create Calendar Event

```http
POST /calendar_events
Content-Type: application/json
```

**Request Body**:

```json
{
  "calendar_id": "uuid",
  "title": "Focus: Development",
  "start_time": "2025-11-15T14:00:00Z",
  "end_time": "2025-11-15T16:00:00Z",
  "source": "stackday"
}
```

**Response**: `201 Created`

**Note**: Creates in StackDay first, then syncs to Google Calendar via integration service

### Update Calendar Event

```http
PATCH /calendar_events?id=eq.{uuid}
Content-Type: application/json
```

**Request Body**:

```json
{
  "end_time": "2025-11-15T16:30:00Z"
}
```

**Response**: `200 OK`

### Delete Calendar Event

```http
DELETE /calendar_events?id=eq.{uuid}
```

**Response**: `204 No Content`

---

## Integrations

### List Integrations

```http
GET /integrations?user_id=eq.{user_id}&select=id,service_type,sync_status,last_sync_at
```

**Note**: Access tokens intentionally excluded from response for security

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "service_type": "google_calendar",
    "sync_status": "active",
    "last_sync_at": "2025-11-14T15:00:00Z"
  },
  {
    "id": "uuid",
    "service_type": "todoist",
    "sync_status": "active",
    "last_sync_at": "2025-11-14T15:05:00Z"
  }
]
```

### Initiate OAuth Connection

**Note**: Handled via Supabase Auth OAuth flow, not direct API call

```typescript
// Client-side OAuth initiation
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    scopes: 'https://www.googleapis.com/auth/calendar',
    redirectTo: `${window.location.origin}/integrations/callback`,
  },
});
```

### Trigger Manual Sync

```http
POST /rpc/trigger_sync
Content-Type: application/json
```

**Request Body**:

```json
{
  "integration_id": "uuid"
}
```

**Response**: `200 OK`

```json
{
  "status": "syncing",
  "message": "Sync initiated"
}
```

### Disconnect Integration

```http
DELETE /integrations?id=eq.{uuid}
```

**Response**: `204 No Content`

---

## Projects

### List Projects

```http
GET /projects?user_id=eq.{user_id}&select=*,tasks(count)
```

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "StackDay MVP",
    "description": "Core MVP features",
    "color": "#10B981",
    "icon": "🚀",
    "created_at": "2025-11-01T00:00:00Z",
    "tasks": {
      "count": 42
    }
  }
]
```

### Create Project

```http
POST /projects
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "Q1 Planning",
  "description": "Strategic planning for Q1 2026",
  "color": "#3B82F6",
  "icon": "📊"
}
```

**Response**: `201 Created`

### Update/Delete Project

Similar pattern to tasks

---

## Labels

### List Labels

```http
GET /labels?user_id=eq.{user_id}
```

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "urgent",
    "color": "#EF4444",
    "created_at": "2025-11-01T00:00:00Z"
  }
]
```

### Create Label

```http
POST /labels
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "code-review",
  "color": "#3B82F6"
}
```

**Response**: `201 Created`

---

## Routines

### List Routines

```http
GET /routines?user_id=eq.{user_id}&select=*,routine_tasks(*)
```

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Morning Planning",
    "recurrence_pattern": "daily",
    "recurrence_config": {
      "pattern": "daily",
      "time": "08:00"
    },
    "enabled": true,
    "routine_tasks": [
      {
        "id": "uuid",
        "title": "Review today's tasks",
        "estimated_duration": 10,
        "sort_order": 1
      },
      {
        "id": "uuid",
        "title": "Check calendar",
        "estimated_duration": 5,
        "sort_order": 2
      }
    ]
  }
]
```

### Create Routine

```http
POST /routines
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "Weekly Review",
  "recurrence_pattern": "weekly",
  "recurrence_config": {
    "pattern": "weekly",
    "days": [5],
    "time": "16:00"
  },
  "enabled": true
}
```

**Then create associated tasks**:

```http
POST /routine_tasks
Content-Type: application/json
```

**Request Body**:

```json
{
  "routine_id": "uuid",
  "title": "Review completed tasks",
  "estimated_duration": 15,
  "sort_order": 1
}
```

**Response**: `201 Created`

---

## Notes

### List Notes

```http
GET /notes?user_id=eq.{user_id}&select=*
```

**Query Parameters**:

- `task_id=eq.{uuid}` - Notes for specific task
- `project_id=eq.{uuid}` - Notes for specific project
- `task_id=is.null&project_id=is.null` - Standalone notes

**Response**: `200 OK`

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "task_id": "uuid",
    "project_id": null,
    "title": "PR Review Notes",
    "content": "## Issues Found\n\n1. Authentication flow\n2. Error handling\n3. Test coverage",
    "created_at": "2025-11-14T14:30:00Z",
    "updated_at": "2025-11-14T14:35:00Z"
  }
]
```

### Create Note

```http
POST /notes
Content-Type: application/json
```

**Request Body**:

```json
{
  "task_id": "uuid",
  "title": "Implementation notes",
  "content": "# Key Points\n\n- Use Zustand for state\n- Implement error boundaries"
}
```

**Response**: `201 Created`

---

## User Preferences

### Get User Preferences

```http
GET /users?id=eq.{user_id}&select=id,email,preferences
```

**Response**: `200 OK`

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "preferences": {
    "defaultCalendarId": "uuid",
    "breakDuration": 15,
    "breakPosition": "after",
    "morningRoutineEnabled": true,
    "morningRoutineTime": "08:00",
    "eveningRoutineEnabled": true,
    "eveningRoutineTime": "18:00",
    "timezone": "America/New_York"
  }
}
```

### Update User Preferences

```http
PATCH /users?id=eq.{user_id}
Content-Type: application/json
```

**Request Body**:

```json
{
  "preferences": {
    "breakDuration": 20,
    "morningRoutineEnabled": false
  }
}
```

**Response**: `200 OK`

---

## Custom RPC Functions

### Get Duration Suggestions

```http
POST /rpc/get_duration_suggestions
Content-Type: application/json
```

**Request Body**:

```json
{
  "user_id": "uuid",
  "task_labels": ["code-review", "urgent"],
  "task_title": "Review authentication PR"
}
```

**Response**: `200 OK`

```json
{
  "suggested_duration": 35,
  "confidence_score": 0.85,
  "sample_count": 12,
  "message": "Based on your history with similar tasks"
}
```

### Detect Calendar Conflicts

```http
POST /rpc/detect_conflicts
Content-Type: application/json
```

**Request Body**:

```json
{
  "user_id": "uuid",
  "start_time": "2025-11-15T14:00:00Z",
  "end_time": "2025-11-15T16:00:00Z"
}
```

**Response**: `200 OK`

```json
{
  "has_conflicts": true,
  "conflicts": [
    {
      "type": "calendar_event",
      "id": "uuid",
      "title": "Team meeting",
      "start_time": "2025-11-15T15:00:00Z",
      "end_time": "2025-11-15T15:30:00Z"
    }
  ]
}
```

---

## Error Responses

All errors follow consistent format:

```json
{
  "code": "PGRST116",
  "message": "Conflict detected",
  "details": "Duplicate key value violates unique constraint",
  "hint": "Task with this external_id already exists"
}
```

**Common Status Codes**:

- `400 Bad Request` - Invalid request body or parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Authenticated but not authorized (RLS policy violation)
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Duplicate or conflicting resource
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server-side error

---

## Rate Limiting

Supabase PostgREST has built-in rate limiting:

- Free tier: 500 requests per second
- Paid tier: Configurable

Clients should implement exponential backoff on 429 responses.

---

## Pagination

Use `Range` header for pagination:

```http
GET /tasks
Range: 0-9
```

**Response**:

```http
Status: 206 Partial Content
Content-Range: 0-9/42
```

Default page size: 10
Maximum page size: 1000

---

## Real-time Subscriptions

Subscribe to table changes via Supabase Realtime:

```typescript
const subscription = supabase
  .channel('tasks_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'tasks',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

**Events**: `INSERT`, `UPDATE`, `DELETE`

---

## TypeScript Types

All API responses should be typed using generated types from Supabase:

```bash
npx supabase gen types typescript --project-id {project-id} > packages/shared-types/database.ts
```

```typescript
import { Database } from '@/types/database';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];
```

---

## Summary

**API Style**: RESTful with Supabase PostgREST conventions
**Authentication**: JWT bearer tokens
**Data Format**: JSON
**Query Language**: PostgREST query parameters
**Real-time**: PostgreSQL replication via Supabase Realtime

**Key Features**:

- Row Level Security enforces data isolation
- Automatic API generation from database schema
- Real-time subscriptions for live updates
- Type-safe client with generated TypeScript types
- Built-in pagination and filtering

**Next Steps**: Implement services in `apps/web/src/services/` that wrap these endpoints with type-safe methods.
