import { HTMLAttributes } from 'react';
export interface MainProps extends HTMLAttributes<HTMLElement> {
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Max width constraint */
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Center content horizontally */
  centered?: boolean;
}
declare const Main: import('react').ForwardRefExoticComponent<
  MainProps & import('react').RefAttributes<HTMLElement>
>;
export default Main;
//# sourceMappingURL=Main.d.ts.map
