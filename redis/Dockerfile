# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Gabriel Malet

# Update the repository and install Redis Server
RUN apt-get update && \
	apt-get install -y redis-server && \
	apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Overcommit_memory is set to 0! Background save may fail under low memory condition.
RUN echo 'vm.overcommit_memory = 1' > /etc/sysctl.conf

# Disable Transparent Huge Pages (THP) for Redis to avoid latency and memory usage issues.
RUN	echo never > /sys/kernel/mm/transparent_hugepage/enabled

# Expose Redis port 6379
EXPOSE 6379

# Run Redis Server
ENTRYPOINT  ["/usr/bin/redis-server"]