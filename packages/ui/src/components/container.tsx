import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const containerVariants = cva('mx-auto w-full px-4', {
  variants: {
    size: {
      default: 'max-w-[1200px]',
      text: 'max-w-[700px]',
      fluid: 'max-w-none',
    },
  },
  defaultVariants: { size: 'default' },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  text?: boolean;
  fluid?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justified';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, text, fluid, textAlign, children, size: _size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'ui container',
        fluid && 'fluid',
        text && 'text',
        containerVariants({ size: fluid ? 'fluid' : text ? 'text' : 'default' }),
        textAlign === 'center' && 'text-center',
        textAlign === 'right' && 'text-right',
        textAlign === 'justified' && 'text-justify',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Container.displayName = 'Container';
