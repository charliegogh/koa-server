const { cnki_log, sys_users } = require(process.cwd() + '/models')
const router = require('koa-router')()
const uuid = require('uuid')
// 文件上传
router.post('/cnkiLog', async(ctx) => {
  const params = ctx.request.body
  const data = await cnki_log.create({
    id: uuid.v1(),
    ...params
  })
  ctx.success(data)
})
module.exports = router.routes()
