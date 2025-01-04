# Stage 1: Build the application
FROM node:20-alpine as builder
ARG BUILD_CONTEXT
WORKDIR /app

ARG SQL_URI
ARG ENV

ENV SQL_URI=${SQL_URI}
ENV ENV=${ENV}
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN ls

RUN npm install -g @nestjs/cli
RUN pnpm run build

# Stage 2: Setup production image

FROM node:20-alpine

WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/typeorm.config.ts ./typeorm.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/src/main"]