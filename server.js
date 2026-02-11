const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET = 'https://venomcheckoutpremium.lovable.app';

app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  secure: true,
  headers: {
    'Host': 'venomcheckoutpremium.lovable.app',
  },
  onProxyReq: (proxyReq, req) => {
    // Envia o domínio original para o app identificar o checkout
    proxyReq.setHeader('X-Original-Host', req.headers.host || '');
  },
  onProxyRes: (proxyRes) => {
    // Remove headers que podem causar problemas
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Venom Proxy rodando na porta ${PORT}`);
  console.log(`Proxy: *.venomcheckout.pro → ${TARGET}`);
});
