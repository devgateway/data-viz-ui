import type * as React from 'react';

export interface ComboboxOption {
  key: string | number;
  text: string;
  value: string | number;
  content?: React.ReactNode;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  multiple?: boolean;
  search?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  onChange?: (value: string | number | Array<string | number>) => void;
  renderLabel?: (option: ComboboxOption) => React.ReactNode;
  className?: string;
}
