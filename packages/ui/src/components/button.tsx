import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Base classes match SUI button exactly:
//   font: Lato bold, 1rem, text-transform: none
//   padding: .78571429em 1.5em
//   border-radius: .28571429rem
//   transition: opacity/background/color/shadow .1s ease
const buttonBase = [
  'inline-flex items-center justify-center gap-1',
  'rounded-sui font-bold leading-[1em]',
  'py-[.78571429em] px-[1.5em]',
  'transition-[background-color,color,box-shadow,opacity] duration-[100ms] ease-[ease]',
  'cursor-pointer select-none',
  'focus-visible:outline-2 focus-visible:outline-sui-blue focus-visible:-outline-offset-1',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-[.45]',
].join(' ');

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      // Unstyled default — matches .ui.button (grey)
      default:
        'bg-sui-btn text-[rgba(0,0,0,.6)] shadow-sui-btn ' +
        'hover:bg-sui-btn-hover hover:text-[rgba(0,0,0,.8)] ' +
        'active:bg-sui-btn-active active:text-[rgba(0,0,0,.9)]',
      // .ui.primary.button
      primary:
        'bg-sui-blue text-white shadow-sui-btn ' +
        'hover:bg-sui-blue-hover ' +
        'focus:bg-sui-blue-focus ' +
        'active:bg-sui-blue-active',
      // .ui.secondary.button — dark/black
      secondary:
        'bg-sui-btn-secondary text-white shadow-sui-btn ' +
        'hover:bg-sui-btn-secondary-hover ' +
        'active:bg-[#343637]',
      // .ui.positive.button
      positive:
        'bg-sui-green text-white shadow-sui-btn ' +
        'hover:bg-sui-green-hover ' +
        'active:bg-sui-green-active',
      // .ui.negative.button
      negative:
        'bg-sui-red text-white shadow-sui-btn ' +
        'hover:bg-sui-red-hover ' +
        'active:bg-sui-red-active',
      // .ui.basic.button — transparent with border
      basic:
        'bg-transparent text-[rgba(0,0,0,.6)] ' +
        'shadow-[0_0_0_1px_rgba(34,36,38,.15)_inset] ' +
        'hover:bg-[rgba(0,0,0,.03)] hover:text-[rgba(0,0,0,.8)] ' +
        'hover:shadow-[0_0_0_1px_rgba(34,36,38,.35)_inset] ' +
        'active:bg-[rgba(0,0,0,.05)] active:shadow-[0_0_0_1px_rgba(0,0,0,.15)_inset]',
      // Ghost — no border, no bg
      ghost:
        'bg-transparent text-sui-subtext shadow-none ' +
        'hover:bg-[rgba(0,0,0,.03)] hover:text-sui-text',
    },
    size: {
      mini:    'py-[.58928571em] px-[1.125em] text-sui-mini',
      tiny:    'py-[.625em]      px-[1.25em]  text-sui-tiny',
      small:   'py-[.69642857em] px-[1.3125em] text-sui-small',
      medium:  'py-[.78571429em] px-[1.5em]   text-[1rem]',
      large:   'py-[.875em]      px-[1.5em]   text-sui-large',
      big:     'py-[.9375em]     px-[1.5625em] text-sui-big',
      huge:    'py-[1em]         px-[1.625em]  text-sui-huge',
      massive: 'py-[1.0625em]    px-[1.6875em] text-sui-massive',
    },
    iconOnly: { true: 'px-[.78571429em] aspect-square' },
    fluid: { true: 'w-full' },
  },
  defaultVariants: { variant: 'default', size: 'medium' },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  loading?: boolean;
  icon?: boolean;
  active?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as, loading, icon, active, fluid, children, disabled, ...props }, ref) => (
    <BaseButton
      ref={ref}
      render={as ? React.createElement(as) : <button />}
      className={cn(
        buttonVariants({ variant, size, iconOnly: icon, fluid }),
        'ui button',
        variant && variant !== 'default' && variant !== 'ghost' && variant,
        loading && 'loading',
        icon && 'icon',
        fluid && 'fluid',
        active && 'active',
        className,
      )}
      disabled={loading ?? disabled}
      {...(props as object)}
    >
      {loading ? (
        // SUI uses border-spinner style with rgba(0,0,0,.15) track
        <span className="inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-[rgba(0,0,0,.15)] border-t-current" />
      ) : null}
      {children}
    </BaseButton>
  ),
);
Button.displayName = 'Button';
