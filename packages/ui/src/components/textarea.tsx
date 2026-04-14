import * as React from 'react';
import { cn } from '../lib/utils';

// SUI textarea: same border/radius/padding as input
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fluid?: boolean;
  error?: boolean;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, fluid, error, label, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    return (
      <div className={cn('flex flex-col gap-1', fluid && 'w-full')}>
        {label && (
          <label htmlFor={textareaId} className="text-[.92857143em] font-bold text-sui-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[8em] rounded-sui border border-sui-border bg-white',
            'py-[.67857143em] px-[1em]',
            'text-[1em] leading-[1.2857em] text-sui-text',
            'outline-none resize-y',
            'transition-[border-color,background-color] duration-[100ms] ease-[ease]',
            'placeholder:text-sui-placeholder',
            'hover:border-sui-border-hover hover:bg-[#fafafa]',
            'focus:border-sui-focus-border focus:bg-white',
            'disabled:cursor-not-allowed disabled:opacity-[.45]',
            error && 'bg-sui-error-bg border-sui-error-border text-sui-error-text',
            fluid && 'w-full',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
