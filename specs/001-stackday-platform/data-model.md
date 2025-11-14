# Data Model: StackDay Productivity Platform

**Date**: 2025-11-14
**Input**: spec.md Key Entities + clarifications
**Purpose**: Define database schema, relationships, and validation rules

---

## Entity Relationship Overview

```
User
 ├── Tasks (1:N)
 ├── Projects (1:N)
 ├── Labels (1:N)
 ├── FocusBlocks (1:N)
 ├── Calendars (1:N via Integrations)
 ├── CalendarEvents (1:N)
 ├── Notes (1:N)
 ├── Routines (1:N)
 ├── Integrations (1:N)
 └── DurationModels (1:N)

Task
 ├── belongs_to: User
 ├── belongs_to: Project (optional)
 ├── belongs_to: Task (parent, for sub-tasks, optional)
 ├── has_many: Labels (M:N via task_labels)
 ├── has_many: Notes
 └── belongs_to: FocusBlock (optional, M:N via focus_block_tasks)

FocusBlock
 ├── belongs_to: User
 ├── has_many: Tasks (M:N via focus_block_tasks)
 └── belongs_to: CalendarEvent (optional)

CalendarEvent
 ├── belongs_to: User
 ├── belongs_to: Calendar
 ├── has_many: Tasks (M:N via calendar_event_tasks)
 └── has_one: FocusBlock (optional)

Calendar
 ├── belongs_to: User
 ├── belongs_to: Integration
 └── has_many: CalendarEvents

Integration
 ├── belongs_to: User
 └── has_many: Calendars (for google_calendar type)
```

---

## 1. User

**Purpose**: Represents a StackDay user with account credentials and preferences

### Fields

| Field      | Type         | Constraints                             | Description                |
| ---------- | ------------ | --------------------------------------- | -------------------------- |
| id         | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique user identifier     |
| email      | varchar(255) | UNIQUE, NOT NULL                        | User's email address       |
| created_at | timestamp    | DEFAULT NOW()                           | Account creation timestamp |
| updated_at | timestamp    | DEFAULT NOW()                           | Last update timestamp      |

### Preferences (JSONB column)

```typescript
interface UserPreferences {
  defaultCalendarId?: string;
  breakDuration: number; // minutes, default 15
  breakPosition: 'before' | 'after'; // default 'after'
  morningRoutineEnabled: boolean; // default false
  morningRoutineTime: string; // HH:mm format, default "08:00"
  eveningRoutineEnabled: boolean; // default false
  eveningRoutineTime: string; // HH:mm format, default "18:00"
  timezone: string; // IANA timezone, default "America/New_York"
}
```

### Relationships

- has_many Tasks
- has_many Projects
- has_many Labels
- has_many FocusBlocks
- has_many CalendarEvents
- has_many Notes
- has_many Routines
- has_many Integrations
- has_many DurationModels

### Indexes

- `idx_user_email ON users(email)`

### Row Level Security (RLS)

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

---

## 2. Task

**Purpose**: Represents a unit of work with estimation, completion tracking, and source

### Fields

