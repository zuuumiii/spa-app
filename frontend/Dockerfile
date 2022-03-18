FROM node:16.0.0-alpine
RUN mkdir /myapp
WORKDIR /myapp
COPY . .
RUN yarn install
RUN npm install react-scripts

EXPOSE 3000
CMD ["yarn", "run", "start"]
