import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Header, Sidebar, Main, Button } from '@stackday/ui';
import TaskList from '../components/prototype/TaskList';
import CalendarView from '../components/prototype/CalendarView';
import FocusBlockModal from '../components/prototype/FocusBlockModal';
// Sample data for demonstration
const initialTasks = [
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
const initialFocusBlocks = [
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
  const [tasks, setTasks] = useState(initialTasks);
  const [focusBlocks, setFocusBlocks] = useState(initialFocusBlocks);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('week');
  const [focusModalOpen, setFocusModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Task handlers
  const handleTaskToggle = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };
  const handleTaskAdd = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };
  const handleTaskDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };
  // Focus block handlers
  const handleFocusBlockSave = (focusBlock) => {
    const newBlock = {
      ...focusBlock,
      id: Date.now().toString(),
    };
    setFocusBlocks((prev) => [...prev, newBlock]);
    setFocusModalOpen(false);
  };
  // Convert tasks and focus blocks to calendar events
  const calendarEvents = [
    // Focus blocks as events
    ...focusBlocks.map((block) => ({
      id: `fb-${block.id}`,
      title: block.title,
      startTime: block.startTime,
      endTime: block.endTime,
      type: 'focus-block',
    })),
    // Tasks with due dates as events
    ...tasks
      .filter((task) => task.dueDate && !task.completed)
      .map((task) => {
        const dueDate = new Date(task.dueDate);
        const startTime = new Date(dueDate);
        startTime.setHours(9, 0, 0, 0); // Default to 9 AM
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + (task.estimatedDuration || 30));
        return {
          id: `task-${task.id}`,
          title: task.title,
          startTime,
          endTime,
          type: 'task',
        };
      }),
  ];
  const handleEventClick = (event) => {
    // Handle event click - could open details modal in future
    console.log('Event clicked:', event);
  };
  return _jsxs('div', {
    className: 'min-h-screen bg-gray-50',
    children: [
      _jsx(Header, {
        logo: _jsxs('div', {
          className: 'flex items-center gap-2',
          children: [
            _jsx('div', {
              className:
                'w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold',
              children: 'S',
            }),
            _jsx('span', { className: 'text-xl font-bold text-gray-900', children: 'StackDay' }),
          ],
        }),
        nav: _jsxs('nav', {
          className: 'flex items-center gap-6',
          children: [
            _jsx('a', {
              href: '/app/dashboard',
              className: 'text-sm font-medium text-primary-600',
              children: 'Dashboard',
            }),
            _jsx('a', {
              href: '/app/tasks',
              className: 'text-sm font-medium text-gray-600 hover:text-gray-900',
              children: 'Tasks',
            }),
            _jsx('a', {
              href: '/app/calendar',
              className: 'text-sm font-medium text-gray-600 hover:text-gray-900',
              children: 'Calendar',
            }),
          ],
        }),
        actions: _jsxs('div', {
          className: 'flex items-center gap-4',
          children: [
            _jsx(Button, { variant: 'ghost', size: 'sm', children: 'Settings' }),
            _jsx('div', {
              className: 'w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center',
              children: _jsx('span', {
                className: 'text-sm font-medium text-gray-700',
                children: 'JD',
              }),
            }),
          ],
        }),
        sticky: true,
      }),
      _jsxs('div', {
        className: 'flex',
        children: [
          _jsx(Sidebar, {
            position: 'left',
            width: 'md',
            collapsible: true,
            collapsed: sidebarCollapsed,
            onCollapsedChange: setSidebarCollapsed,
            children: _jsxs('div', {
              className: 'p-4 space-y-6',
              children: [
                _jsxs('div', {
                  children: [
                    _jsx('h3', {
                      className: 'text-xs font-semibold text-gray-500 uppercase mb-3',
                      children: 'Quick Actions',
                    }),
                    _jsx('div', {
                      className: 'space-y-2',
                      children: _jsx(Button, {
                        variant: 'primary',
                        fullWidth: true,
                        onClick: () => setFocusModalOpen(true),
                        size: 'sm',
                        children: '+ Create Focus Block',
                      }),
                    }),
                  ],
                }),
                _jsxs('div', {
                  children: [
                    _jsx('h3', {
                      className: 'text-xs font-semibold text-gray-500 uppercase mb-3',
                      children: 'Calendar View',
                    }),
                    _jsxs('div', {
                      className: 'flex gap-2',
                      children: [
                        _jsx(Button, {
                          variant: calendarView === 'day' ? 'primary' : 'ghost',
                          size: 'sm',
                          onClick: () => setCalendarView('day'),
                          children: 'Day',
                        }),
                        _jsx(Button, {
                          variant: calendarView === 'week' ? 'primary' : 'ghost',
                          size: 'sm',
                          onClick: () => setCalendarView('week'),
                          children: 'Week',
                        }),
                        _jsx(Button, {
                          variant: calendarView === 'month' ? 'primary' : 'ghost',
                          size: 'sm',
                          onClick: () => setCalendarView('month'),
                          children: 'Month',
                        }),
                      ],
                    }),
                  ],
                }),
                _jsxs('div', {
                  children: [
                    _jsx('h3', {
                      className: 'text-xs font-semibold text-gray-500 uppercase mb-3',
                      children: 'Statistics',
                    }),
                    _jsxs('div', {
                      className: 'space-y-2 text-sm',
                      children: [
                        _jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            _jsx('span', { className: 'text-gray-600', children: 'Total Tasks:' }),
                            _jsx('span', {
                              className: 'font-semibold text-gray-900',
                              children: tasks.length,
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            _jsx('span', { className: 'text-gray-600', children: 'Completed:' }),
                            _jsx('span', {
                              className: 'font-semibold text-green-600',
                              children: tasks.filter((t) => t.completed).length,
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            _jsx('span', { className: 'text-gray-600', children: 'Pending:' }),
                            _jsx('span', {
                              className: 'font-semibold text-orange-600',
                              children: tasks.filter((t) => !t.completed).length,
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            _jsx('span', { className: 'text-gray-600', children: 'Focus Blocks:' }),
                            _jsx('span', {
                              className: 'font-semibold text-primary-600',
                              children: focusBlocks.length,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          _jsx(Main, {
            className: 'flex-1 p-6',
            children: _jsxs('div', {
              className: 'max-w-7xl mx-auto space-y-6',
              children: [
                _jsxs('div', {
                  children: [
                    _jsx('h1', {
                      className: 'text-3xl font-bold text-gray-900 mb-2',
                      children: 'Dashboard',
                    }),
                    _jsx('p', {
                      className: 'text-gray-600',
                      children:
                        'Manage your tasks and schedule your focus blocks for maximum productivity.',
                    }),
                  ],
                }),
                _jsxs('div', {
                  children: [
                    _jsxs('div', {
                      className: 'flex items-center justify-between mb-4',
                      children: [
                        _jsx('h2', {
                          className: 'text-2xl font-bold text-gray-900',
                          children: 'Calendar',
                        }),
                        _jsxs('div', {
                          className: 'flex gap-2',
                          children: [
                            _jsx(Button, {
                              variant: 'ghost',
                              size: 'sm',
                              onClick: () => {
                                const newDate = new Date(selectedDate);
                                if (calendarView === 'day')
                                  newDate.setDate(selectedDate.getDate() - 1);
                                else if (calendarView === 'week')
                                  newDate.setDate(selectedDate.getDate() - 7);
                                else newDate.setMonth(selectedDate.getMonth() - 1);
                                setSelectedDate(newDate);
                              },
                              children: 'Previous',
                            }),
                            _jsx(Button, {
                              variant: 'ghost',
                              size: 'sm',
                              onClick: () => setSelectedDate(new Date()),
                              children: 'Today',
                            }),
                            _jsx(Button, {
                              variant: 'ghost',
                              size: 'sm',
                              onClick: () => {
                                const newDate = new Date(selectedDate);
                                if (calendarView === 'day')
                                  newDate.setDate(selectedDate.getDate() + 1);
                                else if (calendarView === 'week')
                                  newDate.setDate(selectedDate.getDate() + 7);
                                else newDate.setMonth(selectedDate.getMonth() + 1);
                                setSelectedDate(newDate);
                              },
                              children: 'Next',
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsx(CalendarView, {
                      events: calendarEvents,
                      selectedDate: selectedDate,
                      onDateSelect: setSelectedDate,
                      onEventClick: handleEventClick,
                      view: calendarView,
                    }),
                  ],
                }),
                _jsx('div', {
                  children: _jsx(TaskList, {
                    tasks: tasks,
                    onTaskToggle: handleTaskToggle,
                    onTaskAdd: handleTaskAdd,
                    onTaskDelete: handleTaskDelete,
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      _jsx(FocusBlockModal, {
        open: focusModalOpen,
        onClose: () => setFocusModalOpen(false),
        onSave: handleFocusBlockSave,
        availableTasks: tasks.filter((t) => !t.completed),
      }),
    ],
  });
}
//# sourceMappingURL=PrototypeDashboard.js.map
