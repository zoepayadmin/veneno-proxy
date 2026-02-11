const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'https://venomcheckoutpremium.lovable.app',
  changeOrigin: true,
  secure: true,
  headers: {
    host: 'venomcheckoutpremium.lovable.app'
  }
});

proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message);
  res.writeHead(502);
  res.end('Proxy error');
});

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.headers.host}${req.url}`);
  proxy.web(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
{
  "name": "veneno-proxy",
  "version": "1.0.0",
  "description": "Reverse proxy for VenomCheckout custom domains",
  "main": "server.js",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build step needed'"
  },
  "dependencies": {
    "http-proxy": "^1.18.1"
  }
}
