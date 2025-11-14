import { HTMLAttributes, forwardRef } from 'react';

export interface MainProps extends HTMLAttributes<HTMLElement> {
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Max width constraint */
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Center content horizontally */
  centered?: boolean;
}

const Main = forwardRef<HTMLElement, MainProps>(
  (
    { padding = 'md', maxWidth = 'full', centered = false, className = '', children, ...props },
    ref
  ) => {
    const baseStyles = 'flex-1 overflow-auto';

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }[padding];

    const maxWidthStyles = {
      none: '',
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }[maxWidth];

    const centeredStyles = centered ? 'mx-auto' : '';

    return (
      <main ref={ref} className={`${baseStyles} ${paddingStyles} ${className}`} {...props}>
        <div className={`${maxWidthStyles} ${centeredStyles}`}>{children}</div>
      </main>
    );
  }
);

Main.displayName = 'Main';

export default Main;
