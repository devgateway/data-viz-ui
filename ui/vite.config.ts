import {defineConfig, searchForWorkspaceRoot, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import path from "path";
import Environment from 'vite-plugin-env-compatible';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd());

    console.log('env', env);

    return {
        // define: {
        //     'process.env': env,
        // }, 
        plugins: [
            react({}),
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
                "react": path.resolve('./node_modules/react'),
                "inmutable": path.resolve('./node_modules/inmutable'),
                "react-dom": path.resolve('./node_modules/react-dom'),
                "react-router-dom": path.resolve('./node_modules/react-router-dom'),
                "react-redux": path.resolve('./node_modules/react-redux'),
                '@devgateway/customizer': path.resolve('./node_modules/@devgateway/customizer'),
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
            },
            commonjsOptions: {
                transformMixedEsModules: true,

            },

        },

        optimizeDeps: {
            include: [
                "@devgateway/ui-customizer",
                "@devgateway/wp-react-lib",
                "react",
                "semantic-ui-react",
                "@nivo/*"
            ]
        },
        appType: 'spa',
        experimental: {},
        server: {
            cors: false,
            fs: {
                allow: [
                    searchForWorkspaceRoot(process.cwd()),
                    '../../custom/ui-customizer',
                    '../react-lib/wp-react-lib',
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
