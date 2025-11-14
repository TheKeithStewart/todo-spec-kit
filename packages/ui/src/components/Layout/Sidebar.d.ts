import { HTMLAttributes } from 'react';
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Sidebar position */
  position?: 'left' | 'right';
  /** Width of sidebar */
  width?: 'sm' | 'md' | 'lg';
  /** Collapsible sidebar */
  collapsible?: boolean;
  /** Collapsed state (controlled) */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
}
declare const Sidebar: import('react').ForwardRefExoticComponent<
  SidebarProps & import('react').RefAttributes<HTMLElement>
>;
export default Sidebar;
//# sourceMappingURL=Sidebar.d.ts.map
