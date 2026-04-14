import * as React from 'react';

/**
 * Merges multiple React refs (object refs or callback refs) into a single callback ref.
 * Replaces SUI's useMergedRefs. Useful when a component needs to forward a ref
 * AND hold an internal ref to the same DOM node.
 *
 * Usage:
 *   const internalRef = React.useRef<HTMLDivElement>(null);
 *   const composedRef = useComposedRefs(forwardedRef, internalRef);
 *   <div ref={composedRef} />
 */
export function useComposedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        if (ref == null) continue;
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      }
    },
    // Spread refs into the dep array so the callback updates when refs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
