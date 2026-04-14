import * as React from 'react';

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Supports both controlled (value + onChange) and uncontrolled (defaultValue) usage.
 * When value is provided, the component is controlled and internal state is not used.
 * When only defaultValue is provided, the component manages state internally.
 *
 * Replaces SUI's useAutoControlledValue pattern without class-based getAutoControlledStateFromProps.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T | undefined, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolled;

  // Stable setter: if controlled, skip internal state, always call onChange.
  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onChange?.(next);
    },
    // onChange identity is caller's responsibility — same pattern as Radix.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, onChange],
  );

  return [state, setState];
}
