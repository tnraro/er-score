from node:23-slim as base
env PNPM_HOME="/pnpm"
env PATH="$PNPM_HOME:$PATH"
run corepack enable
copy . /app
workdir /app

from base as prod-deps
run --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --prefer-offline

from base as build
run --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline
run pnpm run build

from oven/bun:1-alpine
env NODE_ENV=production
workdir /app
copy --from=prod-deps --chown=bun:bun /app/node_modules /app/node_modules
copy --from=build --chown=bun:bun /app/build /app/build
user bun
entrypoint ["bun", "run", "build/index.js"]