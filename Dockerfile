# syntax=docker/dockerfile:1
FROM ubuntu:20.04
RUN apt-get update; apt-get install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
WORKDIR /rtracker-client
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000