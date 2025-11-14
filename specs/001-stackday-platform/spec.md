# Feature Specification: StackDay Productivity Platform

**Feature Branch**: `001-stackday-platform`
**Created**: 2025-11-14
**Status**: Draft
**Input**: User description: "The name of the product will be StackDay..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Manage Tasks with Focus Blocks (Priority: P1)

A user needs to see all their tasks for the day and create focused work blocks to accomplish them. The user creates a "focus block" in their calendar, assigns tasks to it, and the system warns them if they're trying to fit too much work into the available time.

**Why this priority**: This is the core value proposition of StackDay - helping users manage their time and tasks together. Without this, there's no product. This story provides immediate value by letting users organize their work day without any external integrations.

**Independent Test**: Can be fully tested by creating tasks, creating focus blocks, assigning tasks to blocks, and verifying time allocation warnings. Delivers value as a standalone task and time management tool.

**Acceptance Scenarios**:

1. **Given** a user has 5 tasks with estimated durations (30m, 1h, 2h, 45m, 1.5h), **When** they create a 3-hour focus block and try to assign all tasks to it, **Then** the system warns that tasks total 5h 45m but only 3h is available
2. **Given** a user has a focus block with 2 tasks assigned, **When** they enter focus mode, **Then** they see only those 2 tasks and a countdown timer showing time remaining in the block
3. **Given** a user has multiple tasks, **When** they create a new task without specifying duration, **Then** the system assigns a default duration of 30 minutes
4. **Given** a user spontaneously wants to start working, **When** they select "Start Focus Mode" and choose tasks and duration, **Then** a new focus block is created on their calendar

---

### User Story 2 - Integrate Google Calendar (Priority: P2)

A user connects their Google Calendar account to StackDay and sees all their existing calendar events alongside their tasks. They can create focus blocks that respect their existing meetings and appointments, with optional breaks configured between blocks and other events.

**Why this priority**: Most users already use calendar apps. Integration is essential for StackDay to fit into existing workflows and provide value without requiring users to abandon their current tools.

**Independent Test**: Can be tested by connecting a Google Calendar account, verifying events appear, creating focus blocks around existing meetings, and validating break time handling. Delivers value by unifying calendar and task views.

**Acceptance Scenarios**:

1. **Given** a user has connected their Google Calendar with multiple calendars, **When** they view StackDay, **Then** they see events from all connected calendars displayed together
2. **Given** a user has a meeting from 2-3pm and creates a focus block from 12-2pm with breaks enabled (15 min after), **When** viewing the calendar, **Then** the focus block ends at 1:45pm to allow the 15-minute break before the meeting
3. **Given** a user has set Calendar A as their default, **When** they create a new focus block in StackDay, **Then** it's created as an event in Calendar A
4. **Given** a user wants to move a focus block to a different calendar, **When** they edit the block and select Calendar B, **Then** the event moves to Calendar B in Google Calendar
5. **Given** a user edits a calendar event in Google Calendar, **When** they refresh StackDay, **Then** the changes appear in StackDay's view

---

### User Story 3 - Integrate with Todoist (Priority: P2)

A user connects their Todoist account and sees their existing projects, tasks, labels, and due dates in StackDay. They can assign Todoist tasks to focus blocks and the completion status syncs between both systems.

**Why this priority**: Many productivity-focused users already maintain tasks in systems like Todoist. Integration allows StackDay to enhance their existing workflow rather than requiring data migration.

**Independent Test**: Can be tested by connecting Todoist, verifying task sync, assigning Todoist tasks to focus blocks, and confirming bi-directional sync. Delivers value by enhancing existing task management with time-blocking capabilities.

**Acceptance Scenarios**:

