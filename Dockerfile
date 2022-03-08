# syntax=docker/dockerfile:1
FROM node:17-alpine3.14
WORKDIR /rtracker-client
COPY . .
RUN npm install
RUN npm run build
RUN npm i -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000