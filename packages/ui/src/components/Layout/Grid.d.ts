import { HTMLAttributes } from 'react';
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /** Responsive column configuration */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 6 | 12;
  };
}
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /** Wrap items */
  wrap?: boolean;
}
declare const Grid: import('react').ForwardRefExoticComponent<
  GridProps & import('react').RefAttributes<HTMLDivElement>
>;
export declare const Flex: import('react').ForwardRefExoticComponent<
  FlexProps & import('react').RefAttributes<HTMLDivElement>
>;
export default Grid;
//# sourceMappingURL=Grid.d.ts.map
