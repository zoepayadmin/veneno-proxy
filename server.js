const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://venomcheckoutpremium.lovable.app',
  changeOrigin: true,
  headers: {
    host: 'venomcheckoutpremium.lovable.app'
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
