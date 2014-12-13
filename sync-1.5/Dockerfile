FROM ubuntu
RUN apt-get update \
	&& apt-get install -yq \
		git \
		make \
		python2.7 \
		python2.7-dev \
		python-virtualenv \
	&& rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/mozilla-services/syncserver
RUN cd syncserver && make build

EXPOSE 5000
CMD cd syncserver && make serve