| Field              | Type         | Constraints                                         | Description                             |
| ------------------ | ------------ | --------------------------------------------------- | --------------------------------------- |
| id                 | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4()             | Unique task identifier                  |
| user_id            | uuid         | NOT NULL, FOREIGN KEY(users.id)                     | Task owner                              |
| title              | varchar(500) | NOT NULL                                            | Task title                              |
| description        | text         | NULL                                                | Task description                        |
| estimated_duration | integer      | NOT NULL, DEFAULT 30                                | Estimated minutes                       |
| actual_duration    | integer      | NULL                                                | Actual minutes (when complete)          |
| tracking_method    | varchar(20)  | NULL, CHECK IN ('automatic', 'manual', 'estimated') | How duration was tracked                |
| due_date           | timestamp    | NULL                                                | Optional due date                       |
| completed_at       | timestamp    | NULL                                                | Completion timestamp                    |
| parent_task_id     | uuid         | NULL, FOREIGN KEY(tasks.id)                         | For sub-tasks                           |
| project_id         | uuid         | NULL, FOREIGN KEY(projects.id)                      | Associated project                      |
| source             | varchar(50)  | NOT NULL, DEFAULT 'native'                          | 'native', 'todoist', 'github', 'linear' |
| external_id        | varchar(255) | NULL                                                | ID in external system                   |
| todoist_id         | varchar(255) | NULL                                                | Todoist task ID                         |
| todoist_project_id | varchar(255) | NULL                                                | Todoist project ID                      |
| github_pr_id       | varchar(255) | NULL                                                | GitHub PR number                        |
| linear_issue_id    | varchar(255) | NULL                                                | Linear issue ID                         |
| created_at         | timestamp    | DEFAULT NOW()                                       | Creation timestamp                      |
| updated_at         | timestamp    | DEFAULT NOW()                                       | Last update timestamp                   |

### Relationships

- belongs_to User
- belongs_to Project (optional)
- belongs_to Task (parent, optional - for sub-tasks)
- has_many Tasks (children - sub-tasks)
- has_many Labels (M:N via task_labels)
- has_many Notes
- belongs_to_many FocusBlocks (M:N via focus_block_tasks)

### Validation

- `estimated_duration >= 0`
- `actual_duration >= 0 OR actual_duration IS NULL`
- `title NOT NULL AND length(title) > 0`
- `source IN ('native', 'todoist', 'github', 'linear')`
- `tracking_method IN ('automatic', 'manual', 'estimated') OR tracking_method IS NULL`

### Indexes

- `idx_task_user_id ON tasks(user_id)`
- `idx_task_project_id ON tasks(project_id)`
- `idx_task_parent_task_id ON tasks(parent_task_id)`
- `idx_task_due_date ON tasks(due_date) WHERE due_date IS NOT NULL`
- `idx_task_completed_at ON tasks(completed_at) WHERE completed_at IS NOT NULL`
- `idx_task_source ON tasks(source, external_id)`
- `idx_task_todoist ON tasks(todoist_id) WHERE todoist_id IS NOT NULL`

### RLS Policies

```sql
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);
```

---

## 3. Project

**Purpose**: Organizational container for related tasks

### Fields

| Field       | Type         | Constraints                             | Description               |
| ----------- | ------------ | --------------------------------------- | ------------------------- |
| id          | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique project identifier |
| user_id     | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Project owner             |
| name        | varchar(255) | NOT NULL                                | Project name              |
| description | text         | NULL                                    | Project description       |
| color       | varchar(7)   | DEFAULT '#3B82F6'                       | Hex color code            |
| icon        | varchar(50)  | NULL                                    | Icon name/emoji           |
| created_at  | timestamp    | DEFAULT NOW()                           | Creation timestamp        |
| updated_at  | timestamp    | DEFAULT NOW()                           | Last update timestamp     |

### Relationships

- belongs_to User
- has_many Tasks
- has_many Notes

### Validation

- `name NOT NULL AND length(name) > 0`
- `color MATCHES '^#[0-9A-Fa-f]{6}$'`

### Indexes

- `idx_project_user_id ON projects(user_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own projects" ON projects
  USING (auth.uid() = user_id);
```

---

## 4. Label

**Purpose**: Tag for categorizing tasks

### Fields

| Field      | Type         | Constraints                             | Description             |
| ---------- | ------------ | --------------------------------------- | ----------------------- |
| id         | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique label identifier |
| user_id    | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Label owner             |
| name       | varchar(100) | NOT NULL                                | Label name              |
| color      | varchar(7)   | DEFAULT '#6B7280'                       | Hex color code          |
| created_at | timestamp    | DEFAULT NOW()                           | Creation timestamp      |

### Relationships

- belongs_to User
- has_many Tasks (M:N via task_labels)

### Validation