1. **Given** a user has connected Todoist with multiple projects, **When** they view StackDay, **Then** they see all projects, tasks, sub-tasks, labels, and due dates
2. **Given** a user has Todoist tasks with due dates, **When** viewing StackDay's daily view, **Then** tasks due today are highlighted
3. **Given** a user completes a task in StackDay, **When** the sync occurs, **Then** the task is marked complete in Todoist
4. **Given** a user creates a sub-task under a Todoist task in StackDay, **When** the sync occurs, **Then** the sub-task appears in Todoist
5. **Given** a user assigns a Todoist task to a focus block, **When** viewing the block, **Then** the task shows its Todoist labels and project

---

### User Story 4 - Learn Task Durations (Priority: P3)

As a user completes tasks over time, StackDay learns how long similar tasks actually take them. When creating new tasks, the system suggests durations based on historical patterns for that user, improving time allocation accuracy.

**Why this priority**: This provides personalized value over time but isn't essential for initial adoption. Users can manually set durations initially while the system learns.

**Independent Test**: Can be tested by completing tasks with tracked durations, creating similar new tasks, and verifying improved duration suggestions. Delivers value by making time estimates more accurate over time.

**Acceptance Scenarios**:

1. **Given** a user has completed 10 "meeting prep" tasks with average duration of 45 minutes, **When** they create a new task labeled "meeting prep", **Then** the system suggests 45 minutes instead of the default 30 minutes
2. **Given** a user consistently completes "code review" tasks in 20 minutes despite estimating 30, **When** they create a new "code review" task, **Then** the system suggests 20 minutes and shows "Based on your history"
3. **Given** a new user with no task history, **When** they create any task, **Then** the system uses the default 30-minute duration
4. **Given** a user has completed tasks across different categories, **When** viewing their task history, **Then** they can see average actual vs. estimated durations by category

---

### User Story 5 - Morning Planning Routine (Priority: P3)

Each morning, a user reviews their tasks and calendar, explicitly commits to what they'll accomplish today, and schedules when tasks will be done. The system helps identify if they're over-allocated or if the plan is unrealistic given their available time.

**Why this priority**: Daily planning improves productivity but users need the core task and calendar features first. This adds structured workflow on top of the foundation.

**Independent Test**: Can be tested by triggering morning routine, reviewing tasks, creating focus blocks for the day, and validating over-allocation warnings. Delivers value by helping users start their day with realistic plans.

**Acceptance Scenarios**:

1. **Given** a user has enabled morning planning and opens StackDay at 8am, **When** the app loads, **Then** the morning planning routine starts automatically
2. **Given** a user has 8 hours of tasks and 4 hours of available time (after meetings), **When** reviewing their daily plan, **Then** the system warns "You have 8h of tasks but only 4h available. Consider reprioritizing."
3. **Given** a user is planning their day, **When** they drag tasks into focus blocks throughout the day, **Then** the system shows total committed time vs. available time
4. **Given** a user completes morning planning, **When** they commit to their plan, **Then** focus blocks are created for all scheduled tasks

---

### User Story 6 - Evening Review Routine (Priority: P3)

At the end of each day, a user reviews what they accomplished, marks any completed but unchecked tasks, and reschedules incomplete tasks. The system helps find capacity in the next day or suggests reprioritization if needed.

**Why this priority**: Evening review complements morning planning but requires the core features to be useful. It provides closure and setup for the next day.

**Independent Test**: Can be tested by triggering evening routine, reviewing completed/incomplete tasks, rescheduling tasks, and validating next-day capacity suggestions. Delivers value by helping users end their day organized and prepared for tomorrow.

**Acceptance Scenarios**:

1. **Given** a user has enabled evening review and it's 6pm, **When** they open StackDay, **Then** the evening review routine suggests starting
2. **Given** a user completed 3 tasks but forgot to check off 2, **When** reviewing their day, **Then** the system shows "Did you complete these?" for the 2 unchecked but likely done tasks
3. **Given** a user has 4 incomplete tasks from today, **When** rescheduling them, **Then** the system shows tomorrow's calendar and suggests available time slots
4. **Given** tomorrow is already heavily scheduled, **When** trying to reschedule 4 hours of tasks, **Then** the system suggests "Tomorrow has limited capacity (2h available). Consider which tasks are highest priority."
5. **Given** a user completes evening review, **When** they confirm, **Then** incomplete tasks are rescheduled and today's focus blocks are marked complete

