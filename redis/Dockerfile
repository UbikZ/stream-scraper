# Set nginx base image
FROM redis

# File Author / Maintainer
MAINTAINER Gabriel Malet

# Overcommit_memory is set to 0! Background save may fail under low memory condition.
RUN sysctl vm.overcommit_memory=1

# The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
RUN sysctl -w net.core.somaxconn=65535

# Disable Transparent Huge Pages (THP) for Redis to avoid latency and memory usage issues.
RUN	sysctl vm.nr_hugepages=0