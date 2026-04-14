import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const headingVariants = cva('font-bold leading-tight text-sui-text', {
  variants: {
    size: {
      huge: 'text-4xl',
      large: 'text-3xl',
      medium: 'text-2xl',
      small: 'text-xl',
      tiny: 'text-base',
    },
    dividing: { true: 'border-b border-sui-border pb-3' },
    icon: { true: 'flex items-center gap-3' },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: { size: 'medium' },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  dividing?: boolean;
  icon?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

const defaultTagMap: Record<NonNullable<HeadingProps['size']>, HeadingProps['as']> = {
  huge: 'h1',
  large: 'h2',
  medium: 'h3',
  small: 'h4',
  tiny: 'h5',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as, size = 'medium', dividing, icon, textAlign, children, ...props }, ref) => {
    const Tag = as ?? defaultTagMap[size] ?? 'h3';
    return (
      <Tag
        ref={ref}
        className={cn(
          'ui header',
          size && size,
          headingVariants({ size, dividing, icon, textAlign }),
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
Heading.displayName = 'Heading';