---

### User Story 7 - Add Notes to Tasks and Projects (Priority: P4)

A user adds notes to tasks while working on them, creates standalone note documents, and associates multiple notes with projects. Notes can contain meeting details, research findings, or any contextual information needed for the work.

**Why this priority**: Note-taking enhances the experience but users can start without it by keeping notes in other tools. It's valuable for consolidation but not essential for MVP.

**Independent Test**: Can be tested by creating notes on tasks, creating standalone notes, linking notes to projects, and verifying note persistence. Delivers value by keeping work context alongside tasks.

**Acceptance Scenarios**:

1. **Given** a user is viewing a task, **When** they click "Add Note", **Then** they can write and save formatted notes attached to that task
2. **Given** a user is viewing a project, **When** they create a new note document, **Then** it's associated with the project and appears in the project's notes list
3. **Given** a user has standalone note documents, **When** viewing their notes library, **Then** they see all notes (task-attached, project-attached, and standalone) organized by type
4. **Given** a user is in focus mode working on a task, **When** they view the task, **Then** they can see and edit notes for that task without leaving focus mode

---

### User Story 8 - Create Custom Routines (Priority: P4)

A user defines custom recurring routines (e.g., "Weekly Review" every Friday, "Workout" every Monday/Wednesday/Friday) with associated tasks. Routines recur at specified intervals, and incomplete routine tasks don't automatically reschedule to the next day.

**Why this priority**: Custom routines extend the planning/review concept but require users to understand the core system first. It's powerful for advanced users but not essential initially.

**Independent Test**: Can be tested by creating custom routines with different recurrence patterns, verifying routine tasks appear as expected, and confirming incomplete tasks don't auto-reschedule. Delivers value by automating recurring workflows.

**Acceptance Scenarios**:

1. **Given** a user creates a "Weekly Review" routine for every Friday at 4pm with 3 tasks, **When** Friday arrives, **Then** the routine appears with all 3 tasks ready to complete
2. **Given** a user has a "Morning Routine" set for every weekday with 4 tasks, **When** they complete only 2 tasks, **Then** the 2 incomplete tasks don't appear tomorrow (routine runs fresh each day)
3. **Given** a user creates a "Month-End Close" routine for the last day of each month, **When** viewing February 28, **Then** the routine appears with its associated tasks
4. **Given** a user has multiple active routines, **When** viewing their routines list, **Then** they see each routine's schedule, associated tasks, and completion history

---

### User Story 9 - Integrate GitHub and Linear (Priority: P5)

A user connects their GitHub and Linear accounts to see issues, pull requests, and development tasks alongside their other work. They can assign GitHub PRs and Linear issues to focus blocks and track their development work within StackDay.

**Why this priority**: This is valuable for developer users but is a specialized integration that extends the core product. It should come after the foundation is solid.

**Independent Test**: Can be tested by connecting GitHub/Linear accounts, viewing issues/PRs, assigning them to focus blocks, and validating sync. Delivers value specifically for developers managing code work.

**Acceptance Scenarios**:

1. **Given** a user has connected their GitHub account, **When** viewing StackDay, **Then** they see assigned PRs and issues from their repositories
2. **Given** a user has connected their Linear account, **When** viewing StackDay, **Then** they see their assigned Linear issues with status and priority
3. **Given** a user assigns a GitHub PR to a focus block, **When** completing the PR, **Then** it's marked complete in StackDay and removed from active tasks
4. **Given** a user creates a task from a Linear issue, **When** they complete it in StackDay, **Then** the Linear issue status updates accordingly

