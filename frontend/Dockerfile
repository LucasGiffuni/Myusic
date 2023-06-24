# Stage 1
FROM node:18.15.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/my-music /usr/share/nginx/html
