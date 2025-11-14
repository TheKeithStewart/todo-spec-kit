import { useState } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker, Select, Checkbox } from '@stackday/ui';
import type { Task } from './TaskList';

export interface FocusBlock {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  tasks: string[]; // Task IDs
  breakEnabled: boolean;
  breakDuration: number;
}

interface FocusBlockModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (focusBlock: Omit<FocusBlock, 'id'>) => void;
  availableTasks: Task[];
}

export default function FocusBlockModal({
  open,
  onClose,
  onSave,
  availableTasks,
}: FocusBlockModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [breakEnabled, setBreakEnabled] = useState(true);
  const [breakDuration, setBreakDuration] = useState('15');

  const handleReset = () => {
    setTitle('');
    setDate(new Date());
    setStartTime('09:00');
    setEndTime('10:00');
    setSelectedTasks([]);
    setBreakEnabled(true);
    setBreakDuration('15');
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for the focus block');
      return;
    }

    // Parse time and create full Date objects
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endHour, endMinute, 0, 0);

    if (endDate <= startDate) {
      alert('End time must be after start time');
      return;
    }

    onSave({
      title,
      startTime: startDate,
      endTime: endDate,
      tasks: selectedTasks,
      breakEnabled,
      breakDuration: parseInt(breakDuration, 10),
    });

    handleReset();
    onClose();
  };

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const calculateDuration = () => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const totalMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    return totalMinutes;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Focus Block"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Create Focus Block
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Title */}
        <Input
          label="Focus Block Title"
          placeholder="e.g., Morning Deep Work"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        {/* Date and Time */}
        <div className="grid grid-cols-3 gap-4">
          <DatePicker label="Date" value={date} onChange={setDate} />
          <TimePicker label="Start Time" value={startTime} onChange={setStartTime} interval={15} />
          <TimePicker label="End Time" value={endTime} onChange={setEndTime} interval={15} />
        </div>

        {/* Duration Display */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-sm text-gray-600">
            Duration:{' '}
            <span className="font-semibold text-gray-900">{calculateDuration()} minutes</span>
          </div>
        </div>

        {/* Tasks Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tasks to Focus On (optional)
          </label>
          <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
            {availableTasks.length > 0 ? (
              availableTasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <Checkbox
                    key={task.id}
                    label={task.title}
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleTaskToggle(task.id)}
                  />
                ))
            ) : (
              <p className="text-sm text-gray-500 italic">No tasks available</p>
            )}
          </div>
          {selectedTasks.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">{selectedTasks.length} task(s) selected</p>
          )}
        </div>

        {/* Break Settings */}
        <div className="border-t border-gray-200 pt-4">
          <Checkbox
            label="Include break time"
            checked={breakEnabled}
            onChange={(e) => setBreakEnabled(e.target.checked)}
          />

          {breakEnabled && (
            <div className="mt-3 ml-6">
              <Select
                label="Break Duration"
                options={[
                  { label: '5 minutes', value: '5' },
                  { label: '10 minutes', value: '10' },
                  { label: '15 minutes', value: '15' },
                  { label: '20 minutes', value: '20' },
                  { label: '30 minutes', value: '30' },
                ]}
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-primary-900 mb-2">Summary</h4>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>
              • {calculateDuration()} minute focus session
              {breakEnabled && ` (includes ${breakDuration} min break)`}
            </li>
            <li>• {selectedTasks.length} task(s) scheduled</li>
            <li>
              • Scheduled for {date.toLocaleDateString()} at {startTime}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
