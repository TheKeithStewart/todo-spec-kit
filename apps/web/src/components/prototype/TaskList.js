import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Card, Button, Badge, Checkbox, Input } from '@stackday/ui';
export default function TaskList({ tasks, onTaskToggle, onTaskAdd, onTaskDelete }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    onTaskAdd({
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      labels: [],
    });
    setNewTaskTitle('');
    setNewTaskDescription('');
    setShowAddForm(false);
  };
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  return _jsxs('div', {
    className: 'space-y-4',
    children: [
      _jsxs('div', {
        className: 'flex items-center justify-between',
        children: [
          _jsx('h2', { className: 'text-2xl font-bold text-gray-900', children: 'Tasks' }),
          _jsx(Button, {
            onClick: () => setShowAddForm(!showAddForm),
            size: 'sm',
            children: showAddForm ? 'Cancel' : '+ Add Task',
          }),
        ],
      }),
      showAddForm &&
        _jsx(Card, {
          variant: 'outlined',
          padding: 'md',
          children: _jsxs('div', {
            className: 'space-y-3',
            children: [
              _jsx(Input, {
                label: 'Task Title',
                placeholder: 'Enter task title',
                value: newTaskTitle,
                onChange: (e) => setNewTaskTitle(e.target.value),
                fullWidth: true,
              }),
              _jsxs('div', {
                children: [
                  _jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-1',
                    children: 'Description (optional)',
                  }),
                  _jsx('textarea', {
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
                    rows: 3,
                    placeholder: 'Enter task description',
                    value: newTaskDescription,
                    onChange: (e) => setNewTaskDescription(e.target.value),
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'flex gap-2 justify-end',
                children: [
                  _jsx(Button, {
                    variant: 'ghost',
                    onClick: () => setShowAddForm(false),
                    size: 'sm',
                    children: 'Cancel',
                  }),
                  _jsx(Button, {
                    variant: 'primary',
                    onClick: handleAddTask,
                    size: 'sm',
                    children: 'Add Task',
                  }),
                ],
              }),
            ],
          }),
        }),
      incompleteTasks.length > 0 &&
        _jsxs('div', {
          className: 'space-y-2',
          children: [
            _jsxs('h3', {
              className: 'text-sm font-semibold text-gray-500 uppercase',
              children: ['To Do (', incompleteTasks.length, ')'],
            }),
            incompleteTasks.map((task) =>
              _jsx(
                Card,
                {
                  variant: 'outlined',
                  padding: 'md',
                  className: 'hover:shadow-md transition-shadow',
                  children: _jsxs('div', {
                    className: 'flex items-start gap-3',
                    children: [
                      _jsx(Checkbox, {
                        checked: task.completed,
                        onChange: () => onTaskToggle(task.id),
                        className: 'mt-1',
                      }),
                      _jsxs('div', {
                        className: 'flex-1 min-w-0',
                        children: [
                          _jsx('h4', {
                            className: 'text-base font-medium text-gray-900',
                            children: task.title,
                          }),
                          task.description &&
                            _jsx('p', {
                              className: 'text-sm text-gray-600 mt-1',
                              children: task.description,
                            }),
                          task.labels.length > 0 &&
                            _jsx('div', {
                              className: 'flex gap-2 mt-2',
                              children: task.labels.map((label) =>
                                _jsx(
                                  Badge,
                                  { variant: 'primary', size: 'sm', children: label },
                                  label
                                )
                              ),
                            }),
                          task.estimatedDuration &&
                            _jsxs('p', {
                              className: 'text-xs text-gray-500 mt-2',
                              children: ['Est. ', task.estimatedDuration, ' min'],
                            }),
                        ],
                      }),
                      _jsx('button', {
                        onClick: () => onTaskDelete(task.id),
                        className: 'text-gray-400 hover:text-red-600 transition-colors',
                        'aria-label': 'Delete task',
                        children: _jsx('svg', {
                          className: 'w-5 h-5',
                          fill: 'none',
                          viewBox: '0 0 24 24',
                          stroke: 'currentColor',
                          children: _jsx('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
                          }),
                        }),
                      }),
                    ],
                  }),
                },
                task.id
              )
            ),
          ],
        }),
      completedTasks.length > 0 &&
        _jsxs('div', {
          className: 'space-y-2',
          children: [
            _jsxs('h3', {
              className: 'text-sm font-semibold text-gray-500 uppercase',
              children: ['Completed (', completedTasks.length, ')'],
            }),
            completedTasks.map((task) =>
              _jsx(
                Card,
                {
                  variant: 'outlined',
                  padding: 'md',
                  className: 'opacity-60',
                  children: _jsxs('div', {
                    className: 'flex items-start gap-3',
                    children: [
                      _jsx(Checkbox, {
                        checked: task.completed,
                        onChange: () => onTaskToggle(task.id),
                        className: 'mt-1',
                      }),
                      _jsxs('div', {
                        className: 'flex-1 min-w-0',
                        children: [
                          _jsx('h4', {
                            className: 'text-base font-medium text-gray-900 line-through',
                            children: task.title,
                          }),
                          task.description &&
                            _jsx('p', {
                              className: 'text-sm text-gray-600 mt-1 line-through',
                              children: task.description,
                            }),
                        ],
                      }),
                      _jsx('button', {
                        onClick: () => onTaskDelete(task.id),
                        className: 'text-gray-400 hover:text-red-600 transition-colors',
                        'aria-label': 'Delete task',
                        children: _jsx('svg', {
                          className: 'w-5 h-5',
                          fill: 'none',
                          viewBox: '0 0 24 24',
                          stroke: 'currentColor',
                          children: _jsx('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
                          }),
                        }),
                      }),
                    ],
                  }),
                },
                task.id
              )
            ),
          ],
        }),
      tasks.length === 0 &&
        _jsx(Card, {
          variant: 'outlined',
          padding: 'lg',
          className: 'text-center',
          children: _jsxs('div', {
            className: 'py-8',
            children: [
              _jsx('svg', {
                className: 'mx-auto h-12 w-12 text-gray-400',
                fill: 'none',
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                children: _jsx('path', {
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                }),
              }),
              _jsx('h3', {
                className: 'mt-2 text-sm font-medium text-gray-900',
                children: 'No tasks',
              }),
              _jsx('p', {
                className: 'mt-1 text-sm text-gray-500',
                children: 'Get started by creating a new task.',
              }),
              _jsx('div', {
                className: 'mt-6',
                children: _jsx(Button, {
                  onClick: () => setShowAddForm(true),
                  variant: 'primary',
                  children: '+ Create Task',
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
//# sourceMappingURL=TaskList.js.map
