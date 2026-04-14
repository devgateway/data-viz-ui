'use client';

import * as React from 'react';
import { Combobox } from '@base-ui/react/combobox';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '../lib/utils';
import type { ComboboxOption, ComboboxProps } from '../types/combobox-props';

// ── Multi-select Combobox using Base UI ───────────────────────────────────────
// Base UI Combobox handles single-select natively.
// For multi-select we track an array in controlled state and keep the popup open.

type SingleValue = string | number;
type MultiValue = Array<string | number>;
type ComboValue = SingleValue | MultiValue | undefined;

export const DvzCombobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange: onChangeProp,
      multiple = false,
      search = false,
      placeholder = 'Select...',
      disabled = false,
      clearable = false,
      renderLabel,
      className,
    },
    ref,
  ) => {
    const onChange = onChangeProp as ((value: ComboValue) => void) | undefined;

    // For multiple mode we manage state ourselves so we can keep popup open.
    const [multiSelected, setMultiSelected] = React.useState<MultiValue>(
      Array.isArray(defaultValue) ? defaultValue : defaultValue != null ? [defaultValue] : [],
    );
    const effectiveMulti: MultiValue = multiple
      ? (Array.isArray(controlledValue) ? controlledValue : multiSelected)
      : [];

    const handleMultiSelect = (item: ComboboxOption) => {
      const next = effectiveMulti.includes(item.value)
        ? effectiveMulti.filter((v) => v !== item.value)
        : [...effectiveMulti, item.value];
      if (!Array.isArray(controlledValue)) setMultiSelected(next);
      onChange?.(next);
    };

    const handleClearMulti = () => {
      setMultiSelected([]);
      onChange?.([]);
    };

    const triggerLabel = multiple
      ? effectiveMulti.length
        ? effectiveMulti
            .map((v) => {
              const opt = options.find((o) => o.value === v);
              return opt ? (renderLabel ? renderLabel(opt) : opt.text) : String(v);
            })
            .join(', ')
        : placeholder
      : undefined;

    // ── Multi-select: manual Popover-style list ──────────────────────────────
    if (multiple) {
      return (
        <div className={className}>
        <Combobox.Root
          items={options}
          disabled={disabled}
        >
          <Combobox.InputGroup className={cn(
            // SUI dropdown trigger: same as input styling
            'relative w-full rounded-sui border border-sui-border bg-white',
            'transition-[border-color,box-shadow] duration-[100ms] ease-[ease]',
            'focus-within:border-sui-focus-border',
          )}>
            <Combobox.Input
              ref={ref}
              placeholder={placeholder}
              value={multiple ? (effectiveMulti.length ? triggerLabel as string : '') : undefined}
              readOnly={!search}
              className="w-full border-0 bg-transparent py-[.67857143em] pl-[1em] pr-[2.5em] text-[1em] text-sui-text placeholder:text-sui-placeholder outline-none"
            />
            <div className="absolute right-[.67857143em] top-0 flex h-full items-center gap-1 text-sui-subtext">
              {clearable && effectiveMulti.length > 0 && (
                <Combobox.Clear
                  render={<button />}
                  onClick={handleClearMulti}
                  className="flex items-center justify-center bg-transparent p-0 hover:text-sui-red transition-colors duration-[100ms]"
                  aria-label="Clear selection"
                >
                  <X className="h-[.85714286rem] w-[.85714286rem]" />
                </Combobox.Clear>
              )}
              <Combobox.Trigger
                render={<button />}
                className="flex items-center justify-center bg-transparent p-0"
                aria-label="Open popup"
              >
                <ChevronDown className="h-[1em] w-[1em] transition-transform duration-[100ms]" />
              </Combobox.Trigger>
            </div>
          </Combobox.InputGroup>

          <Combobox.Portal>
            <Combobox.Positioner sideOffset={2} className="outline-none">
              <Combobox.Popup className={cn(
                // SUI dropdown menu: border, radius, shadow, white bg
                'w-[var(--anchor-width)] max-h-60 overflow-hidden rounded-sui border border-sui-border bg-white',
                'shadow-sui-dropdown',
                'origin-[var(--transform-origin)] transition-[transform,opacity] duration-[100ms] ease-[ease]',
                'data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-1',
                'data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-1',
              )}>
                <Combobox.Empty className="py-[.78571429em] px-[1.14285714em] text-[1em] text-sui-subtext">
                  No results found.
                </Combobox.Empty>
                <Combobox.List className="max-h-60 overflow-y-auto outline-none overscroll-contain">
                  {(option: ComboboxOption) => (
                    <Combobox.Item
                      key={option.key}
                      value={option}
                      onClick={() => handleMultiSelect(option)}
                      className={cn(
                        // SUI dropdown item: padding .78571429em 1.14285714em
                        'flex cursor-pointer items-center gap-2 px-[1.14285714em] py-[.78571429em]',
                        'text-[1em] text-sui-text outline-none',
                        'transition-[background-color,color] duration-[100ms] ease-[ease]',
                        'data-[highlighted]:bg-[rgba(0,0,0,.05)] data-[highlighted]:text-[rgba(0,0,0,.95)]',
                      )}
                    >
                      <span className={cn(
                        'flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-sui-sm border border-sui-checkbox-border',
                        effectiveMulti.includes(option.value) && 'border-sui-blue bg-sui-blue',
                      )}>
                        {effectiveMulti.includes(option.value) && (
                          <Check className="h-[11px] w-[11px] text-white" strokeWidth={3} />
                        )}
                      </span>
                      <span className="flex-1">{option.content ?? option.text}</span>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
        </div>
      );
    }

    // ── Single-select: use Base UI Combobox natively ─────────────────────────
    const singleValue = !Array.isArray(controlledValue) ? controlledValue : undefined;
    const singleDefault = !Array.isArray(defaultValue) ? defaultValue : undefined;
    const selectedOption = options.find((o) => o.value === singleValue);

    return (
      <div className={className}>
      <Combobox.Root
        items={options}
        value={selectedOption ?? null}
        defaultValue={options.find((o) => o.value === singleDefault) ?? null}
        onValueChange={(item: ComboboxOption | null) => {
          onChange?.(item?.value ?? '');
        }}
        disabled={disabled}
      >
        <Combobox.InputGroup className={cn(
          'relative w-full rounded-sui border border-sui-border bg-white',
          'transition-[border-color] duration-[100ms] ease-[ease]',
          'focus-within:border-sui-focus-border',
        )}>
          <Combobox.Input
            ref={ref}
            placeholder={placeholder}
            readOnly={!search}
            className="w-full border-0 bg-transparent py-[.67857143em] pl-[1em] pr-[2.5em] text-[1em] text-sui-text placeholder:text-sui-placeholder outline-none"
          />
          <div className="absolute right-[.67857143em] top-0 flex h-full items-center gap-1 text-sui-subtext">
            {clearable && (
              <Combobox.Clear
                render={<button />}
                className="flex items-center justify-center bg-transparent p-0 hover:text-sui-red transition-colors duration-[100ms]"
                aria-label="Clear selection"
              >
                <X className="h-[.85714286rem] w-[.85714286rem]" />
              </Combobox.Clear>
            )}
            <Combobox.Trigger
              render={<button />}
              className="flex items-center justify-center bg-transparent p-0"
              aria-label="Open popup"
            >
              <ChevronDown className="h-[1em] w-[1em] transition-transform duration-[100ms]" />
            </Combobox.Trigger>
          </div>
        </Combobox.InputGroup>

        <Combobox.Portal>
          <Combobox.Positioner sideOffset={2} className="outline-none">
            <Combobox.Popup className={cn(
              'w-[var(--anchor-width)] max-h-60 overflow-hidden rounded-sui border border-sui-border bg-white',
              'shadow-sui-dropdown',
              'origin-[var(--transform-origin)] transition-[transform,opacity] duration-[100ms] ease-[ease]',
              'data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-1',
              'data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-1',
            )}>
              <Combobox.Empty className="py-[.78571429em] px-[1.14285714em] text-[1em] text-sui-subtext">
                No results found.
              </Combobox.Empty>
              <Combobox.List className="max-h-60 overflow-y-auto outline-none overscroll-contain">
                {(option: ComboboxOption) => (
                  <Combobox.Item
                    key={option.key}
                    value={option}
                    className={cn(
                      'grid cursor-default grid-cols-[1em_1fr] items-center gap-2',
                      'px-[1.14285714em] py-[.78571429em]',
                      'text-[1em] text-sui-text outline-none',
                      'transition-[background-color,color] duration-[100ms] ease-[ease]',
                      'data-[highlighted]:bg-[rgba(0,0,0,.05)] data-[highlighted]:text-[rgba(0,0,0,.95)]',
                    )}
                  >
                    <Combobox.ItemIndicator className="col-start-1">
                      <Check className="h-[.85714286rem] w-[.85714286rem] text-sui-blue" />
                    </Combobox.ItemIndicator>
                    <span className="col-start-2">{option.content ?? option.text}</span>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      </div>
    );
  },
);
DvzCombobox.displayName = 'Combobox';

export { DvzCombobox as Combobox };
export type { ComboboxOption, ComboboxProps };
