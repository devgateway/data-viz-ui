import { useState } from 'react';
import { isInternalTrafficEnabled, setInternalTrafficCookie, getInternalTrafficExpiry } from './internalTrafficUtils';

interface BypassStatus {
  isEnabled: boolean;
  expiresAt: Date | null;
  toggle: () => void;
}

export const useInternalTrafficBypass = (): BypassStatus => {
  const [isEnabled, setIsEnabled] = useState(() =>
    typeof document !== 'undefined' ? isInternalTrafficEnabled() : false,
  );
  const [expiresAt, setExpiresAt] = useState<Date | null>(() =>
    typeof localStorage !== 'undefined' ? getInternalTrafficExpiry() : null,
  );

  const toggle = () => {
    const next = !isEnabled;
    setInternalTrafficCookie(next);
    setIsEnabled(next);
    setExpiresAt(next ? getInternalTrafficExpiry() : null);
  };

  return { isEnabled, expiresAt, toggle };
};
