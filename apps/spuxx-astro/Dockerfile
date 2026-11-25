# Build stage
FROM node:26.13.1-slim AS build
RUN apk add g++ make py3-pip
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy the application folder
COPY . ./app

# Install dependencies and build
WORKDIR /app
RUN pnpm install --no-frozen-lockfile
RUN pnpm build

# Production stage
FROM nginx/nginx-unprivileged:1.31.10-alpine3.24 AS runtime
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 9999
EXPOSE 8080
