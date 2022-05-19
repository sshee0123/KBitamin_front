const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/fileUpload',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true, // 대상 서버 구성에 띠라 호스트 헤더 변경되도록
    })
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080/',
      changeOrigin: true,
    })
  )
};