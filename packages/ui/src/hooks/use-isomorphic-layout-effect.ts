import { useEffect, useLayoutEffect } from 'react';

// Uses useLayoutEffect in the browser, useEffect on the server.
// This avoids the SSR warning: "useLayoutEffect does nothing on the server".
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