---

### User Story 10 - Focus Mode with Music Integration (Priority: P5)

When in focus mode, a user can optionally integrate with music streaming services to automatically play focus-appropriate music. Music playback is controlled within the focus mode interface and can pause during breaks.

**Why this priority**: This is a nice-to-have enhancement that improves the focus experience but isn't core to the productivity value. Users can play music separately initially.

**Independent Test**: Can be tested by entering focus mode, enabling music integration, controlling playback, and verifying pause during breaks. Delivers value by creating a more immersive focus experience.

**Acceptance Scenarios**:

1. **Given** a user has connected a music service, **When** they enter focus mode, **Then** they see an option to "Play Focus Music"
2. **Given** a user is in focus mode with music playing, **When** their focus block ends and a break starts, **Then** music automatically pauses
3. **Given** a user is in focus mode, **When** they control playback (play/pause/skip), **Then** music controls work without leaving focus mode
4. **Given** a user has preferences for focus music genres, **When** starting focus mode, **Then** the system suggests playlists matching their preferences

---

### Edge Cases

- What happens when a Google Calendar event changes while a user has it assigned to tasks in StackDay?
- How does the system handle conflicting edits between StackDay and integrated services (e.g., task updated in both Todoist and StackDay simultaneously)?
- What happens when a user's calendar is completely full with no available time for scheduling tasks?
- How does the system handle different time zones when integrating with calendar and task services?
- What happens when an integration service (Google Calendar, Todoist) is temporarily unavailable?
- How does the system handle very long task lists (1000+ tasks) in terms of performance?
- What happens to focus blocks and tasks when a user's calendar event gets canceled last minute?
- How does the system handle break time when there's no gap between consecutive calendar events?
- What happens when a user tries to assign more tasks to a focus block after it's already over-allocated?
- How does the system handle recurring tasks in integrated services vs. custom routines?

## Requirements *(mandatory)*

### Functional Requirements

**Core Task Management**

- **FR-001**: System MUST allow users to create tasks with title, description, estimated duration, and optional due date
- **FR-002**: System MUST allow tasks to be organized into projects
- **FR-003**: System MUST allow tasks to have sub-tasks with independent durations and completion status
- **FR-004**: System MUST allow tasks to be tagged with labels for categorization
- **FR-005**: System MUST persist all task data and sync across user sessions
- **FR-006**: System MUST assign a default duration of 30 minutes to new tasks when no duration is specified

**Focus Blocks and Time Management**

- **FR-007**: System MUST allow users to create focus blocks with start time, end time, and assigned tasks
- **FR-008**: System MUST calculate total estimated time for all tasks assigned to a focus block
- **FR-009**: System MUST warn users when total task time exceeds available focus block duration
- **FR-010**: System MUST allow users to enter focus mode for a block, displaying only assigned tasks and time remaining
- **FR-011**: System MUST allow users to spontaneously create focus mode by selecting duration and tasks
- **FR-012**: System MUST create a corresponding calendar block when users enter spontaneous focus mode

**Break Time Management**

- **FR-013**: System MUST support optional configurable breaks between focus blocks and other calendar events
- **FR-014**: System MUST allow users to configure break duration (default: 15 minutes)
- **FR-015**: System MUST allow users to configure whether breaks occur before or after focus blocks (default: after)
- **FR-016**: System MUST adjust focus block end times to accommodate breaks when enabled

**Google Calendar Integration**

- **FR-017**: System MUST authenticate with Google Calendar using OAuth 2.0
- **FR-018**: System MUST retrieve and display events from multiple connected Google calendars
- **FR-019**: System MUST allow users to set a default calendar for new events created in StackDay
- **FR-020**: System MUST create focus blocks as calendar events in the user's chosen calendar
- **FR-021**: System MUST allow users to edit calendar events and move them between calendars
- **FR-022**: System MUST sync calendar changes bi-directionally (Google Calendar ↔ StackDay)
- **FR-023**: System MUST allow users to attach tasks to existing calendar events

