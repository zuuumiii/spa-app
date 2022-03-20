FROM node:16.0.0-alpine
RUN mkdir /myapp
WORKDIR /myapp
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn", "start" ]
