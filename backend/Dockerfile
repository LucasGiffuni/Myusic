FROM node:18.15

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN [ "set NODE_ENV=development" ]

CMD [ "npm", "run", "dev" ]
