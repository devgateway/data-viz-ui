import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';
import preserveDirectives from "rollup-plugin-preserve-directives";
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
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
    // resolve: {
    //     alias: {
    //         "@": path.resolve(__dirname, "./src"),
    //     },
    // },
    build: {
        copyPublicDir: false,
        cssMinify: true,
        cssCodeSplit: true,
        lib: {
            entry: {
                "index.css": resolve(__dirname, 'src/scss/themes/default/index.scss'),
                "common.css": resolve(__dirname, 'src/scss/common.scss'),
                // index: resolve(__dirname, 'src/index.ts'),
                // Button: resolve(__dirname, 'src/components/ui/Button/index.tsx'),
                // Card: resolve(__dirname, 'src/components/ui/Card/index.tsx'),

            },
            name: '@devgateway/dvz-ui'

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
                'lodash',
                'react',
                'react/jsx-runtime',
                'react-dom',
                'react-dom/client',
                'core-js',
                'clsx'
            ],
            input: {
                index: resolve(__dirname, 'src/index.ts'),
                "styles.css": resolve(__dirname, 'src/scss/themes/default/index.scss'),
                "common.css": resolve(__dirname, 'src/scss/common.scss'),
                "tracker/index": resolve(__dirname, 'src/tracker/index.ts'),
                "layout/index": resolve(__dirname, 'src/layout/index.ts'),
                "utils/index": resolve(__dirname, 'src/utils/index.ts'),
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
                    exports: "named"
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
                    exports: "named"
                }
            ]
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
            ]
        },
        preprocessorOptions: {
            scss: {
                api: 'modern'
            }
        }
    }
});