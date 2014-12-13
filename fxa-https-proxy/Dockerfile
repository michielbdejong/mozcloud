FROM node
RUN openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 999999 -nodes -subj '/CN=localhost'
COPY proxy.js proxy.js
RUN npm install http-proxy

EXPOSE 3031
EXPOSE 9002
CMD node proxy.js