**Todoist Integration**

- **FR-024**: System MUST authenticate with Todoist using OAuth 2.0 or API token
- **FR-025**: System MUST retrieve and display projects, tasks, sub-tasks, labels, and due dates from Todoist
- **FR-026**: System MUST sync task completion status bi-directionally (Todoist ↔ StackDay)
- **FR-027**: System MUST allow users to create and edit sub-tasks that sync back to Todoist
- **FR-028**: System MUST preserve Todoist task metadata (labels, projects, priority) when displayed in StackDay

**Task Duration Learning**

- **FR-029**: System MUST track actual time spent on completed tasks
- **FR-030**: System MUST analyze historical task data to identify patterns in task duration by labels and keywords
- **FR-031**: System MUST suggest task durations based on user's historical data for similar tasks
- **FR-032**: System MUST display confidence indicators ("Based on your history") when suggesting learned durations
- **FR-033**: System MUST fall back to default durations for users with insufficient historical data
- **FR-034**: System MUST allow users to override any suggested duration before or after task creation
- **FR-035**: System MUST track user overrides to improve future duration suggestions

**Conflict Detection and Notifications**

- **FR-036**: System MUST detect conflicts when calendar events overlap with existing focus blocks
- **FR-037**: System MUST send notification to user when conflicts are detected
- **FR-038**: System MUST allow users to manually resolve conflicts by rescheduling, shortening, or canceling focus blocks
- **FR-039**: System MUST prevent silent auto-rescheduling of focus blocks without user confirmation

**Morning Planning Routine**

- **FR-040**: System MUST allow users to enable/disable morning planning routine
- **FR-041**: System MUST trigger morning planning prompt at configurable time (default: when app opens before noon)
- **FR-042**: System MUST display all tasks and available time blocks during planning
- **FR-043**: System MUST calculate total available time (time not blocked by meetings/events)
- **FR-044**: System MUST warn when total planned task time exceeds available time
- **FR-045**: System MUST create focus blocks for tasks scheduled during morning planning

**Evening Review Routine**

- **FR-046**: System MUST allow users to enable/disable evening review routine
- **FR-047**: System MUST trigger evening review prompt at configurable time (default: 6pm or when app opens after 5pm)
- **FR-048**: System MUST display all completed and incomplete tasks from the current day
- **FR-049**: System MUST suggest tasks that may have been completed but not marked as such
- **FR-050**: System MUST allow users to reschedule incomplete tasks to future days
- **FR-051**: System MUST show next day's available time slots when rescheduling
- **FR-052**: System MUST warn when next day has insufficient capacity for rescheduled tasks

**Notes and Documentation**

- **FR-053**: System MUST allow users to create and edit notes attached to tasks
- **FR-054**: System MUST allow users to create standalone note documents
- **FR-055**: System MUST allow multiple note documents to be associated with a project
- **FR-056**: System MUST support formatted text in notes (headers, lists, bold, italic, links)
- **FR-057**: System MUST persist notes and make them accessible across sessions

**Custom Routines**

- **FR-058**: System MUST allow users to create custom recurring routines with name, schedule, and associated tasks
- **FR-059**: System MUST support recurrence patterns: daily, weekly (specific days), monthly (specific date or last day), custom intervals
- **FR-060**: System MUST create routine instances based on recurrence schedule
- **FR-061**: System MUST NOT automatically reschedule incomplete routine tasks to the next day
- **FR-062**: System MUST track routine completion history

**GitHub Integration**

