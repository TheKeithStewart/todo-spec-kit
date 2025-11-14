import { HTMLAttributes, ReactNode } from 'react';
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
declare const Header: import('react').ForwardRefExoticComponent<
  HeaderProps & import('react').RefAttributes<HTMLElement>
>;
export default Header;
//# sourceMappingURL=Header.d.ts.map
