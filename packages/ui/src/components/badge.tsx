import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import type { SuiSize } from '../types/semantic-sizes';

// SUI label: bg #e8e8e8, color rgba(0,0,0,.6), radius .28571429rem
// padding .58333333em .833em, font-size .85714286rem, font-weight 700
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sui font-bold leading-none',
  {
    variants: {
      color: {
        default: 'bg-sui-label-bg text-[rgba(0,0,0,.6)]',
        blue:    'bg-sui-blue   text-white',
        green:   'bg-sui-green  text-white',
        red:     'bg-sui-red    text-white',
        orange:  'bg-sui-orange text-white',
        yellow:  'bg-sui-yellow text-sui-text',
        teal:    'bg-sui-teal   text-white',
        violet:  'bg-sui-violet text-white',
        purple:  'bg-sui-purple text-white',
        grey:    'bg-[#767676]  text-white',
        black:   'bg-[#1b1c1d]  text-white',
      },
      basic: { true: 'border border-current bg-transparent' },
      tag:   { true: 'rounded-r-full pr-[1em] pl-[.833em]' },
    },
    defaultVariants: { color: 'default' },
  },
);

// SUI label sizes — padding scales with font-size since em is relative
const sizeMap: Record<SuiSize, string> = {
  mini:    'px-[.58333333em] py-[.3em]  text-[.6875rem]',
  tiny:    'px-[.64285714em] py-[.35em] text-[.75rem]',
  small:   'px-[.71428571em] py-[.4em]  text-[.85714286rem]',
  medium:  'px-[.833em]      py-[.58333333em] text-[.85714286rem]',
  large:   'px-[.9em]        py-[.65em] text-[1rem]',
  big:     'px-[1em]         py-[.7em]  text-[1.14285714rem]',
  huge:    'px-[1.1em]       py-[.75em] text-[1.28571429rem]',
  massive: 'px-[1.2em]       py-[.8em]  text-[1.42857143rem]',
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  color?: 'default' | 'blue' | 'green' | 'red' | 'orange' | 'yellow' | 'teal' | 'violet' | 'purple' | 'grey' | 'black';
  basic?: boolean;
  size?: SuiSize;
  tag?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color, basic, size = 'medium', tag, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'ui label',
        color && color !== 'default' && color,
        basic && 'basic',
        size && size !== 'medium' && size,
        tag && 'tag',
        badgeVariants({ color, basic, tag }),
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';
