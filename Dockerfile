FROM node:16-alpine as build
WORKDIR /app
COPY . ./
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]