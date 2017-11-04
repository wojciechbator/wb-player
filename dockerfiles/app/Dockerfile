FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY client /usr/src/app/client
COPY node_modules /usr/src/app/node_modules
COPY server /usr/src/app/server
COPY sound_files /usr/src/app/sound_files
COPY .babelrc /usr/src/app/
COPY package.json /usr/src/app/
COPY webpack.config.js /usr/src/app/
COPY yarn.lock /usr/src/app/

CMD yarn prod
