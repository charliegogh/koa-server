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

router.get('/test', async() => {
  fs.readFile('results.json', 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件出错：', err)
    } else {
      const rs = flattenArray(JSON.parse(data))
      fs.writeFile('rs.json', JSON.stringify(rs), (err) => {
        if (err) {
          console.error('写入文件出错：', err)
        } else {
          console.log('结果已成功导出到 results.json 文件')
        }
      })
    }
  })
})
module.exports = router.routes()
