import * as React from 'react';

/**
 * Calls handler when the Escape key is pressed.
 * Replaces SUI's eventStack escape handling without a global event registry.
 *
 * Only registers when enabled is true (default).
 */
export function useEscapeKey(handler: () => void, enabled = true): void {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;

  React.useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handlerRef.current();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [enabled]);
}