- **FR-063**: System MUST authenticate with GitHub using OAuth 2.0
- **FR-064**: System MUST retrieve assigned pull requests and issues from user's repositories
- **FR-065**: System MUST retrieve PR metadata including lines changed, files changed, and other size metrics
- **FR-066**: System MUST track time spent on PR reviews to learn duration patterns
- **FR-067**: System MUST suggest PR review durations based on PR size and user's historical review times for similar-sized PRs
- **FR-068**: System MUST allow users to assign GitHub PRs and issues to focus blocks
- **FR-069**: System MUST sync completion status for GitHub work items

**Linear Integration**

- **FR-070**: System MUST authenticate with Linear using OAuth 2.0 or API key
- **FR-071**: System MUST retrieve assigned issues with status, priority, and project
- **FR-072**: System MUST allow users to assign Linear issues to focus blocks
- **FR-073**: System MUST sync issue status updates bi-directionally (Linear ↔ StackDay)

**Focus Mode Enhancements**

- **FR-074**: System MUST display only assigned tasks and time remaining during focus mode
- **FR-075**: System MUST allow users to mark tasks complete within focus mode
- **FR-076**: System MUST support optional music service integration (authentication and playlist access)
- **FR-077**: System MUST allow music playback control within focus mode interface
- **FR-078**: System MUST automatically pause music during breaks when enabled

### Key Entities

- **User**: Represents a person using StackDay; has account credentials, preferences (default calendar, break settings, routine schedules), connected service accounts (Google, Todoist, GitHub, Linear), and task duration history

- **Task**: Represents a unit of work; has title, description, estimated duration, actual duration (when completed), completion status, optional due date, optional parent task (for sub-tasks), associated project, labels, and source (native, Todoist, GitHub, Linear)

- **Project**: Organizational container for tasks; has name, description, color/icon, associated tasks, and associated note documents

- **Label**: Tag for categorizing tasks; has name, color, and associated tasks

- **Focus Block**: Time block on calendar dedicated to focused work; has start time, end time, assigned tasks, break configuration, and associated calendar event

- **Calendar Event**: Event from integrated calendar service; has title, start time, end time, location, description, source calendar, attached tasks, and sync status

- **Calendar**: Represents a user's calendar (from Google Calendar); has name, color, is_default flag, and associated events

- **Note**: Document containing information; has title, content (formatted text), created/modified timestamps, and optional associations (attached to task, attached to project, or standalone)

- **Routine**: Recurring workflow with tasks; has name, recurrence pattern (daily, weekly with specific days, monthly, custom interval), associated tasks, enabled status, and completion history

- **Duration Model**: Machine learning model for a user's task duration patterns; contains historical task data, learned patterns by category/label/keywords, confidence scores, and suggested durations

- **Integration**: Connection to external service; has service type (Google Calendar, Todoist, GitHub, Linear), authentication tokens, sync status, last sync timestamp, and error states

## Success Criteria *(mandatory)*

### Measurable Outcomes

**User Adoption and Engagement**

- **SC-001**: 80% of new users complete their first focus block within 3 days of signup
- **SC-002**: Users create an average of 3+ focus blocks per day after first week
- **SC-003**: 60% of users enable at least one integration (Google Calendar or Todoist) within first week
- **SC-004**: Average session duration increases to 15+ minutes as users engage with planning features

**Productivity and Time Management**

- **SC-005**: Users can plan their full day (reviewing tasks, creating focus blocks, checking for over-allocation) in under 10 minutes during morning planning
- **SC-006**: 70% of users who enable morning planning report feeling "more prepared" for their day in surveys
- **SC-007**: Task completion rate increases by 25% for users who regularly use focus blocks compared to baseline task list usage
- **SC-008**: Users reschedule 50% fewer tasks when using daily planning compared to ad-hoc task management

**Integration Reliability**

- **SC-009**: Calendar events sync from Google Calendar to StackDay within 5 minutes of changes
- **SC-010**: Task completion status syncs between StackDay and Todoist within 2 minutes
- **SC-011**: Integration sync success rate exceeds 98% (successful syncs / attempted syncs)
- **SC-012**: Users report accurate calendar and task data in 95%+ of usage sessions

