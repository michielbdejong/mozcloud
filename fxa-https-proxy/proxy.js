var fs = require('fs'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer();

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, function(req, res) {
  console.log('proxy', req.url);
  proxy.web(req, res, { target: 'http://localhost:3030' }, function(e) {
    console.log('proxy error', e);
  });
}).listen(3031);
console.log('Proxying https://localhost:3031/ to http://localhost:3030/');
