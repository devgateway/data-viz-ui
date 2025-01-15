/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROTOCOL: string;
    readonly VITE_DOMAIN: string;
    readonly VITE_REACT_APP_WP_API: string;
    readonly VITE_REACT_APP_WP_STYLES: string;
    readonly VITE_REACT_APP_GA_CODE: string;
    readonly VITE_REACT_APP_DEFAULT_LOCALE: string;
    readonly VITE_REACT_APP_WP_HOSTS: string;
    readonly VITE_REACT_APP_USE_HASH_LINKS: boolean;
    readonly VITE_REACT_APP_WP_SEARCH_END_POINT: string;
    readonly VITE_REACT_APP_API_ROOT: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}

declare namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {
        readonly VITE_PROTOCOL: string;
        readonly VITE_DOMAIN: string;
        readonly VITE_REACT_APP_WP_API: string;
        readonly VITE_REACT_APP_WP_STYLES: string;
        readonly VITE_REACT_APP_GA_CODE: string;
        readonly VITE_REACT_APP_DEFAULT_LOCALE: string;
        readonly VITE_REACT_APP_WP_HOSTS: string;
        readonly VITE_REACT_APP_USE_HASH_LINKS: boolean;
        readonly VITE_REACT_APP_WP_SEARCH_END_POINT: string;
        readonly VITE_REACT_APP_API_ROOT: string;
    }

    declare const process: { env: ProcessEnv };
}

