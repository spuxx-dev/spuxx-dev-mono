FROM node:lts-alpine AS build
RUN apk add g++ make py3-pip
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build -- --mode custom

FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 1000
EXPOSE 8080
