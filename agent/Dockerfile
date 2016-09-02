FROM node:6-slim
RUN npm set registry http://172.17.0.1:4873
WORKDIR /usr/src
ADD package.json ./
RUN npm i
ADD app ./app
EXPOSE 8080
CMD npm start
