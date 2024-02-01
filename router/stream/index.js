const { Readable } = require('stream')
const router = require('koa-router')()
router.get('/stream', async(ctx) => {
  ctx.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  ctx.body = createEventStream('data: Initial data\\n\\n')
  const interval = setInterval(() => {
    ctx.body.write(`data: ${new Date().toISOString()}\n\n`)
  }, 1000)
  // 在连接关闭时清除定时器
  ctx.req.on('close', () => {
    clearInterval(interval)
    ctx.body.end()
  })
})
function createEventStream(initialData) {
  const readable = new Readable()
  readable._read = () => {}
  readable.push(initialData)
  return readable
}

module.exports = router.routes()

