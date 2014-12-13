# adapted from https://github.com/mozilla-services/pushgo/blob/dev/Dockerfile
FROM google/golang

RUN apt-get install --no-install-recommends -y -q bzr automake flex bison libtool cloog-ppl wget git
RUN cd /usr/local/src && wget https://launchpad.net/libmemcached/1.0/1.0.18/+download/libmemcached-1.0.18.tar.gz
RUN cd /usr/local/src && echo '8be06b5b95adbc0a7cb0f232e237b648caf783e1  libmemcached-1.0.18.tar.gz' | sha1sum -c
RUN cd /usr/local/src && tar -xzvf libmemcached-1.0.18.tar.gz
RUN cd /usr/local/src/libmemcached-1.0.18 && ./configure --prefix=/usr && make install
RUN cd /usr/local/src && tar -xzvf libmemcached-1.0.18.tar.gz
RUN rm -rf /usr/local/src
RUN git clone https://github.com/mozilla-services/pushgo
RUN apt-get remove -y -q bzr automake flex bison libtool cloog-ppl wget git

RUN mkdir -p /gopath/src
RUN mv pushgo /gopath/src/app

WORKDIR /gopath/src/app
RUN make
RUN make simplepush

# WebSocket listener port.
EXPOSE 8080
# HTTP update listener port.
EXPOSE 8081
# Internal routing port; should not be published.
EXPOSE 3000

ENV PUSHGO_METRICS_STATSD_HOST :8125
ENTRYPOINT ["./simplepush", "-config=config.docker.toml"]

# current problem: go can't find git, for some reason.
