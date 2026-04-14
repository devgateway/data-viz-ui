import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// SUI segment: bg white, border rgba(34,36,38,.15), radius .28571429rem,
// shadow 0 1px 2px 0 rgba(34,36,38,.15), padding 1em
const segmentVariants = cva(
  'relative rounded-sui border border-sui-border bg-white shadow-segment',
  {
    variants: {
      padding: {
        default: 'p-[1em]',
        none:    'p-0',
      },
      basic:       { true: 'border-0 shadow-none bg-transparent' },
      placeholder: { true: 'flex min-h-[15em] items-center justify-center' },
      // vertical variant removes sides — common SUI pattern
      vertical:    { true: 'rounded-none border-x-0 border-t-0 border-b border-sui-border shadow-none p-[1em] px-0' },
    },
    defaultVariants: { padding: 'default' },
  },
);

export interface SegmentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof segmentVariants> {
  placeholder?: boolean;
  basic?: boolean;
  vertical?: boolean;
  color?: 'blue' | 'green' | 'red' | 'orange' | 'yellow' | 'teal' | 'violet' | 'purple' | string;
  textAlign?: 'left' | 'center' | 'right';
  loading?: boolean;
}

const colorBorderMap: Record<string, string> = {
  blue:   'border-t-[2px] border-t-sui-blue',
  green:  'border-t-[2px] border-t-sui-green',
  red:    'border-t-[2px] border-t-sui-red',
  orange: 'border-t-[2px] border-t-sui-orange',
  yellow: 'border-t-[2px] border-t-sui-yellow',
  teal:   'border-t-[2px] border-t-sui-teal',
  violet: 'border-t-[2px] border-t-sui-violet',
  purple: 'border-t-[2px] border-t-sui-purple',
};

export const Segment = React.forwardRef<HTMLDivElement, SegmentProps>(
  (
    { className, placeholder, basic, vertical, color, textAlign, loading, children, padding, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'ui segment',
        basic && 'basic',
        vertical && 'vertical',
        placeholder && 'placeholder',
        color && color,
        segmentVariants({ padding, basic, placeholder, vertical }),
        color && colorBorderMap[color],
        textAlign === 'center' && 'text-center',
        textAlign === 'right'  && 'text-right',
        loading && 'pointer-events-none select-none opacity-60',
        className,
      )}
      {...props}
    >
      {children}
      {loading && (
        // Inverted dimmer pattern from SUI
        <div className="absolute inset-0 flex items-center justify-center rounded-sui bg-white/85">
          <span className="inline-block h-8 w-8 animate-spin rounded-full border-[.2em] border-[rgba(0,0,0,.1)] border-t-sui-grey" />
        </div>
      )}
    </div>
  ),
);
Segment.displayName = 'Segment';
