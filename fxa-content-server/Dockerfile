FROM node
RUN git clone https://github.com/mozilla/fxa-content-server
RUN cd fxa-content-server/server/config/ ; cp local.json-dist local.json
RUN cd fxa-content-server/ && npm install

EXPOSE 3030
EXPOSE 3080
CMD cd fxa-content-server/ && npm start
