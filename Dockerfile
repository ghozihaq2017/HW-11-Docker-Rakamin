FROM node:18-alpine3.19
WORKDIR /todoApp

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "docker"]