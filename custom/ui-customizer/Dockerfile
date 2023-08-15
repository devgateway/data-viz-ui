FROM node:12.22.12
WORKDIR /tmp/work
COPY ./package.json .
RUN npm install    \
    && npm rebuild node-sass
RUN npm install
COPY src src
RUN npm run dist

