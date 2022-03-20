FROM node:16.0.0-alpine

RUN mkdir /myapp
WORKDIR /myapp

ENV PATH /myapp/node_modules/.bin:$PATH
COPY package.json /myapp/package.json  
COPY yarn.lock /myapp/yarn.lock
RUN yarn install
COPY . /myapp
ENTRYPOINT [ "yarn", "start" ]
