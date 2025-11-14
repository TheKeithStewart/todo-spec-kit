import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { Card, Badge } from '@stackday/ui';
export default function CalendarView({ events, selectedDate, onDateSelect, onEventClick, view }) {
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    return _jsxs('div', {
      className: 'grid grid-cols-7 gap-2',
      children: [
        weekDays.map((day) =>
          _jsxs(
            'div',
            {
              className: 'text-center py-2 border-b border-gray-200',
              children: [
                _jsx('div', {
                  className: 'text-xs font-medium text-gray-500',
                  children: format(day, 'EEE'),
                }),
                _jsx('div', {
                  className: `text-sm font-semibold ${isSameDay(day, selectedDate) ? 'text-primary-600' : 'text-gray-900'}`,
                  children: format(day, 'd'),
                }),
              ],
            },
            day.toISOString()
          )
        ),
        Array.from({ length: 24 }, (_, hour) =>
          _jsxs(
            'div',
            {
              className: 'col-span-7 grid grid-cols-7 gap-2 border-b border-gray-100',
              children: [
                _jsx('div', {
                  className: 'col-span-1 text-xs text-gray-500 py-2',
                  children: format(new Date().setHours(hour, 0, 0, 0), 'h:mm a'),
                }),
                weekDays.map((day) => {
                  const dayEvents = events.filter((event) => {
                    const eventHour = event.startTime.getHours();
                    return isSameDay(event.startTime, day) && eventHour === hour;
                  });
                  return _jsx(
                    'div',
                    {
                      className: 'col-span-1 min-h-[60px] p-1',
                      children: dayEvents.map((event) =>
                        _jsxs(
                          'button',
                          {
                            onClick: () => onEventClick(event),
                            className: `w-full text-left text-xs p-2 rounded mb-1 transition-colors ${
                              event.type === 'focus-block'
                                ? 'bg-primary-100 hover:bg-primary-200 text-primary-900'
                                : event.type === 'task'
                                  ? 'bg-green-100 hover:bg-green-200 text-green-900'
                                  : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                            }`,
                            children: [
                              _jsx('div', {
                                className: 'font-medium truncate',
                                children: event.title,
                              }),
                              _jsxs('div', {
                                className: 'text-xs opacity-75',
                                children: [
                                  format(event.startTime, 'h:mm'),
                                  ' - ',
                                  format(event.endTime, 'h:mm a'),
                                ],
                              }),
                            ],
                          },
                          event.id
                        )
                      ),
                    },
                    `${day.toISOString()}-${hour}`
                  );
                }),
              ],
            },
            hour
          )
        ),
      ],
    });
  };
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return _jsxs('div', {
      className: 'space-y-2',
      children: [
        _jsxs('div', {
          className: 'text-center py-4 border-b border-gray-200',
          children: [
            _jsx('div', {
              className: 'text-sm font-medium text-gray-500',
              children: format(selectedDate, 'EEEE'),
            }),
            _jsx('div', {
              className: 'text-2xl font-bold text-gray-900',
              children: format(selectedDate, 'MMMM d, yyyy'),
            }),
          ],
        }),
        hours.map((hour) => {
          const hourEvents = events.filter((event) => {
            return isSameDay(event.startTime, selectedDate) && event.startTime.getHours() === hour;
          });
          return _jsxs(
            'div',
            {
              className: 'flex gap-4 border-b border-gray-100 py-3',
              children: [
                _jsx('div', {
                  className: 'w-20 text-sm text-gray-500',
                  children: format(new Date().setHours(hour, 0, 0, 0), 'h:mm a'),
                }),
                _jsx('div', {
                  className: 'flex-1 space-y-2',
                  children:
                    hourEvents.length > 0
                      ? hourEvents.map((event) =>
                          _jsx(
                            Card,
                            {
                              variant: 'outlined',
                              padding: 'sm',
                              interactive: true,
                              onClick: () => onEventClick(event),
                              className:
                                event.type === 'focus-block'
                                  ? 'border-primary-300 bg-primary-50'
                                  : event.type === 'task'
                                    ? 'border-green-300 bg-green-50'
                                    : 'border-blue-300 bg-blue-50',
                              children: _jsxs('div', {
                                className: 'flex items-start justify-between',
                                children: [
                                  _jsxs('div', {
                                    children: [
                                      _jsx('div', {
                                        className: 'font-medium text-gray-900',
                                        children: event.title,
                                      }),
                                      _jsxs('div', {
                                        className: 'text-sm text-gray-600',
                                        children: [
                                          format(event.startTime, 'h:mm a'),
                                          ' - ',
                                          format(event.endTime, 'h:mm a'),
                                        ],
                                      }),
                                    ],
                                  }),
                                  _jsx(Badge, {
                                    variant:
                                      event.type === 'focus-block'
                                        ? 'primary'
                                        : event.type === 'task'
                                          ? 'success'
                                          : 'info',
                                    size: 'sm',
                                    children: event.type,
                                  }),
                                ],
                              }),
                            },
                            event.id
                          )
                        )
                      : _jsx('div', {
                          className: 'text-sm text-gray-400 italic',
                          children: 'No events',
                        }),
                }),
              ],
            },
            hour
          );
        }),
      ],
    });
  };
  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(startOfWeek(monthEnd), 6 * 7);
    const weeks = [];
    let currentWeek = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      currentWeek.push(currentDate);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate = addDays(currentDate, 1);
    }
    return _jsxs('div', {
      className: 'space-y-2',
      children: [
        _jsx('div', {
          className: 'grid grid-cols-7 gap-2',
          children: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
            _jsx(
              'div',
              { className: 'text-center text-sm font-medium text-gray-500 py-2', children: day },
              day
            )
          ),
        }),
        weeks.map((week, weekIndex) =>
          _jsx(
            'div',
            {
              className: 'grid grid-cols-7 gap-2',
              children: week.map((day) => {
                const dayEvents = events.filter((event) => isSameDay(event.startTime, day));
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth =
                  day >= startOfMonth(selectedDate) && day <= endOfMonth(selectedDate);
                return _jsxs(
                  'button',
                  {
                    onClick: () => onDateSelect(day),
                    className: `min-h-[100px] p-2 border rounded-lg transition-colors text-left ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : isToday
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                    } ${!isCurrentMonth && 'opacity-40'}`,
                    children: [
                      _jsx('div', {
                        className: `text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-500'}`,
                        children: format(day, 'd'),
                      }),
                      _jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          dayEvents
                            .slice(0, 3)
                            .map((event) =>
                              _jsx(
                                'div',
                                {
                                  className: `text-xs px-1 py-0.5 rounded truncate ${
                                    event.type === 'focus-block'
                                      ? 'bg-primary-200 text-primary-900'
                                      : event.type === 'task'
                                        ? 'bg-green-200 text-green-900'
                                        : 'bg-blue-200 text-blue-900'
                                  }`,
                                  children: event.title,
                                },
                                event.id
                              )
                            ),
                          dayEvents.length > 3 &&
                            _jsxs('div', {
                              className: 'text-xs text-gray-500',
                              children: ['+', dayEvents.length - 3, ' more'],
                            }),
                        ],
                      }),
                    ],
                  },
                  day.toISOString()
                );
              }),
            },
            weekIndex
          )
        ),
      ],
    });
  };
  return _jsxs(Card, {
    variant: 'outlined',
    padding: 'md',
    children: [
      view === 'day' && renderDayView(),
      view === 'week' && renderWeekView(),
      view === 'month' && renderMonthView(),
    ],
  });
}
//# sourceMappingURL=CalendarView.js.map
