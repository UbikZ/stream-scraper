# Set nginx base image
FROM redis

# File Author / Maintainer
MAINTAINER Gabriel Malet

# Overcommit_memory is set to 0! Background save may fail under low memory condition.
RUN echo 'vm.overcommit_memory = 1' > /etc/sysctl.conf

# Disable Transparent Huge Pages (THP) for Redis to avoid latency and memory usage issues.
RUN	echo never > /sys/kernel/mm/transparent_hugepage/enabled