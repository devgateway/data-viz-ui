import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Kept separate from vite.config.ts (the library build config) so build and
// test concerns don't leak into each other. Default environment is Node -
// this is what makes the "no `window`" SSR assertions in src/v2 genuine
// rather than simulated; individual files opt into jsdom via the
// `// @vitest-environment jsdom` pragma where they need a browser.
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'node',
        include: ['src/**/*.test.{ts,tsx}'],
        setupFiles: ['./vitest.setup.ts'],
    },
});
