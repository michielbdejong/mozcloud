# BASED ON https://github.com/Angel0fDarkness/docker-syncserver
# Use phusion/baseimage based on Ubuntu 14.04
FROM ubuntu 

RUN apt-get update \
	&& apt-get update -yq \
		build-essential \
		git \
		libpq-dev \
		python-dev \
		python-setuptools \
		python-virtualenv \
	&& rm -rf /var/lib/apt/lists/*

# Install some Python dependencies
RUN easy_install psycopg2

# Map the start scripts to the container
COPY scripts /scripts
RUN chmod +x /scripts/start.sh
COPY config/syncserver.ini /home/ffsync/syncserver.ini

# Create link for runit to start the syncserver
RUN mkdir /etc/service/syncserver
RUN ln -s /scripts/start.sh /etc/service/syncserver/run

# Add a new user
RUN useradd --create-home ffsync
RUN chown -R ffsync:ffsync /home/ffsync

# Download & Build Mozilla Syncserver
WORKDIR /home/ffsync
RUN su ffsync -c 'git clone https://github.com/mozilla-services/syncserver'
WORKDIR /home/ffsync/syncserver
RUN su ffsync -c 'make build'

# Install some Python dependencies (in virtualenv)
RUN /home/ffsync/syncserver/local/bin/easy_install psycopg2

# Expose port 5000 and start the server
EXPOSE 5000

# Use the init system from baseimage
CMD ["/sbin/my_init"]
