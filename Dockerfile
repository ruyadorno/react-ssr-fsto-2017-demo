FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN mkdir ./build

RUN npm install

# Bundle app source
COPY build/assets.json ./build
COPY build/server.js ./build
COPY build/public ./build/public

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
