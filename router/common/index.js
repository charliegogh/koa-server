const router = require('koa-router')()
const upload = require(process.cwd() + '/utils/upload.js')
const axios = require('axios')
const fs = require('fs')
// 文件上传
router.post('/upload', upload.single('file'), async(ctx) => {
  console.log('~~~~~')
  ctx.body = {
    path: ctx.req.file.filename
  }
})
function flattenArray(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten)
  }, [])
}

router.post('/test', async(ctx) => {
  ctx.body = {
    data: 0
  }
})
module.exports = router.routes()
