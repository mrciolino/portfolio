FROM node:16-slim 
RUN apt-get update && apt-get install -y python2.7
CMD ["/bin/bash"]