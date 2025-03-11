export const Config = {
    REACT_APP_WP_API: process.env.VITE_REACT_APP_WP_API || "/wp/wp-json",
    REACT_APP_API_ROOT: process.env.VITE_REACT_APP_API_ROOT,
    GA_CODE: process.env.VITE_REACT_APP_GA_CODE,
    DEFAULT_LOCALE: process.env.VITE_REACT_APP_DEFAULT_LOCALE || "en",
}