const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://www.codiary-s.shop',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '',
      },
    })
  );
};
