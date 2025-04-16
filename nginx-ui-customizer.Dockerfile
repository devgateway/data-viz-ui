# Define image source for customizer
ARG REPO
ARG TAG
FROM ${REPO}/ui-customizer:${TAG} AS customizer

# Build wp-react-lib
FROM node:22-slim AS reactlib
WORKDIR /tmp/work
COPY react-lib/wp-react-lib/package.json .
RUN npm install
COPY react-lib/wp-react-lib/public public
COPY react-lib/wp-react-lib/src src
RUN npm run dist

# UI app: install + build
FROM node:22-slim AS install

WORKDIR /example/front/ui

# Copy full react-lib
COPY --from=reactlib /tmp/work ../react-lib/wp-react-lib

# Copy prebuilt customizer (must contain dist/index.css)
COPY --from=customizer /tmp/work /example/custom/ui-customizer

# Copy main UI source
COPY ui .

# Install deps
RUN npm install react-compiler-runtime &&  npm install -f

# Optional dependency for platform-specific build
RUN npm install @rollup/rollup-linux-arm64-gnu || true

# Vite build
RUN VITE_REACT_APP_GA_CODE="#VITE_REACT_APP_GA_CODE#" \
    VITE_REACT_APP_DEFAULT_LOCALE="#VITE_REACT_APP_DEFAULT_LOCALE#" \
    VITE_REACT_APP_USE_HASH_LINKS="#VITE_REACT_APP_USE_HASH_LINKS#" \
    VITE_REACT_APP_WP_HOSTS="#VITE_REACT_APP_WP_HOSTS#" \
    VITE_REACT_APP_LOAD_DEFAULT_THEME="#VITE_REACT_APP_LOAD_DEFAULT_THEME#" \
    VITE_REACT_APP_WP_SEARCH_END_POINT="#VITE_REACT_APP_WP_SEARCH_END_POINT#" \
    VITE_REACT_APP_WP_STYLES="/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6" \
    npm run build

# Serve with NGINX
FROM nginx:stable-alpine
COPY --from=install /example/front/ui/dist /var/www/static
COPY nginx.sh /usr/local/sbin/
WORKDIR /var/www/static

ENTRYPOINT ["/usr/local/sbin/nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]
