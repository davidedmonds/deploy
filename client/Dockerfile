FROM node:6-slim
RUN npm set registry http://172.17.0.1:4873
WORKDIR /usr/src
ADD package.json ./
RUN npm i -g brunch
RUN npm i
ADD . ./
EXPOSE 3333 9485
CMD npm start
