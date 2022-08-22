FROM node:16
WORKDIR /usr/src/app/api
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]