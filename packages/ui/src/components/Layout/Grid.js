import { jsx as _jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Grid = forwardRef(
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
    return _jsx('div', {
      ref: ref,
      className: `${baseStyles} ${colsStyles} ${gapStyles} ${responsiveStyles} ${className}`,
      ...props,
      children: children,
    });
  }
);
Grid.displayName = 'Grid';
export const Flex = forwardRef(
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
    return _jsx('div', {
      ref: ref,
      className: `${baseStyles} ${directionStyles} ${alignStyles} ${justifyStyles} ${gapStyles} ${wrapStyles} ${className}`,
      ...props,
      children: children,
    });
  }
);
Flex.displayName = 'Flex';
export default Grid;
//# sourceMappingURL=Grid.js.map
