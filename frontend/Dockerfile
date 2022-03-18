FROM node:16.0.0-alpine
RUN mkdir /myapp
WORKDIR /myapp
COPY . .
RUN yarn install

EXPOSE 3000
CMD ["yarn", "run", "start"]
