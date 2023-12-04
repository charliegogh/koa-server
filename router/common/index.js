const router = require('koa-router')()
const upload = require(process.cwd() + '/utils/upload.js')
const axios = require('axios')
const fs = require('fs')
// 文件上传
router.post('/upload', upload.single('file'), async(ctx) => {
  console.log('~~~~~')
  ctx.redirect('https://x.cnki.net/') // 执行重定向
  // ctx.body = {
  //   path: ctx.req.file.filename
  // }
})
function flattenArray(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten)
  }, [])
}

router.get('/test', async(ctx) => {
  ctx.body = 123
})
module.exports = router.routes()
