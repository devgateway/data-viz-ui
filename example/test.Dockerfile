# Base image with pnpm enabled
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV CI=true
RUN corepack enable
RUN corepack prepare pnpm@10.10.0 --activate


from base as local-packages
WORKDIR /app
# Building data-viz local deps
# Copy all files from data-viz-ui context
COPY --from=data-viz-ui / ./
# Install dependencies for all workspace packages
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --no-frozen-lockfile
# Build all workspace packages
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm -r --filter @devgateway/* build

#--------------

from base as build-env
WORKDIR /app
# Bring in workspace package manifests and build outputs from local-packages
#COPY --from=local-packages /app/data-viz-ui/ ./data-viz-ui/
COPY --from=local-packages /app/package.json ./data-viz-ui/package.json
COPY --from=local-packages /app/packages/dvz-ui/package.json ./data-viz-ui/packages/dvz-ui/package.json
COPY --from=local-packages /app/packages/react-lib/wp-react-lib/package.json ./data-viz-ui/packages/react-lib/wp-react-lib/package.json

COPY --from=local-packages /app/packages/dvz-ui/dist ./data-viz-ui/packages/dvz-ui/dist
COPY --from=local-packages /app/packages/react-lib/wp-react-lib/dist ./data-viz-ui/packages/react-lib/wp-react-lib/dist

COPY *.* ./
COPY app ./app
# Ensure the modified package.json (with workspace:*) is in place for install
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm  install ./data-viz-ui/packages/dvz-ui -w &&  pnpm install ./data-viz-ui/packages/react-lib/wp-react-lib -w

#2
#COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

# Build (VITE_* envs scoped to this RUN only)
ARG VITE_REACT_APP_WP_API
ARG VITE_REACT_APP_DEFAULT_LOCALE
ARG VITE_REACT_APP_USE_HASH_LINKS
ARG VITE_REACT_APP_WP_HOSTS
ARG VITE_REACT_APP_API_ROOT
ARG VITE_REACT_APP_WP_SEARCH_END_POINT
ARG VITE_REACT_APP_WP_STYLES

# Install with workspace links
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --no-frozen-lockfile
# Optional: verify linked workspaces (should show link: paths)

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    VITE_REACT_APP_WP_API=$VITE_REACT_APP_WP_API \
    VITE_REACT_APP_DEFAULT_LOCALE=$VITE_REACT_APP_DEFAULT_LOCALE \
    VITE_REACT_APP_USE_HASH_LINKS=$VITE_REACT_APP_USE_HASH_LINKS \
    VITE_REACT_APP_WP_HOSTS=$VITE_REACT_APP_WP_HOSTS \
    VITE_REACT_APP_API_ROOT=$VITE_REACT_APP_API_ROOT \
    VITE_REACT_APP_WP_SEARCH_END_POINT=$VITE_REACT_APP_WP_SEARCH_END_POINT \
    VITE_REACT_APP_WP_STYLES=$VITE_REACT_APP_WP_STYLES \
    pnpm run build
# After building, prune to production deps only to shrink runtime image
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm prune --prod





# Final runtime image
FROM node:22-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY --from=build-env /app/package.json ./package.json
# Use pruned production-only node_modules from build stage
COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
#TODO: print container ininital message
ENV INIT_MESSAGE="==============================\n===  TESTING CONTAINER RUNNING  ===\n=============================="
CMD ["sh", "-lc", "echo '--- package.json (runtime) ---'; cat package.json; echo \"$INIT_MESSAGE\"; exec npm run start"]

