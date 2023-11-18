FROM node:18.18.2-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm","run", "dev-watch" ]