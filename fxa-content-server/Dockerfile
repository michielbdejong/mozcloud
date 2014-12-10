FROM node
RUN git clone https://github.com/mozilla/fxa-content-server
RUN cd fxa-content-server/server/config/ ; cp local.json-dist local.json
RUN cd fxa-content-server/ && npm install
RUN cd fxa-content-server/ && npm start