- `name NOT NULL AND length(name) > 0`
- `color MATCHES '^#[0-9A-Fa-f]{6}$'`
- `UNIQUE(user_id, name)` - no duplicate label names per user

### Indexes

- `idx_label_user_id ON labels(user_id)`
- `idx_label_user_name ON labels(user_id, name) UNIQUE`

### RLS Policies

```sql
CREATE POLICY "Users can manage own labels" ON labels
  USING (auth.uid() = user_id);
```

---

## 5. Task_Labels (Junction Table)

**Purpose**: Many-to-many relationship between tasks and labels

### Fields

| Field      | Type      | Constraints                                        | Description           |
| ---------- | --------- | -------------------------------------------------- | --------------------- |
| task_id    | uuid      | NOT NULL, FOREIGN KEY(tasks.id) ON DELETE CASCADE  | Task reference        |
| label_id   | uuid      | NOT NULL, FOREIGN KEY(labels.id) ON DELETE CASCADE | Label reference       |
| created_at | timestamp | DEFAULT NOW()                                      | Association timestamp |

### Constraints

- `PRIMARY KEY (task_id, label_id)`

### Indexes

- `idx_task_labels_task ON task_labels(task_id)`
- `idx_task_labels_label ON task_labels(label_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own task labels" ON task_labels
  USING (EXISTS (
    SELECT 1 FROM tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid()
  ));
```

---

## 6. FocusBlock

**Purpose**: Dedicated time block on calendar for focused work

### Fields

| Field             | Type        | Constraints                             | Description                   |
| ----------------- | ----------- | --------------------------------------- | ----------------------------- |
| id                | uuid        | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique focus block identifier |
| user_id           | uuid        | NOT NULL, FOREIGN KEY(users.id)         | Block owner                   |
| start_time        | timestamp   | NOT NULL                                | Block start                   |
| end_time          | timestamp   | NOT NULL                                | Block end                     |
| break_enabled     | boolean     | DEFAULT true                            | Whether break is enabled      |
| break_duration    | integer     | DEFAULT 15                              | Break minutes                 |
| break_position    | varchar(10) | DEFAULT 'after'                         | 'before' or 'after'           |
| calendar_event_id | uuid        | NULL, FOREIGN KEY(calendar_events.id)   | Associated calendar event     |
| created_at        | timestamp   | DEFAULT NOW()                           | Creation timestamp            |
| updated_at        | timestamp   | DEFAULT NOW()                           | Last update timestamp         |

### Relationships

- belongs_to User
- has_many Tasks (M:N via focus_block_tasks)
- belongs_to CalendarEvent (optional)

### Validation

- `end_time > start_time`
- `break_duration >= 0`
- `break_position IN ('before', 'after')`

### Indexes

- `idx_focus_block_user_id ON focus_blocks(user_id)`
- `idx_focus_block_time ON focus_blocks(user_id, start_time, end_time)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own focus blocks" ON focus_blocks
  USING (auth.uid() = user_id);
```

---

## 7. Focus_Block_Tasks (Junction Table)

**Purpose**: Many-to-many relationship between focus blocks and tasks

### Fields

| Field          | Type      | Constraints                                              | Description           |
| -------------- | --------- | -------------------------------------------------------- | --------------------- |
| focus_block_id | uuid      | NOT NULL, FOREIGN KEY(focus_blocks.id) ON DELETE CASCADE | Focus block reference |
| task_id        | uuid      | NOT NULL, FOREIGN KEY(tasks.id) ON DELETE CASCADE        | Task reference        |
| created_at     | timestamp | DEFAULT NOW()                                            | Association timestamp |

### Constraints

- `PRIMARY KEY (focus_block_id, task_id)`

### Indexes

- `idx_fb_tasks_block ON focus_block_tasks(focus_block_id)`
- `idx_fb_tasks_task ON focus_block_tasks(task_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own focus block tasks" ON focus_block_tasks
  USING (EXISTS (
    SELECT 1 FROM focus_blocks WHERE focus_blocks.id = focus_block_id AND focus_blocks.user_id = auth.uid()
  ));
```

