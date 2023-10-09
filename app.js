const Koa = require('koa')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const logger = require('koa-logger')()
const config = require('./config.js') // 全局配置
const routerResponse = require('./utils/response')
const k2c = require('koa2-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = new Koa()
// const LID = 'WEEvREcwSlJHSldTTEYzVnBFdUNiTmFEaHBsU0tkSDZxamFCbFNqWk9OWT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4ggI8Fm4gTkoUKaID8j8gFw!!'
const LID = 'WEEvREcwSlJHSldTTEYyVWs3STBBMlE5Y3RzZElKR042a1hVdGlMQm1lZz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!'
// 路由
app
  // 跨域配置
  .use(cors({
    origin: (ctx) => ctx.headers.origin, // 设置允许访问的请求源
    credentials: true, // 允许发送跨域凭证(cookie、HTTP认证及客户端SSL证明等)
    exposeHeaders: ['Custom-Header'] // 允许前端访问的自定义响应头字段
  }))
  // bodyParser:post 请求体解析
  // .use(bodyParser({
  //   multipart: true, // 支持文件上传
  //   enableTypes: ['json', 'form', 'text'],
  //   formidable: {
  //     maxFileSize: 500 * 1024 * 1024
  //   }
  // }))
  .use(logger)
  // 公共返回
  .use(routerResponse())
  // router
  .use(router.routes())
  .use(router.allowedMethods())
  // .use(async(ctx, next) => {
  //   if (ctx.url.startsWith('/schoolDetail')) {
  //     ctx.respond = false
  //     await k2c(
  //       createProxyMiddleware({
  //         target: 'https://static-data.gaokao.cn/www/2.0/school/',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/schoolDetail': '/'
  //         }
  //       })
  //     )(ctx, next)
  //   }
  //   await next()
  // })
  .use(async(ctx, next) => {
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
  })
  .use(async(ctx, next) => {
    if (ctx.url.startsWith('/xmsApi')) {
      ctx.respond = false
      await k2c(
        createProxyMiddleware({
          target: 'https://xms-web-test.cnki.net',
          changeOrigin: true,
          headers: {
            'cookie': 'LID=' + LID
          },
          pathRewrite: {
            '^/xmsApi': ''
          }
        })
      )(ctx, next)
    }
    await next()
  })
  .use(async(ctx, next) => {
    if (ctx.url.startsWith('/xfatApi')) {
      ctx.respond = false
      await k2c(
        createProxyMiddleware({
          target: 'https://xfat.cnki.net/',
          changeOrigin: true,
          headers: {
            'cookie': 'LID=' + LID
          },
          pathRewrite: {
            '^/xfatApi': ''
          }
        })
      )(ctx, next)
    }
    await next()
  })
  // port
  .listen(config.port, on)

/**
 * start serve
 */
function on() {
  const port = config.port
  console.log(`server port ${port} listening and open browser with http://localhost:${port}....`)
}
