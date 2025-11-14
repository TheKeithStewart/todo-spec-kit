import { useState } from 'react';
import { Header, Sidebar, Main, Button } from '@stackday/ui';
import TaskList, { type Task } from '../components/prototype/TaskList';
import CalendarView, { type CalendarEvent } from '../components/prototype/CalendarView';
import FocusBlockModal, { type FocusBlock } from '../components/prototype/FocusBlockModal';

// Sample data for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review quarterly goals',
    description: 'Analyze Q1 performance and set Q2 objectives',
    completed: false,
    estimatedDuration: 45,
    labels: ['planning', 'high-priority'],
    dueDate: '2025-11-20',
  },
  {
    id: '2',
    title: 'Update project documentation',
    description: 'Document new API endpoints and architecture changes',
    completed: false,
    estimatedDuration: 60,
    labels: ['documentation'],
    dueDate: '2025-11-18',
  },
  {
    id: '3',
    title: 'Team sync meeting',
    completed: true,
    labels: ['meeting'],
  },
];

const initialFocusBlocks: FocusBlock[] = [
  {
    id: '1',
    title: 'Morning Deep Work',
    startTime: new Date(2025, 10, 14, 9, 0),
    endTime: new Date(2025, 10, 14, 11, 0),
    tasks: ['1', '2'],
    breakEnabled: true,
    breakDuration: 15,
  },
];

export default function PrototypeDashboard() {
  // State management
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [focusBlocks, setFocusBlocks] = useState<FocusBlock[]>(initialFocusBlocks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  const [focusModalOpen, setFocusModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Task handlers
  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleTaskAdd = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Focus block handlers
  const handleFocusBlockSave = (focusBlock: Omit<FocusBlock, 'id'>) => {
    const newBlock: FocusBlock = {
      ...focusBlock,
      id: Date.now().toString(),
    };
    setFocusBlocks((prev) => [...prev, newBlock]);
    setFocusModalOpen(false);
  };

  // Convert tasks and focus blocks to calendar events
  const calendarEvents: CalendarEvent[] = [
    // Focus blocks as events
    ...focusBlocks.map((block) => ({
      id: `fb-${block.id}`,
      title: block.title,
      startTime: block.startTime,
      endTime: block.endTime,
      type: 'focus-block' as const,
    })),
    // Tasks with due dates as events
    ...tasks
      .filter((task) => task.dueDate && !task.completed)
      .map((task) => {
        const dueDate = new Date(task.dueDate!);
        const startTime = new Date(dueDate);
        startTime.setHours(9, 0, 0, 0); // Default to 9 AM
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + (task.estimatedDuration || 30));

        return {
          id: `task-${task.id}`,
          title: task.title,
          startTime,
          endTime,
          type: 'task' as const,
        };
      }),
  ];

  const handleEventClick = (event: CalendarEvent) => {
    // Handle event click - could open details modal in future
    console.log('Event clicked:', event);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        logo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-gray-900">StackDay</span>
          </div>
        }
        nav={
          <nav className="flex items-center gap-6">
            <a href="/app/dashboard" className="text-sm font-medium text-primary-600">
              Dashboard
            </a>
            <a href="/app/tasks" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Tasks
            </a>
            <a
              href="/app/calendar"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Calendar
            </a>
          </nav>
        }
        actions={
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Settings
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JD</span>
            </div>
          </div>
        }
        sticky
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          position="left"
          width="md"
          collapsible
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        >
          <div className="p-4 space-y-6">
            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setFocusModalOpen(true)}
                  size="sm"
                >
                  + Create Focus Block
                </Button>
              </div>
            </div>

            {/* View Controls */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Calendar View</h3>
              <div className="flex gap-2">
                <Button
                  variant={calendarView === 'day' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('day')}
                >
                  Day
                </Button>
                <Button
                  variant={calendarView === 'week' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('week')}
                >
                  Week
                </Button>
                <Button
                  variant={calendarView === 'month' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('month')}
                >
                  Month
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tasks:</span>
                  <span className="font-semibold text-gray-900">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-semibold text-green-600">
                    {tasks.filter((t) => t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-semibold text-orange-600">
                    {tasks.filter((t) => !t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Blocks:</span>
                  <span className="font-semibold text-primary-600">{focusBlocks.length}</span>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <Main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Manage your tasks and schedule your focus blocks for maximum productivity.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Tasks */}
              <div>
                <TaskList
                  tasks={tasks}
                  onTaskToggle={handleTaskToggle}
                  onTaskAdd={handleTaskAdd}
                  onTaskDelete={handleTaskDelete}
                />
              </div>

              {/* Right Column - Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        if (calendarView === 'day') newDate.setDate(selectedDate.getDate() - 1);
                        else if (calendarView === 'week')
                          newDate.setDate(selectedDate.getDate() - 7);
                        else newDate.setMonth(selectedDate.getMonth() - 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      Previous
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDate(new Date())}>
                      Today
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        if (calendarView === 'day') newDate.setDate(selectedDate.getDate() + 1);
                        else if (calendarView === 'week')
                          newDate.setDate(selectedDate.getDate() + 7);
                        else newDate.setMonth(selectedDate.getMonth() + 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <CalendarView
                  events={calendarEvents}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  onEventClick={handleEventClick}
                  view={calendarView}
                />
              </div>
            </div>
          </div>
        </Main>
      </div>

      {/* Focus Block Modal */}
      <FocusBlockModal
        open={focusModalOpen}
        onClose={() => setFocusModalOpen(false)}
        onSave={handleFocusBlockSave}
        availableTasks={tasks.filter((t) => !t.completed)}
      />
    </div>
  );
}
