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
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app

ARG VITE_REACT_APP_WP_API
ARG VITE_REACT_APP_DEFAULT_LOCALE
ARG VITE_REACT_APP_USE_HASH_LINKS
ARG VITE_REACT_APP_API_ROOT
ARG VITE_REACT_APP_WP_SEARCH_END_POINT
ARG VITE_REACT_APP_WP_STYLES


RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    VITE_REACT_APP_WP_API=$VITE_REACT_APP_WP_API \
    VITE_REACT_APP_DEFAULT_LOCALE=$VITE_REACT_APP_DEFAULT_LOCALE \
    VITE_REACT_APP_USE_HASH_LINKS=$VITE_REACT_APP_USE_HASH_LINKS \
    VITE_REACT_APP_API_ROOT=$VITE_REACT_APP_API_ROOT \
    VITE_REACT_APP_WP_SEARCH_END_POINT=$VITE_REACT_APP_WP_SEARCH_END_POINT \
    VITE_REACT_APP_WP_STYLES=$VITE_REACT_APP_WP_STYLES \
    pnpm run build


FROM base
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["pnpm", "run", "start"]