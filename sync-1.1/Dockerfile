# BASED ON https://docs.services.mozilla.com/howtos/run-sync.html
FROM ubuntu 

RUN apt-get update \
	&& apt-get install -yq \
		libssl-dev \
		make \
		mercurial \
		python-dev \
		python-virtualenv \
		sqlite3 \
	&& echo rm -rf /var/lib/apt/lists/*

RUN hg clone https://hg.mozilla.org/services/server-full
RUN cd server-full && make build
COPY sync.conf /full-server/etc/sync.conf

EXPOSE 5000

CMD cd server-full && bin/paster serve development.ini
