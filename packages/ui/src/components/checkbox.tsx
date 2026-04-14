'use client';

import * as React from 'react';
import { Checkbox } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

// SUI checkbox: 17×17px, border #d4d4d5, radius .21428571rem
// hover border rgba(34,36,38,.35), focus border #96c8da
// checked: border+bg #2185d0, checkmark rgba(0,0,0,.87) → white on colored bg

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export const DvzCheckbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, defaultChecked, disabled, label, onChange, className, id }, ref) => {
    const checkboxId = id ?? React.useId();
    return (
      <div className={cn('ui checkbox flex items-center gap-[.75em]', className)}>
        <Checkbox.Root
          ref={ref}
          id={checkboxId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onCheckedChange={(value) => onChange?.(value === true)}
          render={<button />}
          className={cn(
            // Exact SUI checkbox dimensions
            'flex h-[17px] w-[17px] shrink-0 items-center justify-center',
            'rounded-sui-sm border border-sui-checkbox-border bg-white',
            'transition-[border-color,background-color] duration-[100ms] ease-[ease]',
            'outline-none',
            'hover:border-sui-border-strong',
            'focus-visible:border-sui-checkbox-focus',
            'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[.45]',
            // Checked: SUI blue fill
            'data-[checked]:border-sui-blue data-[checked]:bg-sui-blue',
            className,
          )}
        >
          <Checkbox.Indicator className="flex items-center justify-center text-white data-[unchecked]:hidden">
            <Check className="h-[11px] w-[11px]" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {label && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer text-[1em] leading-[1.4285em] text-sui-text select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
DvzCheckbox.displayName = 'Checkbox';

export { DvzCheckbox as Checkbox };