---

## 8. Integration

**Purpose**: Connection to external services (Google Calendar, Todoist, GitHub, Linear)

### Fields

| Field              | Type         | Constraints                             | Description                                               |
| ------------------ | ------------ | --------------------------------------- | --------------------------------------------------------- |
| id                 | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique integration identifier                             |
| user_id            | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Integration owner                                         |
| service_type       | varchar(50)  | NOT NULL                                | 'google_calendar', 'todoist', 'github', 'linear', 'music' |
| access_token       | text         | NOT NULL, ENCRYPTED                     | OAuth access token                                        |
| refresh_token      | text         | NULL, ENCRYPTED                         | OAuth refresh token                                       |
| token_expires_at   | timestamp    | NULL                                    | Token expiration                                          |
| sync_status        | varchar(20)  | DEFAULT 'active'                        | 'active', 'error', 'disconnected'                         |
| last_sync_at       | timestamp    | NULL                                    | Last successful sync                                      |
| error_message      | text         | NULL                                    | Last error (if any)                                       |
| webhook_channel_id | varchar(255) | NULL                                    | Google Calendar watch channel ID                          |
| webhook_expires_at | timestamp    | NULL                                    | Webhook expiration (Google Calendar)                      |
| created_at         | timestamp    | DEFAULT NOW()                           | Connection timestamp                                      |
| updated_at         | timestamp    | DEFAULT NOW()                           | Last update timestamp                                     |

### Relationships

- belongs_to User
- has_many Calendars (for google_calendar type)

### Validation

- `service_type IN ('google_calendar', 'todoist', 'github', 'linear', 'music')`
- `sync_status IN ('active', 'error', 'disconnected')`
- `UNIQUE(user_id, service_type)` - one integration per service per user

### Indexes

- `idx_integration_user_service ON integrations(user_id, service_type) UNIQUE`
- `idx_integration_webhook_expiry ON integrations(webhook_expires_at) WHERE webhook_expires_at IS NOT NULL`

### Security

- Tokens stored with PostgreSQL encryption (pgcrypto extension)
- Access tokens encrypted at rest
- Tokens never returned in API responses (use separate endpoint for refresh)

### RLS Policies

```sql
CREATE POLICY "Users can manage own integrations" ON integrations
  USING (auth.uid() = user_id);
```

---

## 9. Calendar

**Purpose**: Represents a calendar from Google Calendar integration

### Fields

| Field          | Type         | Constraints                             | Description                |
| -------------- | ------------ | --------------------------------------- | -------------------------- |
| id             | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique calendar identifier |
| user_id        | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Calendar owner             |
| integration_id | uuid         | NOT NULL, FOREIGN KEY(integrations.id)  | Associated integration     |
| name           | varchar(255) | NOT NULL                                | Calendar name              |
| color          | varchar(7)   | DEFAULT '#3B82F6'                       | Display color              |
| is_default     | boolean      | DEFAULT false                           | Default for new events     |
| external_id    | varchar(255) | NOT NULL                                | Google Calendar ID         |
| created_at     | timestamp    | DEFAULT NOW()                           | Creation timestamp         |
| updated_at     | timestamp    | DEFAULT NOW()                           | Last update timestamp      |

### Relationships

- belongs_to User
- belongs_to Integration
- has_many CalendarEvents

### Validation

- `name NOT NULL`
- `color MATCHES '^#[0-9A-Fa-f]{6}$'`
- `Only one calendar can have is_default = true per user`

### Indexes

- `idx_calendar_user_id ON calendars(user_id)`
- `idx_calendar_integration_id ON calendars(integration_id)`
- `idx_calendar_external_id ON calendars(integration_id, external_id) UNIQUE`

### RLS Policies

```sql
CREATE POLICY "Users can manage own calendars" ON calendars
  USING (auth.uid() = user_id);
```

