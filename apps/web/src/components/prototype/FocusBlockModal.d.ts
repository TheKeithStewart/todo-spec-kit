import type { Task } from './TaskList';
export interface FocusBlock {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  tasks: string[];
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
}: FocusBlockModalProps): import('react/jsx-runtime').JSX.Element;
export {};
//# sourceMappingURL=FocusBlockModal.d.ts.map
