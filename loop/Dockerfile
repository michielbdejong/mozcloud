FROM ubuntu
RUN apt-get update \
	&& apt-get install -yq \
		build-essential \
		g++ \
		git \
		make \
		redis-server \
		python \
		python-software-properties
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update \
	&& apt-get install -yq \
		nodejs \
	&& rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/mozilla-services/loop-server
RUN cd loop-server && make install
