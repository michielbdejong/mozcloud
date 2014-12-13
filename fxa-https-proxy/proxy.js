var fs = require('fs'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer();

function runProxy(from, to) {
  https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, function(req, res) {
    console.log('proxy', req.url);
    proxy.web(req, res, { target: 'http://localhost:'+to }, function(e) {
      console.log('proxy error', e);
    });
  }).listen(from);
  console.log('Proxying https://localhost:' + from
    + ' to http://localhost:' + to);
}

runProxy(3031, 3030);
runProxy(9002, 9000);
