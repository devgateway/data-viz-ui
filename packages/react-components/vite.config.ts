import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import { resolve } from 'path';
import packageJson from './package.json' with { type: 'json'};
import preserveDirectives from 'rollup-preserve-directives';
import dts from 'vite-plugin-dts';

// const __dirname = resolve();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDirs: {
        dir: 'dist/types'
      },
      tsconfigPath: './tsconfig.json',
      include: ['./src/**/*'],
      exclude: ['./src/**/*.test.ts', './src/**/*.test.tsx'],
    }),
    preserveDirectives()
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@devgateway/dvz-react-components'
    },
    rolldownOptions: {
      external: (id: string) => {
        const externalDeps = [
          ...Object.keys(packageJson.dependencies || {}),
          ...Object.keys(packageJson.devDependencies || {}),
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
          'vite.config.ts'
        ]

        return externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
      input: {
        index: resolve(__dirname, 'src/index.ts')
      },
      output: [
        {
          dir: "dist/cjs",
          format: "cjs",
          sourcemap: false,
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: `[name].js`,
          globals: {
            react: 'React',
            'react/jsx-runtime': 'jsxRuntime',
            'react-dom': 'ReactDOM',
          },
        },
        {
          dir: "dist/esm",
          format: "esm",
          sourcemap: false,
          entryFileNames: `[name].js`,
          preserveModules: true,
          preserveModulesRoot: "src",
          globals: {
            react: 'React',
            'react/jsx-runtime': 'jsxRuntime',
            'react-dom': 'ReactDOM',
          },
        }
      ]
    },
  }
})
