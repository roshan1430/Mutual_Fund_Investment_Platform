FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:stable-alpine

ENV API_PROXY_TARGET=mutual-fund-backend.railway.internal:8080

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

CMD ["/bin/sh", "-c", "envsubst '$PORT $API_PROXY_TARGET' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]