ARG REPO
ARG TAG
FROM ${REPO}/ui-customizer:${TAG}  AS customizer

FROM node:22-slim AS reactlib
WORKDIR /tmp/work
COPY react-lib/wp-react-lib/package.json .
RUN npm install
COPY react-lib/wp-react-lib/public public
COPY react-lib/wp-react-lib/src src
RUN npm run dist

FROM node:22-slim AS install
COPY ui/package*.json ./
COPY --from=reactlib /tmp/work/package.json ../react-lib/wp-react-lib/
COPY --from=reactlib /tmp/work/dist ../react-lib/wp-react-lib/dist
COPY --from=customizer /tmp/work/package.json ../../custom/ui-customizer/
COPY --from=customizer /tmp/work/dist ../../custom/ui-customizer/dist

RUN --mount=type=cache,target=node_modules,id=ui_node_modules npm install

FROM node:22-slim AS ui
WORKDIR /tmp/work
COPY --from=install /tmp/work/ /tmp/work/
RUN npm install && npm install react-compiler-runtime

COPY ui/public public
COPY ui .

ARG REACT_APP_THEME
RUN \
  VITE_REACT_APP_GA_CODE='#REACT_APP_GA_CODE#' \
  VITE_REACT_APP_DEFAULT_LOCALE='#REACT_APP_DEFAULT_LOCALE#' \
  VITE_REACT_APP_THEME="$REACT_APP_THEME" \
  VITE_REACT_APP_TITLE='Data VIZ UI' \
  VITE_REACT_APP_USE_HASH_LINKS='#REACT_APP_USE_HASH_LINKS#' \
  VITE_REACT_APP_UTIL_API='/api/utils' \
  VITE_REACT_APP_WP_API='/wp/wp-json' \
  VITE_REACT_APP_WP_HOSTS='#REACT_APP_WP_HOSTS#' \
  VITE_REACT_APP_WP_SEARCH_END_POINT='#REACT_APP_WP_SEARCH_END_POINT#' \
  VITE_REACT_APP_WP_STYLES='/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' \
   npm run build
CMD ["/bin/bash"]


FROM nginx:stable-alpine
COPY --from=ui /tmp/work/dist /var/www/static
COPY nginx.sh /usr/local/sbin/

WORKDIR /var/www/static
ENTRYPOINT ["/usr/local/sbin/nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]

