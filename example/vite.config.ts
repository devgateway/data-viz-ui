import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import Environment from 'vite-plugin-environment';
import commonjs from 'vite-plugin-commonjs';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { resolve } from 'path';


const devConfig = defineConfig({

    plugins: [
        reactRouter(),
        tsconfigPaths(),
        Environment({
            prefix: "VITE_",
        }),
        commonjs(),
        libInjectCss(),
    ],
    css: {
        // Enable CSS source maps for better debugging
        devSourcemap: true,
        // Ensure CSS modules are properly handled
        modules: {
            localsConvention: 'camelCase',
        },

    },
    resolve: {
        alias: {
            // Fix: remove leading slash inside resolve() so paths are relative to project
            "@devgateway/dvz-ui-react/dist/esm/common.css": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/scss/common.scss"),
            "@devgateway/dvz-ui-react/dist/esm/styles.css": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/scss/themes/default/index.scss"),
            // Add aliases for ?url variants used in links()
            "@devgateway/dvz-ui-react/dist/esm/common.css?url": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/scss/common.scss") + "?url",
            "@devgateway/dvz-ui-react/dist/esm/styles.css?url": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/scss/themes/default/index.scss") + "?url",
            // Direct source imports for instant hot reloading
            "@devgateway/dvz-ui-react": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src"),
            "@devgateway/wp-react-lib": resolve(__dirname, "../data-viz-ui/packages/wp-react-lib/src"),
            "@devgateway/dvz-ui-react/layout": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/layout"),
            // Handle subpath imports
            "@devgateway/wp-react-lib/api": resolve(__dirname, "../data-viz-ui/packages/wp-react-lib/src/api"),
            "@devgateway/wp-react-lib/hooks": resolve(__dirname, "../data-viz-ui/packages/wp-react-lib/src/hooks"),
            "@devgateway/wp-react-lib/utils": resolve(__dirname, "../data-viz-ui/packages/wp-react-lib/src/utils"),
            // Handle internal aliases within dvz-ui package
            "@/conf": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/conf"),
            "@/embeddable": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/embeddable"),
            "@/layout": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/layout"),
            "@/utils": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/utils"),
            "@/lib": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/lib"),
            "@/redux": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/redux"),
            "@/translations": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/translations"),
            "@/tracker": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/tracker"),
            "@/api": resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/api"),

        },
        // Avoid duplicate React instances between app and linked packages
        dedupe: [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "redux",
            "react-intl",
            "react-redux",
        ],
    },
    optimizeDeps: {
        include: [
            "@nivo/*",
        ],
        exclude: [
            // Ensure local source is processed by Vite (not pre-bundled) for HMR
            "@devgateway/dvz-ui-react",
            "@devgateway/wp-react-lib",
        ],
        // Force re-evaluation of local packages
        force: true,
        // Ensure CSS files are properly processed
        entries: [
            resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/**/*.css"),
            resolve(__dirname, "../data-viz-ui/packages/dvz-ui/src/**/*.scss"),
        ]
    },
    ssr: {
        // Do not externalize local workspaces so Vite applies transforms/HMR in SSR too
        noExternal: ["@devgateway/dvz-ui-react", "@devgateway/wp-react-lib"],
    },
    // Development server options
    server: {
        fs: {
            // Allow serving files from the monorepo packages outside this app root
            allow: [
                // This app's root (required, otherwise Vite may block /app/* files)
                resolve(__dirname),
                resolve(__dirname, "data-viz-wordpress"),

            ],
        },
        watch: {
            // Watch local package source directories
            //  ignored: ['!/../data-viz-ui/**', '!data-viz-wordpress/**'],
            // Polling can help when editors or networked FS miss native FS events
            usePolling: true,
            interval: 200,
        },
        // Force full page reload for CSS changes to ensure proper HMR
        hmr: {
            overlay: true,
        }
    },
    // Build options
    build: {
        sourcemap: true,
    }
});


const prodConfig = defineConfig({
    define: {
        'process.env.VITE_REACT_APP_WP_API': JSON.stringify(process.env.VITE_REACT_APP_WP_API),
        'process.env.VITE_REACT_APP_DEFAULT_LOCALE': JSON.stringify(process.env.VITE_REACT_APP_DEFAULT_LOCALE),
        'process.env.VITE_REACT_APP_USE_HASH_LINKS': JSON.stringify(process.env.VITE_REACT_APP_USE_HASH_LINKS),
        'process.env.VITE_REACT_APP_WP_HOSTS': JSON.stringify(process.env.VITE_REACT_APP_WP_HOSTS),
        'process.env.VITE_REACT_APP_API_ROOT': JSON.stringify(process.env.VITE_REACT_APP_API_ROOT),
        'process.env.VITE_REACT_APP_WP_SEARCH_END_POINT': JSON.stringify(process.env.VITE_REACT_APP_WP_SEARCH_END_POINT),
        'process.env.VITE_REACT_APP_WP_STYLES': JSON.stringify(process.env.VITE_REACT_APP_WP_STYLES),
    },
    plugins: [
        reactRouter(),
        tsconfigPaths(),
        // @ts-ignore
        Environment({
            prefix: "VITE_",
        }),
        // @ts-ignore
        commonjs(),
    ],
    optimizeDeps: {
        include: [
            "@devgateway/wp-react-lib",
            "@devgateway/dvz-ui-react",
            "@nivo/*",
        ]
    },
    ssr: {
        noExternal: ["@devgateway/wp-react-lib", "@devgateway/dvz-ui-react"],
        optimizeDeps: {
            include: [
                "@devgateway/wp-react-lib",
                "@devgateway/dvz-ui-react",
            ]
        }
    },
    build: {
        cssCodeSplit: true,
    },
});


export default defineConfig(({ command }) => {
    return command === 'serve' ? devConfig : prodConfig;
});
