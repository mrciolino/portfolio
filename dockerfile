FROM node:16-slim 
WORKDIR /app
COPY ./ /app
EXPOSE 3000
RUN apt-get update && apt-get install -y python2.7 openssh-client git curl
RUN npm install && yarn build && yarn global add serve 