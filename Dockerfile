FROM node:18

WORKDIR /nodejs-homework-rest-api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]