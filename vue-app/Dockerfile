FROM node:18 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ .
RUN npm run build


FROM nginx as production-stage
COPY --from=build-stage /app/dist /app/home
COPY nginx.conf /etc/nginx/nginx.conf