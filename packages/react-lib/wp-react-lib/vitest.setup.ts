// Lets React's `act()` know it's running in a test environment (only matters
// for the jsdom-environment tests that actually mount client-side).
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
