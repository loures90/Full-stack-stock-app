FROM node:16

WORKDIR /usr/src/app/my-app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --production
CMD ["npm", "run", "start"]