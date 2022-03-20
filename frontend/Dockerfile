FROM node:16.0.0-alpine
RUN mkdir /myapp
WORKDIR /myapp
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn", "start" ]
