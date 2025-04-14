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
WORKDIR /example/front/ui

COPY ui/package.json ./
COPY --from=reactlib /tmp/work/package.json ../react-lib/wp-react-lib/
COPY --from=reactlib /tmp/work/dist ../react-lib/wp-react-lib/dist

COPY --from=customizer /tmp/work/package.json ../../custom/ui-customizer/
COPY --from=customizer /tmp/work/dist ../../custom/ui-customizer/dist
COPY --from=customizer /tmp/work/dist/public public
#RUN --mount=type=cache,target=node_modules,id=ui_node_modules npm install

FROM node:22-slim AS ui
WORKDIR /tmp/
COPY --from=install /example/ /example/

RUN cd /example/front/ui
COPY ui/public public
COPY ui /example/front/ui
RUN rm -rf /example/front/ui/package-lock.json

RUN cd /example/front/ui && npm install @rollup/rollup-linux-arm64-gnu && \
  VITE_REACT_APP_GA_CODE='#VITE_REACT_APP_GA_CODE#' \
  VITE_REACT_APP_DEFAULT_LOCALE='#VITE_REACT_APP_DEFAULT_LOCALE#' \
  VITE_REACT_APP_USE_HASH_LINKS='#VITE_REACT_APP_USE_HASH_LINKS#' \
  VITE_REACT_APP_WP_HOSTS='#VITE_REACT_APP_WP_HOSTS#' \
  VITE_REACT_APP_LOAD_DEFAULT_THEME='#VITE_REACT_APP_LOAD_DEFAULT_THEME#' \
  # VITE_REACT_APP_API_ROOT='#VITE_REACT_APP_API_ROOT#' \
  VITE_REACT_APP_WP_SEARCH_END_POINT='#VITE_REACT_APP_WP_SEARCH_END_POINT#' \
  VITE_REACT_APP_WP_STYLES='/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' \
    npm run build

CMD ["/bin/bash"]

FROM nginx:stable-alpine
COPY --from=ui  /example/front/ui/dist /var/www/static
COPY nginx.sh /usr/local/sbin/

WORKDIR /var/www/static
ENTRYPOINT ["/usr/local/sbin/nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]

