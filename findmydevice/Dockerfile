FROM ubuntu
RUN apt-get update \
	&& apt-get install -yq \
		build-essential \
		g++ \
		git \
		golang \
		make \
		postgresql-9.3 \
		python \
		python-software-properties \
		redis-server
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update \
	&& apt-get install -yq \
		nodejs \
	&& rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/mozilla-services/FindMyDevice
RUN cd FindMyDevice && ./install.bash
