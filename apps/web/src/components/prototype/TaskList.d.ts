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
export default function TaskList({
  tasks,
  onTaskToggle,
  onTaskAdd,
  onTaskDelete,
}: TaskListProps): import('react/jsx-runtime').JSX.Element;
export {};
//# sourceMappingURL=TaskList.d.ts.map
