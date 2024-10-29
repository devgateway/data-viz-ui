FROM node:20-slim
WORKDIR /tmp/work
COPY ./package.json .
RUN npm install    \
    && npm rebuild node-sass
RUN npm install
COPY src src
RUN npm run dist

