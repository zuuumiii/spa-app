FROM node:15.0.1-alpine

RUN mkdir /myapp
WORKDIR /myapp

COPY package.json /myapp/package.json  
COPY yarn.lock /myapp/yarn.lock
RUN yarn install
COPY . /myapp
ENTRYPOINT [ "yarn", "start" ]
