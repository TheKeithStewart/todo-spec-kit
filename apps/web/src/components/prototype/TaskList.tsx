import { useState } from 'react';
import { Card, Button, Badge, Checkbox, Input } from '@stackday/ui';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedDuration?: number;
  labels: string[];
  dueDate?: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onTaskAdd: (task: Omit<Task, 'id'>) => void;
  onTaskDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskToggle, onTaskAdd, onTaskDelete }: TaskListProps) {
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
          {showAddForm ? 'Cancel' : '+ Add Task'}
        </Button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card variant="outlined" padding="md">
          <div className="space-y-3">
            <Input
              label="Task Title"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowAddForm(false)} size="sm">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddTask} size="sm">
                Add Task
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            To Do ({incompleteTasks.length})
          </h3>
          {incompleteTasks.map((task) => (
            <Card
              key={task.id}
              variant="outlined"
              padding="md"
              className="hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.completed}
                  onChange={() => onTaskToggle(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-gray-900">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                  {task.labels.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {task.labels.map((label) => (
                        <Badge key={label} variant="primary" size="sm">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {task.estimatedDuration && (
                    <p className="text-xs text-gray-500 mt-2">Est. {task.estimatedDuration} min</p>
                  )}
                </div>
                <button
                  onClick={() => onTaskDelete(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            Completed ({completedTasks.length})
          </h3>
          {completedTasks.map((task) => (
            <Card key={task.id} variant="outlined" padding="md" className="opacity-60">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.completed}
                  onChange={() => onTaskToggle(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-gray-900 line-through">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1 line-through">{task.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onTaskDelete(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <Card variant="outlined" padding="lg" className="text-center">
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
            <div className="mt-6">
              <Button onClick={() => setShowAddForm(true)} variant="primary">
                + Create Task
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
