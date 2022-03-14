# syntax=docker/dockerfile:1
FROM node:17-alpine3.14
WORKDIR /rtracker-client
COPY . .
ENV REACT_APP_HOST_URL=http://localhost:3000
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000