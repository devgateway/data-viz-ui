import '@testing-library/jest-dom/vitest';

// Lets React's `act()` know it's running in a test environment.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
