import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react-swc';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import path from "path";
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig(() => {

    return {
        plugins: [
            react(),
            // eslintPlugin({
            //     exclude: ['/virtual:/**', 'node_modules/**', "dist/**"],
            // }),
            EnvironmentPlugin({
                API_URL: 'http://localhost:8000',
                NODE_ENV: process.env.NODE_ENV,
                APP_ENV: 'development',
                PUBLIC_URL: '/',
                PROTOCOL: 'http',
                DOMAIN: 'localhost',
                REACT_APP_TITLE: 'Tobacco Control Data Initiative',
                REACT_APP_WP_API: 'http://localhost/wp/wp-json',
                REACT_APP_WP_STYLES: `${process.env.PROTOCOL}://${process.env.DOMAIN}/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css`,
                REACT_APP_GA_CODE: 'TEST',
                REACT_APP_DEFAULT_LOCALE: 'en',
                REACT_APP_WP_HOSTS: 'http://localhost',
                REACT_APP_USE_HASH_LINKS: 'false',
                REACT_APP_THEME: 'cash',
                REACT_APP_WP_SEARCH_END_POINT: '/dg/v1/search',
                REACT_APP_API_ROOT: 'http://localhost',
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@devgateway/wp-react-lib": path.resolve(__dirname, "../react-lib/wp-react-lib/dist"),
            },
        },
        build: {
            cssMinify: true,
            cssCodeSplit: true,
            sourcemap: false,
            chunkSizeWarningLimit: 2000,
            rollupOptions:{
                external: [
                    'immutable',
                    'react',
                    'react-intl',
                    "@devgateway/wp-react-lib",

                ]
            }

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
                scss : {
                    api: 'modern'
                }
            }
        }
    }
})
