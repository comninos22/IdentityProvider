FROM node:14 as base

WORKDIR /app

COPY package*.json ./


RUN npm install 

ENV PORT=4000

COPY . .

EXPOSE 4000

RUN npm run build

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

