// @ts-nocheck
export const Config = {
    REACT_APP_WP_API: import.meta.env.VITE_REACT_APP_WP_API ?? process.env.VITE_REACT_APP_WP_API ?? "/wp/wp-json",
    REACT_APP_API_ROOT: import.meta.env.VITE_REACT_APP_API_ROOT ?? process.env.VITE_REACT_APP_API_ROOT ?? null,
    GA_CODE: import.meta.env.VITE_REACT_APP_GA_CODE ?? process.env.VITE_REACT_APP_GA_CODE ?? '',
    DEFAULT_LOCALE: import.meta.env.VITE_REACT_APP_DEFAULT_LOCALE ?? process.env.VITE_REACT_APP_DEFAULT_LOCALE ?? "en",
    INTERNAL_GA_TOKEN: import.meta.env.VITE_INTERNAL_GA_TOKEN ?? process.env.VITE_INTERNAL_GA_TOKEN ?? '',
}
