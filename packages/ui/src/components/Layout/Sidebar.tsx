import { HTMLAttributes, forwardRef } from 'react';

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

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      position = 'left',
      width = 'md',
      collapsible = false,
      collapsed = false,
      onCollapsedChange,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'h-full bg-white border-gray-200 transition-all duration-300 flex flex-col relative';

    const widthStyles = collapsed
      ? 'w-16'
      : {
          sm: 'w-48',
          md: 'w-64',
          lg: 'w-80',
        }[width];

    const borderStyles = position === 'left' ? 'border-r' : 'border-l';

    return (
      <aside
        ref={ref}
        className={`${baseStyles} ${widthStyles} ${borderStyles} ${className}`}
        {...props}
      >
        {collapsible && (
          <button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="absolute top-4 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform ${
                collapsed
                  ? position === 'left'
                    ? 'rotate-0'
                    : 'rotate-180'
                  : position === 'left'
                    ? 'rotate-180'
                    : 'rotate-0'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <div className={`flex-1 overflow-y-auto ${collapsed ? 'hidden' : 'block'}`}>{children}</div>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
