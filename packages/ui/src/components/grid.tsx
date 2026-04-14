import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import type { ColSpan } from '../types/col-span';

// Maps ColSpan → Tailwind grid-cols-* class
const colsMap: Record<ColSpan, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
  5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8',
  9: 'grid-cols-9', 10: 'grid-cols-10', 11: 'grid-cols-11', 12: 'grid-cols-12',
  13: 'grid-cols-13', 14: 'grid-cols-14', 15: 'grid-cols-15', 16: 'grid-cols-16',
};

const gridVariants = cva('grid', {
  variants: {
    relaxed: { true: 'gap-8', false: 'gap-4' },
    divided: { true: 'divide-x divide-sui-border' },
  },
  defaultVariants: { relaxed: false },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  columns?: ColSpan;
  stackable?: boolean;
  doubling?: boolean;
  divided?: boolean;
  celled?: boolean;
  relaxed?: boolean;
  fluid?: boolean;
  stretched?: boolean;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, stackable, doubling, divided, celled, relaxed, fluid, stretched, children, ...props }, ref) => {
    const colClass = columns ? colsMap[columns] : undefined;
    return (
      <div
        ref={ref}
        className={cn(
          'ui grid',
          stackable && 'stackable',
          divided && 'divided',
          celled && 'celled',
          gridVariants({ relaxed, divided }),
          colClass,
          stackable && 'max-sm:grid-cols-1',
          doubling && 'max-md:grid-cols-[repeat(calc(var(--cols)/2),minmax(0,1fr))]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Grid.displayName = 'Grid';

// ── GridColumn ────────────────────────────────────────────────────────────────

const colSpanMap: Record<ColSpan, string> = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
  9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
  13: 'col-span-13', 14: 'col-span-14', 15: 'col-span-15', 16: 'col-span-16',
};

// Responsive prefixed maps
const smSpanMap: Record<ColSpan, string> = Object.fromEntries(
  (Object.entries(colSpanMap) as [string, string][]).map(([k, v]) => [k, `sm:${v}`])
) as Record<ColSpan, string>;

const mdSpanMap: Record<ColSpan, string> = Object.fromEntries(
  (Object.entries(colSpanMap) as [string, string][]).map(([k, v]) => [k, `md:${v}`])
) as Record<ColSpan, string>;

// Maps ColSpan → SUI word class for "N wide column" pattern
const widthWordMap: Record<ColSpan, string> = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four',
  5: 'five', 6: 'six', 7: 'seven', 8: 'eight',
  9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve',
  13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen',
};

export interface GridColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ColSpan;
  computer?: ColSpan;
  tablet?: ColSpan;
  mobile?: ColSpan;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

export const GridColumn = React.forwardRef<HTMLDivElement, GridColumnProps>(
  ({ className, width, computer, tablet, mobile, textAlign, verticalAlign, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'column',
        width && `${widthWordMap[width]} wide`,
        computer && `${widthWordMap[computer]} wide computer`,
        tablet && `${widthWordMap[tablet]} wide tablet`,
        mobile && `${widthWordMap[mobile]} wide mobile`,
        width && colSpanMap[width],
        computer && mdSpanMap[computer],
        tablet && smSpanMap[tablet],
        mobile && colSpanMap[mobile],
        textAlign === 'center' && 'text-center',
        textAlign === 'right' && 'text-right',
        verticalAlign === 'middle' && 'self-center',
        verticalAlign === 'bottom' && 'self-end',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
GridColumn.displayName = 'GridColumn';

// ── GridRow ───────────────────────────────────────────────────────────────────

export interface GridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: ColSpan;
}

export const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(
  ({ className, columns, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('row contents', columns && colsMap[columns], className)}
      {...props}
    >
      {children}
    </div>
  ),
);
GridRow.displayName = 'GridRow';
