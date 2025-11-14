import { HTMLAttributes, forwardRef, ReactNode } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  logo?: ReactNode;
  /** Navigation items */
  nav?: ReactNode;
  /** Actions (buttons, user menu, etc.) */
  actions?: ReactNode;
  /** Sticky header */
  sticky?: boolean;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ logo, nav, actions, sticky = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'w-full bg-white border-b border-gray-200 transition-shadow z-40';
    const stickyStyles = sticky ? 'sticky top-0' : '';

    return (
      <header ref={ref} className={`${baseStyles} ${stickyStyles} ${className}`} {...props}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            {logo && <div className="flex-shrink-0">{logo}</div>}

            {/* Navigation Section */}
            {nav && <nav className="hidden md:flex items-center space-x-8 flex-1 px-8">{nav}</nav>}

            {/* Actions Section */}
            {actions && <div className="flex items-center space-x-4">{actions}</div>}

            {/* Custom children if no structured props */}
            {!logo && !nav && !actions && children}
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
