FROM node:18

WORKDIR /user/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start:prod"]