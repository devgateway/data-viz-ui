FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM base AS production-dependencies-env
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

FROM base AS build-env
COPY . /app/
WORKDIR /app
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=development-dependencies-env /app/node_modules /app/node_modules

# Replace the placeholders with actual values or environment variables
ARG VITE_REACT_APP_WP_API_URL
ENV VITE_REACT_APP_WP_API_URL=${VITE_REACT_APP_WP_API_URL:-"http://0.0.0.0/wp-json/wp/v2"}

ARG VITE_REACT_APP_WP_API
ARG VITE_REACT_APP_DEFAULT_LOCALE
ARG VITE_REACT_APP_USE_HASH_LINKS
ARG VITE_REACT_APP_API_ROOT
ARG VITE_REACT_APP_WP_SEARCH_END_POINT
ARG VITE_INTERNAL_GA_TOKEN

RUN pnpm run build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
#    VITE_REACT_APP_WP_STYLES=${VITE_REACT_APP_WP_STYLES:-"http://0.0.0.0/wp/wp-json"} \
#    VITE_REACT_APP_DEFAULT_LOCALE=${VITE_REACT_APP_DEFAULT_LOCALE:-"en"} \
#    VITE_REACT_APP_USE_HASH_LINKS=${VITE_REACT_APP_USE_HASH_LINKS:-"false"} \
#    VITE_REACT_APP_API_ROOT=${VITE_REACT_APP_API_ROOT:-"http://0.0.0.0"} \
#    VITE_REACT_APP_WP_SEARCH_END_POINT=${VITE_REACT_APP_WP_SEARCH_END_POINT:-"/dg/v1/search"} \
#    VITE_REACT_APP_WP_STYLES="http://localhost/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6"\
    pnpm run build:example


FROM base AS runtime
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/example/build/ /app/example/build/
WORKDIR /app/example
CMD ["pnpm", "run", "start"]
