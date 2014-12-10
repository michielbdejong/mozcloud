FROM node
RUN git clone https://github.com/mozilla/fxa-auth-server
RUN cd fxa-auth-server/ && npm install
RUN NODE_ENV=dev && cd fxa-auth-server/ && npm start

# failing because of bigint npm package