---

## 10. CalendarEvent

**Purpose**: Event from integrated calendar service or focus block

### Fields

| Field       | Type         | Constraints                             | Description                   |
| ----------- | ------------ | --------------------------------------- | ----------------------------- |
| id          | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique event identifier       |
| user_id     | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Event owner                   |
| calendar_id | uuid         | NULL, FOREIGN KEY(calendars.id)         | Associated calendar           |
| title       | varchar(500) | NOT NULL                                | Event title                   |
| start_time  | timestamp    | NOT NULL                                | Event start                   |
| end_time    | timestamp    | NOT NULL                                | Event end                     |
| location    | varchar(500) | NULL                                    | Event location                |
| description | text         | NULL                                    | Event description             |
| source      | varchar(50)  | NOT NULL                                | 'google_calendar', 'stackday' |
| sync_status | varchar(20)  | DEFAULT 'synced'                        | 'synced', 'pending', 'error'  |
| external_id | varchar(255) | NULL                                    | ID in external system         |
| created_at  | timestamp    | DEFAULT NOW()                           | Creation timestamp            |
| updated_at  | timestamp    | DEFAULT NOW()                           | Last update timestamp         |

### Relationships

- belongs_to User
- belongs_to Calendar
- has_many Tasks (M:N via calendar_event_tasks)
- has_one FocusBlock (optional)

### Validation

- `end_time > start_time`
- `title NOT NULL`
- `source IN ('google_calendar', 'stackday')`
- `sync_status IN ('synced', 'pending', 'error')`

### Indexes

- `idx_calendar_event_user_id ON calendar_events(user_id)`
- `idx_calendar_event_calendar_id ON calendar_events(calendar_id)`
- `idx_calendar_event_time ON calendar_events(user_id, start_time, end_time)`
- `idx_calendar_event_external ON calendar_events(calendar_id, external_id) WHERE external_id IS NOT NULL`

### RLS Policies

```sql
CREATE POLICY "Users can manage own calendar events" ON calendar_events
  USING (auth.uid() = user_id);
```

---

## 11. Calendar_Event_Tasks (Junction Table)

**Purpose**: Many-to-many relationship between calendar events and tasks

### Fields

| Field             | Type      | Constraints                                                 | Description           |
| ----------------- | --------- | ----------------------------------------------------------- | --------------------- |
| calendar_event_id | uuid      | NOT NULL, FOREIGN KEY(calendar_events.id) ON DELETE CASCADE | Event reference       |
| task_id           | uuid      | NOT NULL, FOREIGN KEY(tasks.id) ON DELETE CASCADE           | Task reference        |
| created_at        | timestamp | DEFAULT NOW()                                               | Association timestamp |

### Constraints

- `PRIMARY KEY (calendar_event_id, task_id)`

### Indexes

- `idx_ce_tasks_event ON calendar_event_tasks(calendar_event_id)`
- `idx_ce_tasks_task ON calendar_event_tasks(task_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own calendar event tasks" ON calendar_event_tasks
  USING (EXISTS (
    SELECT 1 FROM calendar_events WHERE calendar_events.id = calendar_event_id AND calendar_events.user_id = auth.uid()
  ));
```

---

## 12. Note

**Purpose**: Document containing information, attached to task/project or standalone

### Fields

| Field      | Type         | Constraints                             | Description                    |
| ---------- | ------------ | --------------------------------------- | ------------------------------ |
| id         | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique note identifier         |
| user_id    | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Note owner                     |
| task_id    | uuid         | NULL, FOREIGN KEY(tasks.id)             | Attached to task (optional)    |
| project_id | uuid         | NULL, FOREIGN KEY(projects.id)          | Attached to project (optional) |
| title      | varchar(500) | NOT NULL                                | Note title                     |
| content    | text         | NOT NULL                                | Note content (Markdown)        |
| created_at | timestamp    | DEFAULT NOW()                           | Creation timestamp             |
| updated_at | timestamp    | DEFAULT NOW()                           | Last update timestamp          |

