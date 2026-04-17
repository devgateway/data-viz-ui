import { useState, useEffect, useCallback } from 'react';

type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

interface OrientationState {
  type: OrientationType;
  angle: number;
}

/**
 * A React hook that tracks screen.orientation.
 * @returns
 *  - orientation: { type, angle }
 *  - lock(lockType?): Promise<void>
 *  - unlock(): Promise<void>
 */
export function useScreenOrientation() {
  const isSupported =
    typeof window !== 'undefined' &&
    'screen' in window &&
    'orientation' in window.screen;

  const getState = (): OrientationState => {
    if (isSupported) {
      const { type, angle } = window.screen.orientation;
      return { type: type as OrientationType, angle };
    }
    // fallback if not supported or SSR
    return { type: 'portrait-primary', angle: 0 };
  };

  const [orientation, setOrientation] = useState<OrientationState>(getState);

  useEffect(() => {
    if (!isSupported) return;

    const onChange = () => setOrientation(getState());
    window.screen.orientation.addEventListener('change', onChange);

    // sync once on mount
    onChange();

    return () => {
      window.screen.orientation.removeEventListener('change', onChange);
    };
  }, [isSupported]);

  const lock = useCallback(
    (lockType: OrientationType | 'portrait' | 'landscape' = 'portrait') => {
      if (isSupported && (window.screen.orientation as any).lock) {
        return (window.screen.orientation as any).lock(lockType);
      }
      return Promise.reject(new Error('Screen Orientation lock unsupported'));
    },
    [isSupported]
  );

  const unlock = useCallback(() => {
    if (isSupported && window.screen.orientation.unlock) {
      return window.screen.orientation.unlock();
    }
    return Promise.reject(new Error('Screen Orientation unlock unsupported'));
  }, [isSupported]);

  return { orientation, lock, unlock };
}