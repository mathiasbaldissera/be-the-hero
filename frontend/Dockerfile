FROM node:alpine

EXPOSE 3000

WORKDIR /usr/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
RUN yarn

COPY . .

CMD yarn start