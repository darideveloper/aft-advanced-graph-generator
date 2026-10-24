FROM node:22.23.4-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY . .

# Build-time variables (must match Coolify vars)
ARG API_ENDPOINT
ARG API_TOKEN
ARG BAR_CHART_SURVEY_ID

ENV API_ENDPOINT=$API_ENDPOINT
ENV API_TOKEN=$API_TOKEN
ENV BAR_CHART_SURVEY_ID=$BAR_CHART_SURVEY_ID

RUN corepack enable pnpm && pnpm run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 80

CMD ["node", "dist/server/entry.mjs"]
