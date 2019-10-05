FROM node:12.11-alpine
RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . ./
RUN yarn
