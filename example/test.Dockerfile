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

# Copy manifests so pnpm can resolve/link workspace deps (dvz-ui, wp-react-lib)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Replace versions with workspace:* for local development
RUN node -e "const fs=require('fs');const p='./package.json';const j=JSON.parse(fs.readFileSync(p,'utf8'));['@devgateway/dvz-ui-react','@devgateway/wp-react-lib'].forEach(k=>{if(j.dependencies&&j.dependencies[k]) j.dependencies[k]='workspace:*';});fs.writeFileSync(p, JSON.stringify(j,null,2));"

COPY  --from=data-viz-ui /package.json ./data-viz-ui/package.json
COPY --from=data-viz-ui packages/dvz-ui/package.json ./data-viz-ui/packages/dvz-ui/package.json
COPY --from=data-viz-ui packages/react-lib/wp-react-lib/package.json ./data-viz-ui/packages/react-lib/wp-react-lib/package.json
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --no-frozen-lockfile

COPY --from=data-viz-ui / ./data-viz-ui
# Copy the rest of the source and build local packages used by the app
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm -r --filter @devgateway/* build


from base as build-env
WORKDIR /app
# Bring in workspace package manifests and build outputs from local-packages
COPY --from=local-packages /app/data-viz-ui/package.json ./data-viz-ui/package.json
COPY --from=local-packages /app/data-viz-ui/packages/dvz-ui/package.json ./data-viz-ui/packages/dvz-ui/package.json
COPY --from=local-packages /app/data-viz-ui/packages/react-lib/wp-react-lib/package.json ./data-viz-ui/packages/react-lib/wp-react-lib/package.json
COPY --from=local-packages /app/data-viz-ui/packages/dvz-ui/dist ./data-viz-ui/packages/dvz-ui/dist
COPY --from=local-packages /app/data-viz-ui/packages/react-lib/wp-react-lib/dist ./data-viz-ui/packages/react-lib/wp-react-lib/dist
# Copy workspace file so pnpm sees the monorepo
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
# Copy remaining project files (may re-copy original package.json)
COPY *.* ./
COPY app ./app
# Ensure the modified package.json (with workspace:*) is in place for install
COPY --from=local-packages /app/package.json ./package.json

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
RUN pnpm list --depth 0 | grep '@devgateway' || true

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
COPY --from=local-packages /app/package.json ./package.json
# Use pruned production-only node_modules from build stage
COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
#TODO: print container ininital message
ENV INIT_MESSAGE="==============================\n===  TESTING CONTAINER RUNNING  ===\n=============================="
CMD ["sh", "-lc", "echo '--- package.json (runtime) ---'; cat package.json; echo \"$INIT_MESSAGE\"; exec npm run start"]