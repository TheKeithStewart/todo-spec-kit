import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { Card, Badge } from '@stackday/ui';

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'task' | 'focus-block' | 'event';
  color?: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  view: 'day' | 'week' | 'month';
}

export default function CalendarView({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
  view,
}: CalendarViewProps) {
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="text-center py-2 border-b border-gray-200">
            <div className="text-xs font-medium text-gray-500">{format(day, 'EEE')}</div>
            <div
              className={`text-sm font-semibold ${
                isSameDay(day, selectedDate) ? 'text-primary-600' : 'text-gray-900'
              }`}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}

        {/* Time Slots */}
        {Array.from({ length: 24 }, (_, hour) => (
          <div key={hour} className="col-span-7 grid grid-cols-7 gap-2 border-b border-gray-100">
            <div className="col-span-1 text-xs text-gray-500 py-2">
              {format(new Date().setHours(hour, 0, 0, 0), 'h:mm a')}
            </div>
            {weekDays.map((day) => {
              const dayEvents = events.filter((event) => {
                const eventHour = event.startTime.getHours();
                return isSameDay(event.startTime, day) && eventHour === hour;
              });

              return (
                <div key={`${day.toISOString()}-${hour}`} className="col-span-1 min-h-[60px] p-1">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={`w-full text-left text-xs p-2 rounded mb-1 transition-colors ${
                        event.type === 'focus-block'
                          ? 'bg-primary-100 hover:bg-primary-200 text-primary-900'
                          : event.type === 'task'
                            ? 'bg-green-100 hover:bg-green-200 text-green-900'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                      }`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {format(event.startTime, 'h:mm')} - {format(event.endTime, 'h:mm a')}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="space-y-2">
        <div className="text-center py-4 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-500">{format(selectedDate, 'EEEE')}</div>
          <div className="text-2xl font-bold text-gray-900">
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
        </div>

        {hours.map((hour) => {
          const hourEvents = events.filter((event) => {
            return isSameDay(event.startTime, selectedDate) && event.startTime.getHours() === hour;
          });

          return (
            <div key={hour} className="flex gap-4 border-b border-gray-100 py-3">
              <div className="w-20 text-sm text-gray-500">
                {format(new Date().setHours(hour, 0, 0, 0), 'h:mm a')}
              </div>
              <div className="flex-1 space-y-2">
                {hourEvents.length > 0 ? (
                  hourEvents.map((event) => (
                    <Card
                      key={event.id}
                      variant="outlined"
                      padding="sm"
                      interactive
                      onClick={() => onEventClick(event)}
                      className={
                        event.type === 'focus-block'
                          ? 'border-primary-300 bg-primary-50'
                          : event.type === 'task'
                            ? 'border-green-300 bg-green-50'
                            : 'border-blue-300 bg-blue-50'
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-600">
                            {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                          </div>
                        </div>
                        <Badge
                          variant={
                            event.type === 'focus-block'
                              ? 'primary'
                              : event.type === 'task'
                                ? 'success'
                                : 'info'
                          }
                          size="sm"
                        >
                          {event.type}
                        </Badge>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 italic">No events</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
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

    return (
      <div className="space-y-2">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(event.startTime, day));
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth =
                day >= startOfMonth(selectedDate) && day <= endOfMonth(selectedDate);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => onDateSelect(day)}
                  className={`min-h-[100px] p-2 border rounded-lg transition-colors text-left ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : isToday
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                  } ${!isCurrentMonth && 'opacity-40'}`}
                >
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${
                          event.type === 'focus-block'
                            ? 'bg-primary-200 text-primary-900'
                            : event.type === 'task'
                              ? 'bg-green-200 text-green-900'
                              : 'bg-blue-200 text-blue-900'
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card variant="outlined" padding="md">
      {view === 'day' && renderDayView()}
      {view === 'week' && renderWeekView()}
      {view === 'month' && renderMonthView()}
    </Card>
  );
}
