import * as React from 'react';

/**
 * Calls handler when the user clicks outside the given ref element.
 * Replaces SUI's eventStack click-outside handling without a global event registry.
 *
 * Only registers when enabled is true (default).
 */
export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
  enabled = true,
): void {
  // handler identity must be stable — caller should use useCallback.
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;

  React.useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, enabled]);
}
