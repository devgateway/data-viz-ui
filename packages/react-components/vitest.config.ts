import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Default environment is Node so components stay SSR-friendly by default -
// a component that touches `window`/`document` at module or render scope
// fails here unless it opts into jsdom. Files that need a real DOM (e.g.
// `@testing-library/react` `render()` calls, or genuine client components)
// opt in per-file via the `// @vitest-environment jsdom` pragma.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
