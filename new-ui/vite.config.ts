import { defineConfig, searchForWorkspaceRoot, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import path from "path";
import Environment from 'vite-plugin-env-compatible';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    // console.log('env', env);

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
                // "@devgateway/wp-react-lib": path.resolve(__dirname, "../react-lib/wp-react-lib/dist"),
            },
        },
        build: {
            cssMinify: true,
            cssCodeSplit: true,
            sourcemap: false,
            manifest: true,
            minify: false,
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                // treeshake: true,
            },
            commonjsOptions: {
                transformMixedEsModules: true,
                
            }
            
        },
        appType: 'spa',
        experimental: {

        },
        server: {
            cors: false,
            fs: {
                allow: [
                    searchForWorkspaceRoot(process.cwd()),
                    '../../custom/ui-customizer'
                ]
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern'
                }
            }
        }
    }
});
