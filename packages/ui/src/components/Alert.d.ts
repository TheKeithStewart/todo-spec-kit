import { HTMLAttributes, ReactNode } from 'react';
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: 'success' | 'warning' | 'error' | 'info';
  /** Alert title */
  title?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Closeable alert */
  onClose?: () => void;
  /** Custom icon */
  icon?: ReactNode;
}
declare const Alert: import('react').ForwardRefExoticComponent<
  AlertProps & import('react').RefAttributes<HTMLDivElement>
>;
export default Alert;
//# sourceMappingURL=Alert.d.ts.map
