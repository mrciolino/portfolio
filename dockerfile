FROM node:14-alpine
RUN apt-get update && apt-get install -y python2.7
RUN git clone https://github.com/mrciolino/portfolio-site.git
WORKDIR /portfolio-site
RUN npm install