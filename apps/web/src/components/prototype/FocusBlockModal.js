import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker, Select, Checkbox } from '@stackday/ui';
export default function FocusBlockModal({ open, onClose, onSave, availableTasks }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [selectedTasks, setSelectedTasks] = useState([]);
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
  const handleTaskToggle = (taskId) => {
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
  return _jsx(Modal, {
    open: open,
    onClose: onClose,
    title: 'Create Focus Block',
    size: 'lg',
    footer: _jsxs(_Fragment, {
      children: [
        _jsx(Button, { variant: 'ghost', onClick: onClose, children: 'Cancel' }),
        _jsx(Button, { variant: 'primary', onClick: handleSave, children: 'Create Focus Block' }),
      ],
    }),
    children: _jsxs('div', {
      className: 'space-y-4',
      children: [
        _jsx(Input, {
          label: 'Focus Block Title',
          placeholder: 'e.g., Morning Deep Work',
          value: title,
          onChange: (e) => setTitle(e.target.value),
          fullWidth: true,
        }),
        _jsxs('div', {
          className: 'grid grid-cols-3 gap-4',
          children: [
            _jsx(DatePicker, { label: 'Date', value: date, onChange: setDate }),
            _jsx(TimePicker, {
              label: 'Start Time',
              value: startTime,
              onChange: setStartTime,
              interval: 15,
            }),
            _jsx(TimePicker, {
              label: 'End Time',
              value: endTime,
              onChange: setEndTime,
              interval: 15,
            }),
          ],
        }),
        _jsx('div', {
          className: 'bg-gray-50 border border-gray-200 rounded-lg p-3',
          children: _jsxs('div', {
            className: 'text-sm text-gray-600',
            children: [
              'Duration:',
              ' ',
              _jsxs('span', {
                className: 'font-semibold text-gray-900',
                children: [calculateDuration(), ' minutes'],
              }),
            ],
          }),
        }),
        _jsxs('div', {
          children: [
            _jsx('label', {
              className: 'block text-sm font-medium text-gray-700 mb-2',
              children: 'Tasks to Focus On (optional)',
            }),
            _jsx('div', {
              className: 'border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2',
              children:
                availableTasks.length > 0
                  ? availableTasks
                      .filter((task) => !task.completed)
                      .map((task) =>
                        _jsx(
                          Checkbox,
                          {
                            label: task.title,
                            checked: selectedTasks.includes(task.id),
                            onChange: () => handleTaskToggle(task.id),
                          },
                          task.id
                        )
                      )
                  : _jsx('p', {
                      className: 'text-sm text-gray-500 italic',
                      children: 'No tasks available',
                    }),
            }),
            selectedTasks.length > 0 &&
              _jsxs('p', {
                className: 'text-xs text-gray-500 mt-1',
                children: [selectedTasks.length, ' task(s) selected'],
              }),
          ],
        }),
        _jsxs('div', {
          className: 'border-t border-gray-200 pt-4',
          children: [
            _jsx(Checkbox, {
              label: 'Include break time',
              checked: breakEnabled,
              onChange: (e) => setBreakEnabled(e.target.checked),
            }),
            breakEnabled &&
              _jsx('div', {
                className: 'mt-3 ml-6',
                children: _jsx(Select, {
                  label: 'Break Duration',
                  options: [
                    { label: '5 minutes', value: '5' },
                    { label: '10 minutes', value: '10' },
                    { label: '15 minutes', value: '15' },
                    { label: '20 minutes', value: '20' },
                    { label: '30 minutes', value: '30' },
                  ],
                  value: breakDuration,
                  onChange: (e) => setBreakDuration(e.target.value),
                }),
              }),
          ],
        }),
        _jsxs('div', {
          className: 'bg-primary-50 border border-primary-200 rounded-lg p-4',
          children: [
            _jsx('h4', {
              className: 'text-sm font-semibold text-primary-900 mb-2',
              children: 'Summary',
            }),
            _jsxs('ul', {
              className: 'text-sm text-primary-800 space-y-1',
              children: [
                _jsxs('li', {
                  children: [
                    '\u2022 ',
                    calculateDuration(),
                    ' minute focus session',
                    breakEnabled && ` (includes ${breakDuration} min break)`,
                  ],
                }),
                _jsxs('li', { children: ['\u2022 ', selectedTasks.length, ' task(s) scheduled'] }),
                _jsxs('li', {
                  children: ['\u2022 Scheduled for ', date.toLocaleDateString(), ' at ', startTime],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//# sourceMappingURL=FocusBlockModal.js.map
