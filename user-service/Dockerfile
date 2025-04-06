FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g sequelize-cli

EXPOSE 3000
CMD ["sh", "-c", "sequelize-cli db:migrate && npm start"]