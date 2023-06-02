const { cnki_log, sys_users } = require(process.cwd() + '/models')
const router = require('koa-router')()
const uuid = require('uuid')
const moment = require('moment')
// 文件上传
router.post('/cnkiLog', async(ctx) => {
  const params = ctx.request.body
  const headers = ctx.request.headers
  console.log(headers)
  const data = await cnki_log.create({
    id: uuid.v1(),
    ...params,
    userAgent: headers['user-agent'],
    createTime: moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
  })
  ctx.success(data)
})
router.get('/cnkiLog/list', async(ctx) => {
  const data = await cnki_log.findAll()
  ctx.success(data)
})
module.exports = router.routes()
