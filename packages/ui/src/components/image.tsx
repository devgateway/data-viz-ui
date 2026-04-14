import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import type { SuiSize } from '../types/semantic-sizes';

const sizeMap: Record<SuiSize, string> = {
  mini: 'w-4 h-4',
  tiny: 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-16 h-16',
  big: 'w-20 h-20',
  huge: 'w-24 h-24',
  massive: 'w-32 h-32',
};

const imageVariants = cva('', {
  variants: {
    circular: { true: 'rounded-full' },
    rounded: { true: 'rounded-md' },
    fluid: { true: 'w-full' },
    avatar: { true: 'h-8 w-8 rounded-full object-cover' },
  },
});

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  size?: SuiSize;
  circular?: boolean;
  rounded?: boolean;
  fluid?: boolean;
  avatar?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, size, circular, rounded, fluid, avatar, ...props }, ref) => (
    <img
      ref={ref}
      className={cn(
        'ui image',
        circular && 'circular',
        rounded && 'rounded',
        fluid && 'fluid',
        avatar && 'avatar',
        imageVariants({ circular, rounded, fluid, avatar }),
        size && !fluid && !avatar && sizeMap[size],
        className,
      )}
      {...props}
    />
  ),
);
Image.displayName = 'Image';
