import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import path from 'path';
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
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        copyPublicDir: false,
        cssCodeSplit: true,
        lib: {
            entry: {
                "index.css": resolve(__dirname, 'src/scss/themes/default/index.scss'),
                main: resolve(__dirname, 'src/index.ts'),
                // Button: resolve(__dirname, 'src/components/ui/Button/index.tsx'),
                // Card: resolve(__dirname, 'src/components/ui/Card/index.tsx'),


            },
            name: '@devgateway/dvz-ui',
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => {
                if (format === 'es') {
                    return `esm/${entryName}.js`;
                }

                if (format === 'cjs') {
                    return `cjs/${entryName}.js`;
                }
                return entryName;
            }

        },
        commonjsOptions: {
            transformMixedEsModules: true,
            exclude: ['node_modules'],
        },
        rollupOptions: {
            external: [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {}), 'react', 'react/jsx-runtime', 'react-dom'],
            input: {
                main: resolve(__dirname, 'src/index.ts'),
                "styles.css": resolve(__dirname, 'src/scss/themes/default/index.scss'),
            },
            plugins: [preserveDirectives()],
            output: {
                preserveModules: true,
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'jsxRuntime',
                    'react-dom': 'ReactDOM',
                },
            },
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