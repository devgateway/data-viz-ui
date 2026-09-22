import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Lets React's `act()` know it's running in a test environment.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// `@testing-library/react` only auto-registers this when it detects test-framework
// globals (`globals: true` in vitest.config.ts, which this project doesn't set), so
// without it DOM from earlier tests in the same file stays mounted and queries like
// `getByRole` start matching multiple elements across tests.
afterEach(cleanup);
