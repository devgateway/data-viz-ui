import * as React from 'react';
import { cn } from '../lib/utils';

// SUI input: border 1px solid rgba(34,36,38,.15), radius .28571429rem
// padding .67857143em 1em, focus border #85b7d9
// placeholder rgba(191,191,191,.87), error bg #fff6f6 border #e0b4b4 text #9f3a38

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fluid?: boolean;
  error?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, fluid, error, loading, icon, iconPosition = 'right', label, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className={cn('flex flex-col gap-1', fluid && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="text-[.92857143em] font-bold text-sui-text">
            {label}
          </label>
        )}
        <div className={cn(
          'ui input',
          fluid && 'fluid',
          error && 'error',
          loading && 'loading',
          icon && iconPosition === 'left' && 'left icon',
          icon && iconPosition !== 'left' && 'icon',
          'relative flex items-center',
          fluid && 'w-full',
        )}>
          {icon && iconPosition === 'left' && (
            <span className="pointer-events-none absolute left-[.67857143em] text-sui-subtext">{icon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // SUI base input
              'rounded-sui border border-sui-border bg-white',
              'py-[.67857143em] px-[1em]',
              'text-[1em] leading-[1.21428571em] text-sui-text',
              'outline-none',
              'transition-[border-color,background-color,box-shadow] duration-[100ms] ease-[ease]',
              // placeholder — SUI uses rgba(191,191,191,.87)
              'placeholder:text-sui-placeholder',
              // hover
              'hover:border-sui-border-hover hover:bg-[#fafafa]',
              // focus — SUI uses #85b7d9 border, no ring
              'focus:border-sui-focus-border focus:bg-white',
              // disabled
              'disabled:cursor-not-allowed disabled:opacity-[.45]',
              // error state
              error && 'bg-sui-error-bg border-sui-error-border text-sui-error-text ' +
                       'placeholder:text-[#e7bdbc] focus:border-sui-error-border focus:bg-sui-error-bg',
              icon && iconPosition === 'left'  && 'pl-[2.67142857em]',
              icon && iconPosition === 'right' && 'pr-[2.67142857em]',
              loading && 'pr-[2.67142857em]',
              fluid && 'w-full',
              className,
            )}
            {...props}
          />
          {(icon && iconPosition === 'right') || loading ? (
            <span className="pointer-events-none absolute right-[.67857143em] text-sui-subtext">
              {loading ? (
                <span className="inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-[rgba(0,0,0,.1)] border-t-sui-grey" />
              ) : (
                icon
              )}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';
