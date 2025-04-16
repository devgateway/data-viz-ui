import { defineConfig, searchForWorkspaceRoot, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import path from "path";
import Environment from 'vite-plugin-env-compatible';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    // console.log('env', env);

    return {
        // define: {
        //     'process.env': env,
        // },
        plugins: [
            react(),
            eslintPlugin({
                exclude: ['/virtual:/**', 'node_modules/**', "dist/**"],
            }),
            Environment({
                prefix: 'VITE_',
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                react: path.resolve('./node_modules/react'),
                "immutable": path.resolve('./node_modules/immutable'),
                "react-dom": path.resolve('./node_modules/react-dom'),
                "react-router-dom": path.resolve('./node_modules/react-router-dom'),
                "react-redux": path.resolve('./node_modules/react-redux'),
                "react-intl": path.resolve('./node_modules/react-intl'),
                "react-compiler-runtime": path.resolve('./node_modules/react-compiler-runtime'),
                "semantic-ui-react": path.resolve('./node_modules/semantic-ui-react'),
                "papaparse": path.resolve('./node_modules/papaparse'),
                "@nivo/colors": path.resolve('./node_modules/@nivo/colors'),
                "@devgateway/wp-react-lib": path.resolve(__dirname, '../react-lib/wp-react-lib'),
                '@devgateway/customizer': path.resolve(__dirname, '../../custom/ui-customizer/'),
            },
            preserveSymlinks: true,
        },
        build: {
            cssMinify: true,
            cssCodeSplit: true,
            sourcemap: false,
            manifest: true,
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                treeshake: true,
                cache: true,
                // external: ['react-compiler-runtime', 'semantic-ui-react', 'react-intl']
            },
            commonjsOptions: {
                transformMixedEsModules: true,
            },

        },

        optimizeDeps: {
            include: [
                "../../custom/ui-customizer",
                "@devgateway/wp-react-lib",
                "react",
                "semantic-ui-react",
                "@nivo/*"
            ]
        },
        appType: 'spa',
        server: {
            hrm: {
                overlay: false,
            },
            cors: false,
            fs: {
                allow: [
                    searchForWorkspaceRoot(process.cwd()),
                    '../react-lib/wp-react-lib',
                    '../../custom/ui-customizer',
                ]
            },
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
    }
});
