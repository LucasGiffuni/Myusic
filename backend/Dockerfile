FROM node:18.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV development

EXPOSE 3000
CMD ["npm","start"]