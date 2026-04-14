import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json',
      include: ['./src/**/*'],
    }),
    tsconfigPaths(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@devgateway/ui',
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: ['node_modules'],
    },
    rollupOptions: {
      treeshake: true,
      external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {}),
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
      ],
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      plugins: [preserveDirectives()],
      output: [
        {
          dir: 'dist/cjs',
          format: 'cjs',
          sourcemap: false,
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          exports: 'named',
        },
        {
          dir: 'dist/esm',
          format: 'esm',
          sourcemap: false,
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          exports: 'named',
        },
      ],
    },
  },
});
