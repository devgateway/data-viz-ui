import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';
import preserveDirectives from "rollup-plugin-preserve-directives";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            tsconfigPath: './tsconfig.json',
            include: ['./src/**/*'],
            exclude: ['./src/**/*.test.ts', './src/**/*.test.tsx'],
        }),
        tsconfigPaths(),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: '@devgateway/wp-react-lib'
        },
        commonjsOptions: {
            transformMixedEsModules: true,
            exclude: ['node_modules'],
        },
        rollupOptions: {
            // A plain string in `external` only matches an exact module
            // specifier, not a subpath - '@reduxjs/toolkit' would NOT
            // externalize an import of '@reduxjs/toolkit/query/react',
            // silently bundling it (and its own deps, e.g. immer/reselect)
            // into the output instead of leaving it to the consumer's own
            // copy. Match by prefix so scoped-package subpath imports
            // (RTK Query, `@tanstack/react-query/*`, etc.) externalize too.
            external: (id: string) => {
                const externalDeps = [
                    ...Object.keys(packageJson.dependencies || {}),
                    ...Object.keys(packageJson.devDependencies || {}),
                    'react',
                    'react-dom',
                    'react-dom/client',
                    'react/jsx-runtime',
                ];
                return externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));
            },
            input: {
                index: resolve(__dirname, 'src/index.js'),
                'api/index': resolve(__dirname, 'src/api/index.js'),
                'hooks/index': resolve(__dirname, 'src/hooks/index.js'),
                'v2/index': resolve(__dirname, 'src/v2/index.ts'),
                'v2/query/index': resolve(__dirname, 'src/v2/query/index.ts'),
                'v2/rtk-query/index': resolve(__dirname, 'src/v2/rtk-query/index.ts'),
            },
            plugins: [preserveDirectives()],
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
        }
    },
});