FROM ubuntu
RUN apt-get update \
	&& apt-get install -yq \
		curl \
		g++ \
		git \
		libgmp3-dev \
		make \
		python \
	&& rm -rf /var/lib/apt/lists/*

######
# Node
######

# verify gpg and sha256: http://nodejs.org/dist/v0.10.31/SHASUMS256.txt.asc
# gpg: aka "Timothy J Fontaine (Work) <tj.fontaine@joyent.com>"
RUN gpg --keyserver pgp.mit.edu --recv-keys 7937DFD2AB06298B2293C3187D33FF9D0246406D

ENV NODE_VERSION 0.10.32
ENV NPM_VERSION 2.1.4

RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --verify SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc \
  && npm install -g npm@"$NPM_VERSION" \
  && npm cache clear

RUN npm install -g grunt-cli
RUN npm install -g vladikoff/freight

RUN git clone https://github.com/mozilla/fxa-content-server

RUN export FREIGHT_URL=https://freight.dev.lcip.org && cd fxa-content-server/ && freight
RUN cd fxa-content-server/ && grunt build

RUN cat fxa-content-server/server/config/local.json-dist \
	| sed 's/http:\/\/127.0.0.1:3030/https:\/\/127.0.0.1:3031/g' \
	| sed 's/http:\/\/127.0.0.1:9000/https:\/\/127.0.0.1:9002/g' \
	> fxa-content-server/server/config/local.json

EXPOSE 3030
EXPOSE 3080
CMD export FXA_URL=https://localhost:9002 && cd fxa-content-server/ && npm start
