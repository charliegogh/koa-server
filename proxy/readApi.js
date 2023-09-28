const k2c = require('koa2-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')
const LID = 'WEEvREcwSlJHSldTTEYzVnBFdUNiTmFEaHBsU0tkSDZxamFCbFNqWk9OWT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4ggI8Fm4gTkoUKaID8j8gFw!!'
const readApi = async(ctx, next) => {
  if (ctx.url.startsWith('/readApi')) {
    ctx.respond = false
    await k2c(
      createProxyMiddleware({
        target: 'https://xtest.cnki.net/',
        changeOrigin: true,
        headers: {
          'Token': LID,
          'cookie': 'LID=' + LID
        },
        pathRewrite: {
          '^/readApi': '/'
        }
      })
    )(ctx, next)
  }
  await next()
}
module.exports = readApi
