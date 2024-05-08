const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/users',
        createProxyMiddleware({
            target: 'http://localhost:4003',
            changeOrigin: true,
        })
    );
    
    app.use(
        '/organization',
        createProxyMiddleware({
            target: 'http://localhost:4001',
            changeOrigin: true,
        })
    );
    
    app.use(
        '/admin',
        createProxyMiddleware({
            target: 'http://localhost:4002',
            changeOrigin: true,
        })
    );
};
