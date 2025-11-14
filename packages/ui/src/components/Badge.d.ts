import { HTMLAttributes, ReactNode } from 'react';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon before text */
  icon?: ReactNode;
  /** Removable badge with close button */
  onRemove?: () => void;
  /** Dot indicator */
  dot?: boolean;
}
declare const Badge: import('react').ForwardRefExoticComponent<
  BadgeProps & import('react').RefAttributes<HTMLSpanElement>
>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map
