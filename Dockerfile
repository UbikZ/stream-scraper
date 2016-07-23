# Set the base image to Ubuntu
FROM node

# File Author / Maintainer
MAINTAINER Gabriel Malet

# Install Node.js and other dependencies
RUN apt-get update && \
	apt-get -y install git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PM2
RUN npm install -g pm2

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

# Expose port
EXPOSE 8080

# Run app
CMD pm2 start --no-daemon processes.json