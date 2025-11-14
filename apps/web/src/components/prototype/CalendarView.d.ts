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
}: CalendarViewProps): import('react/jsx-runtime').JSX.Element;
export {};
//# sourceMappingURL=CalendarView.d.ts.map
