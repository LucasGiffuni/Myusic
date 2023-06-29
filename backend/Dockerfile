FROM node:18.15.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV development

CMD [ "npm", "run", "dev" ]
