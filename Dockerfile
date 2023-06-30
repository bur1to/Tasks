FROM node:18.16.0

WORKDIR /home/bur1to/Desktop/code/Tasks

COPY package*.json ./

RUN npm install -g npm@9.7.2
RUN npm install

COPY . .

CMD ["npm", "start"]