### Relationships

- belongs_to User
- belongs_to Task (optional)
- belongs_to Project (optional)

### Validation

- `content NOT NULL`
- `(task_id IS NULL AND project_id IS NULL) OR (task_id IS NOT NULL XOR project_id IS NOT NULL)` - Must be standalone OR attached to task OR attached to project, not multiple

### Indexes

- `idx_note_user_id ON notes(user_id)`
- `idx_note_task_id ON notes(task_id) WHERE task_id IS NOT NULL`
- `idx_note_project_id ON notes(project_id) WHERE project_id IS NOT NULL`

### RLS Policies

```sql
CREATE POLICY "Users can manage own notes" ON notes
  USING (auth.uid() = user_id);
```

---

## 13. Routine

**Purpose**: Recurring workflow with associated tasks

### Fields

| Field              | Type         | Constraints                             | Description                            |
| ------------------ | ------------ | --------------------------------------- | -------------------------------------- |
| id                 | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique routine identifier              |
| user_id            | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Routine owner                          |
| name               | varchar(255) | NOT NULL                                | Routine name                           |
| recurrence_pattern | varchar(20)  | NOT NULL                                | 'daily', 'weekly', 'monthly', 'custom' |
| recurrence_config  | jsonb        | NOT NULL                                | Pattern configuration                  |
| enabled            | boolean      | DEFAULT true                            | Active status                          |
| created_at         | timestamp    | DEFAULT NOW()                           | Creation timestamp                     |
| updated_at         | timestamp    | DEFAULT NOW()                           | Last update timestamp                  |

### Recurrence Config (JSONB)

```typescript
// Daily
interface DailyRecurrence {
  pattern: 'daily';
  time: string; // "HH:mm"
}

// Weekly
interface WeeklyRecurrence {
  pattern: 'weekly';
  days: number[]; // [1, 3, 5] for Mon, Wed, Fri (1=Monday, 7=Sunday)
  time: string; // "HH:mm"
}

// Monthly
interface MonthlyRecurrence {
  pattern: 'monthly';
  dayOfMonth?: number; // 1-31, or null for last day
  isLastDay?: boolean; // true for last day of month
  time: string; // "HH:mm"
}

// Custom interval
interface CustomRecurrence {
  pattern: 'custom';
  intervalDays: number; // every N days
  startDate: string; // ISO date
  time: string; // "HH:mm"
}
```

### Relationships

- belongs_to User
- has_many RoutineTasks
- has_many RoutineInstances

### Validation

- `name NOT NULL`
- `recurrence_pattern IN ('daily', 'weekly', 'monthly', 'custom')`
- `recurrence_config NOT NULL AND jsonb_typeof(recurrence_config) = 'object'`

### Indexes

- `idx_routine_user_id ON routines(user_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own routines" ON routines
  USING (auth.uid() = user_id);
```

---

## 14. RoutineTask (Association Table)

**Purpose**: Tasks associated with a routine template

### Fields

| Field              | Type         | Constraints                                          | Description                   |
| ------------------ | ------------ | ---------------------------------------------------- | ----------------------------- |
| id                 | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4()              | Unique association identifier |
| routine_id         | uuid         | NOT NULL, FOREIGN KEY(routines.id) ON DELETE CASCADE | Routine reference             |
| title              | varchar(500) | NOT NULL                                             | Task title template           |
| estimated_duration | integer      | DEFAULT 30                                           | Estimated minutes             |
| sort_order         | integer      | DEFAULT 0                                            | Display order                 |
| created_at         | timestamp    | DEFAULT NOW()                                        | Creation timestamp            |

### Validation

- `title NOT NULL`
- `estimated_duration >= 0`

### Indexes

- `idx_routine_task_routine ON routine_tasks(routine_id)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own routine tasks" ON routine_tasks
  USING (EXISTS (
    SELECT 1 FROM routines WHERE routines.id = routine_id AND routines.user_id = auth.uid()
  ));
```

