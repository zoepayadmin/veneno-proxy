const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://venomcheckoutpremium.lovable.app',
  changeOrigin: true,
  headers: {
    'X-Forwarded-Host': 'venomcheckoutpremium.lovable.app'
  },
  onProxyReq: (proxyReq, req) => {
    // Passa o domínio original como header para o app saber qual checkout
    proxyReq.setHeader('X-Original-Host', req.headers.host);
  }
}));

app.listen(3000);
