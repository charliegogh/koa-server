const Koa = require('koa')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const logger = require('koa-logger')()
const config = require('./config.js') // 全局配置
const routerResponse = require('./utils/response')

// 路由
new Koa()
  // 跨域配置
  .use(cors({
    origin: (ctx) => ctx.headers.origin, // 设置允许访问的请求源
    credentials: true, // 允许发送跨域凭证(cookie、HTTP认证及客户端SSL证明等)
    exposeHeaders: ['Custom-Header'] // 允许前端访问的自定义响应头字段
  }))
  // bodyParser:post 请求体解析
  .use(bodyParser({
    multipart: true, // 支持文件上传
    enableTypes: ['json', 'form', 'text']
  }))
  .use(logger)
  // 公共返回
  .use(routerResponse())
  // router
  .use(router.routes())
  .use(router.allowedMethods())
  // port
  .listen(config.port, on)
/**
 * start serve
 */
function on() {
  const port = config.port
  console.log(`server port ${port} listening and open browser with http://localhost:${port}....`)
}
