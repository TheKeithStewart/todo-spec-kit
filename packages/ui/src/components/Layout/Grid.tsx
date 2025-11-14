import { HTMLAttributes, forwardRef } from 'react';

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

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, gap = 'md', responsive, className = '', children, ...props }, ref) => {
    const baseStyles = 'grid';

    const colsStyles = `grid-cols-${cols}`;

    const gapStyles = {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    }[gap];

    const responsiveStyles = responsive
      ? [
          responsive.sm && `sm:grid-cols-${responsive.sm}`,
          responsive.md && `md:grid-cols-${responsive.md}`,
          responsive.lg && `lg:grid-cols-${responsive.lg}`,
          responsive.xl && `xl:grid-cols-${responsive.xl}`,
        ]
          .filter(Boolean)
          .join(' ')
      : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${colsStyles} ${gapStyles} ${responsiveStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      gap = 'none',
      wrap = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'flex';

    const directionStyles = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    }[direction];

    const alignStyles = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    }[align];

    const justifyStyles = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }[justify];

    const gapStyles = {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    }[gap];

    const wrapStyles = wrap ? 'flex-wrap' : 'flex-nowrap';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${directionStyles} ${alignStyles} ${justifyStyles} ${gapStyles} ${wrapStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Grid;
