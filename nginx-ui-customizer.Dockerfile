ARG REPO
ARG TAG
FROM ${REPO}/ui-customizer:${TAG}  AS customizer
FROM node:12.22.12 AS reactlib
WORKDIR /tmp/work
COPY react-lib/wp-react-lib/package.json .
RUN npm install
COPY react-lib/wp-react-lib/public public
COPY react-lib/wp-react-lib/src src
RUN npm run dist

# Stage 3: Build the UI
FROM node:18.18.2 AS ui
WORKDIR /tmp/work

# Copy and install dependencies
COPY ui/package*.json ./
COPY ui/craco.config.js ./

# Copy the React library and customizer
COPY --from=reactlib /tmp/work/package.json ../react-lib/wp-react-lib/
COPY --from=reactlib /tmp/work/dist ../react-lib/wp-react-lib/dist
COPY --from=customizer /tmp/work/package.json ../../custom/ui-customizer/
COPY --from=customizer /tmp/work/dist ../../custom/ui-customizer/dist
COPY --from=customizer /tmp/work/dist/public public
RUN npm install --legacy-peer-deps

# Copy source files
COPY ui/public public
COPY ui/src src

# Build the UI
ARG REACT_APP_THEME
ARG REACT_APP_SITE_URL_WITH_LOCALE
ENV REACT_APP_SITE_URL_WITH_LOCALE=$REACT_APP_SITE_URL_WITH_LOCALE
RUN REACT_APP_GA_CODE='#REACT_APP_GA_CODE#' \
  REACT_APP_DEFAULT_LOCALE='#REACT_APP_DEFAULT_LOCALE#' \
  REACT_APP_THEME="$REACT_APP_THEME" \
  REACT_APP_TITLE='Data VIZ UI' \
  REACT_APP_USE_HASH_LINKS='#REACT_APP_USE_HASH_LINKS#' \
  REACT_APP_UTIL_API='/api/utils' \
  REACT_APP_WP_API='/wp/wp-json' \
  REACT_APP_WP_HOSTS='#REACT_APP_WP_HOSTS#' \
  REACT_APP_WP_SEARCH_END_POINT='#REACT_APP_WP_SEARCH_END_POINT#' \
  REACT_APP_WP_STYLES='/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' \
  REACT_APP_SITE_URL_WITH_LOCALE="$REACT_APP_SITE_URL_WITH_LOCALE" \
   npm run build

# Stage 4: Setup Nginx
FROM nginx:stable-alpine
COPY --from=ui /tmp/work/build /var/www/static
COPY nginx.sh /usr/local/sbin/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/static

# Define entrypoint and command
ENTRYPOINT ["/usr/local/sbin/nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]
