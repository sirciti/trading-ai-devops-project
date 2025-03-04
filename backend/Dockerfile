FROM node:18.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install axios dotenv

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
