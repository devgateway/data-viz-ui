'use client';

import * as React from 'react';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cn } from '../lib/utils';

// SUI radio: ~15×15px circle, border #d4d4d5, bg white
// checked: inner dot #2185d0, border #2185d0

export interface RadioGroupItemProps {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items: RadioGroupItemProps[];
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const RadioGroup = ({
  value,
  defaultValue,
  onValueChange,
  items,
  disabled,
  orientation = 'vertical',
  className,
}: RadioGroupProps) => (
  <BaseRadioGroup
    value={value}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
    disabled={disabled}
    className={cn(
      'flex gap-[.75em]',
      orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
      className,
    )}
  >
    {items.map((item) => (
      <RadioGroupItem key={item.value} {...item} />
    ))}
  </BaseRadioGroup>
);
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = ({ value, label, disabled }: RadioGroupItemProps) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-[.75em]">
      <Radio.Root
        id={id}
        value={value}
        disabled={disabled}
        render={<button />}
        className={cn(
          'flex h-[15px] w-[15px] items-center justify-center rounded-full',
          'border border-sui-checkbox-border bg-white',
          'transition-[border-color] duration-[100ms] ease-[ease]',
          'outline-none',
          'hover:border-sui-border-strong',
          'focus-visible:border-sui-checkbox-focus',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[.45]',
          'data-[checked]:border-sui-blue',
        )}
      >
        <Radio.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
          {/* SUI radio uses a filled inner circle */}
          <span className="h-[7px] w-[7px] rounded-full bg-sui-blue" />
        </Radio.Indicator>
      </Radio.Root>
      {label && (
        <label
          htmlFor={id}
          className="cursor-pointer text-[1em] leading-[1.4285em] text-sui-text select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};
RadioGroupItem.displayName = 'RadioGroupItem';
