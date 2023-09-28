const k2c = require('koa2-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')
const schoolDetailProxyMiddleware = async(ctx, next) => {
  if (ctx.url.startsWith('/schoolDetail')) {
    ctx.respond = false
    await k2c(
      createProxyMiddleware({
        target: 'https://static-data.gaokao.cn/www/2.0/school/',
        changeOrigin: true,
        pathRewrite: {
          '^/schoolDetail': '/'
        }
      })
    )(ctx, next)
  }
  await next()
}
module.exports = schoolDetailProxyMiddleware