**Time Estimation Accuracy**

- **SC-013**: Duration learning system reduces average estimation error by 40% after 2 weeks of usage (comparing default estimates vs. learned estimates vs. actual time)
- **SC-014**: 85% of tasks with learned duration suggestions are accepted by users without modification
- **SC-015**: Users with 30+ completed tasks see personalized duration suggestions for 60%+ of new tasks

**System Performance**

- **SC-016**: Application loads and displays dashboard in under 2 seconds on standard broadband connection
- **SC-017**: Focus mode transitions (entering/exiting) complete in under 1 second
- **SC-018**: System handles task lists of 500+ items without performance degradation
- **SC-019**: Calendar view renders full month with all events and focus blocks in under 1 second

**User Satisfaction**

- **SC-020**: Net Promoter Score (NPS) of 40+ after 30 days of usage
- **SC-021**: 75% of users rate the "focus block with time warnings" feature as "very helpful" or "essential"
- **SC-022**: Users complete the morning planning routine on 4+ days per week when enabled
- **SC-023**: 85% of users agree that StackDay helps them "feel more in control of their time"

## Assumptions

- Users have access to modern web browsers or will use native mobile apps
- Users are familiar with calendar and task management concepts
- Default task duration of 30 minutes is reasonable for most knowledge work tasks
- Users want to integrate existing tools rather than fully migrate to a new system
- Most users have 4-8 hours of available work time per day after meetings
- Break durations of 10-15 minutes are appropriate for most users
- Machine learning for duration estimation can start with simple pattern matching (keyword/label similarity) before more sophisticated models
- Users will grant necessary permissions for calendar and task service integrations
- Bi-directional sync is preferred over one-way import for integrations
- Focus blocks are most effective when limited to 90-120 minutes (Pomodoro-adjacent research)
- Morning planning happens before 12pm, evening review happens after 5pm (configurable)
- Custom routines are used by advanced users; most users will start with daily planning/review
- Music integration is considered optional and won't be in MVP
- GitHub and Linear integrations are specifically for developer users and can be later priorities

## Design Decisions

### Personal Productivity Focus

**Decision**: StackDay is a personal productivity tool. It will NOT support team/shared calendars or collaborative task management in the initial version.

**Rationale**: Focusing on individual users allows faster MVP development and simpler architecture. Team features require user management, permissions, shared calendars, task assignments, and significantly more complexity. The personal tool can establish product-market fit before considering team features in future versions.

### Conflict Resolution Strategy

**Decision**: When calendar events and focus blocks conflict after creation, StackDay will show warning notifications to the user and require manual resolution.

**Rationale**: Warning notifications give users full control over their schedule while ensuring they're aware of conflicts. Auto-rescheduling could surprise users by moving blocks without permission. Visual indicators alone would be too passive and easy to miss.

**Behavior**:
- System detects when new calendar events overlap with existing focus blocks
- User receives notification: "Meeting added at 2pm conflicts with your Focus Block. Would you like to reschedule the focus block?"
- User manually resolves by rescheduling, shortening, or canceling the focus block

### Duration Learning with Variance

**Decision**: Task duration suggestions are always user-overridable. For GitHub pull request reviews specifically, the system will learn based on PR size (lines changed, files changed) and potentially complexity metrics, suggesting durations based on similar historical PRs.

**Rationale**: All duration suggestions are guidance, not requirements. Users have context the system doesn't and should always be able to override. For code reviews, PR size is a strong signal for duration - reviewing 50 lines is very different from reviewing 5000 lines. The system can provide smarter estimates by considering these factors.

**Behavior**:
- General tasks: Learn patterns from labels, keywords, historical durations
- GitHub PRs: Learn from PR size, file count, and user's historical review times for similar-sized PRs
- All suggestions show as defaults that users can change before saving
- System tracks when users override to improve future suggestions
