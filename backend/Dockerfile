FROM node:current-alpine

EXPOSE 3333

WORKDIR /usr/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
RUN yarn

COPY . .

RUN npx knex migrate:latest

CMD yarn start