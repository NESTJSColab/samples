FROM node:16.13.0-alpine

WORKDIR /app

COPY package.json .

RUN npm run build

RUN npm install

COPY ./dist ./src

EXPOSE 3000

CMD ["node", "src/main.js"]