---

## 15. RoutineInstance

**Purpose**: Tracks individual occurrences of routines

### Fields

| Field          | Type      | Constraints                             | Description                |
| -------------- | --------- | --------------------------------------- | -------------------------- |
| id             | uuid      | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique instance identifier |
| routine_id     | uuid      | NOT NULL, FOREIGN KEY(routines.id)      | Routine reference          |
| scheduled_date | date      | NOT NULL                                | Date routine should occur  |
| completed_at   | timestamp | NULL                                    | Completion timestamp       |
| created_at     | timestamp | DEFAULT NOW()                           | Creation timestamp         |

### Relationships

- belongs_to Routine

### Validation

- `UNIQUE(routine_id, scheduled_date)` - one instance per routine per day

### Indexes

- `idx_routine_instance_routine ON routine_instances(routine_id)`
- `idx_routine_instance_date ON routine_instances(routine_id, scheduled_date) UNIQUE`

### RLS Policies

```sql
CREATE POLICY "Users can manage own routine instances" ON routine_instances
  USING (EXISTS (
    SELECT 1 FROM routines WHERE routines.id = routine_id AND routines.user_id = auth.uid()
  ));
```

---

## 16. DurationModel

**Purpose**: Machine learning patterns for task duration suggestions

### Fields

| Field            | Type         | Constraints                             | Description                           |
| ---------------- | ------------ | --------------------------------------- | ------------------------------------- |
| id               | uuid         | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique model identifier               |
| user_id          | uuid         | NOT NULL, FOREIGN KEY(users.id)         | Model owner                           |
| task_pattern     | varchar(500) | NOT NULL                                | Pattern identifier (labels, keywords) |
| avg_duration     | integer      | NOT NULL                                | Average duration in minutes           |
| sample_count     | integer      | DEFAULT 1                               | Number of samples                     |
| confidence_score | numeric(3,2) | DEFAULT 0.5                             | Confidence (0.0-1.0)                  |
| created_at       | timestamp    | DEFAULT NOW()                           | Creation timestamp                    |
| updated_at       | timestamp    | DEFAULT NOW()                           | Last update timestamp                 |

### Relationships

- belongs_to User

### Validation

- `task_pattern NOT NULL`
- `avg_duration > 0`
- `sample_count > 0`
- `confidence_score BETWEEN 0.0 AND 1.0`

### Indexes

- `idx_duration_model_user_id ON duration_models(user_id)`
- `idx_duration_model_pattern ON duration_models(user_id, task_pattern)`

### RLS Policies

```sql
CREATE POLICY "Users can manage own duration models" ON duration_models
  USING (auth.uid() = user_id);
```

---

## Database Setup

### Extensions Required

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Migration Order

1. users
2. projects, labels, integrations
3. tasks, calendars, routines, duration_models
4. task_labels (junction)
5. notes, calendar_events, focus_blocks
6. focus_block_tasks, calendar_event_tasks (junctions)
7. routine_tasks, routine_instances

### Triggers for updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at:
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- (Repeat for all tables with updated_at)
```

---

## Summary

**Total Tables**: 16 (11 entities + 5 junction/association tables)

**Junction Tables**:

- task_labels (Tasks ↔ Labels)
- focus_block_tasks (FocusBlocks ↔ Tasks)
- calendar_event_tasks (CalendarEvents ↔ Tasks)

**Association Tables**:

- routine_tasks (Routine templates)
- routine_instances (Routine occurrences)

**Key Design Decisions**:

- UUID primary keys for distributed systems
- JSONB for flexible configuration (preferences, recurrence)
- Row Level Security (RLS) enforces data isolation
- Encrypted storage for OAuth tokens
- Timestamps for sync and audit
- CASCADE deletes on junctions for referential integrity
- Indexes on foreign keys and frequently queried columns

**Next Steps**: Use this data model to create Supabase migrations in Phase 2.
