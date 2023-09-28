const { school } = require(process.cwd() + '/models')
const router = require('koa-router')()
const base = '/school'
router.get(base + '/getList', async(ctx, next) => {
  try {
    const data = await school.findAll()
    ctx.success(
      data
    )
  } catch (e) {
    ctx.fail(e)
  }
})
router.post(base + '/edit', async(ctx, next) => {
  const params = ctx.request.body
  try {
    await school.update(
      {
        ...params
      },
      {
        where: {
          id: params.id
        }
      }
    )
    ctx.success()
  } catch (e) {
    ctx.fail(e)
  }
})
module.exports = router.routes()

