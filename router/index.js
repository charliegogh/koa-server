const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const moment = require('moment/moment')
const basename = path.basename(__filename)

// 批量读取文件路由信息
fs.readdirSync(__dirname)
  .filter((file) => {
    const result =
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) !== '.js'
    return result
  })
  .forEach((file) => {
    router.use(require('./' + file))
  })

// 读取本地文件并返回文件流
router.get('/download', async(ctx, next) => {
  const filePath = path.resolve(__dirname, '../files/test.docx') // 文件路径
  // 检查文件是否存在
  const isFileExists = fs.existsSync(filePath)
  if (isFileExists) {
    // 创建文件可读流
    const fileStream = fs.createReadStream(filePath)
    // 设置响应头，指定文件类型和大小等信息
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    // ctx.set('Content-Disposition', 'attachment; filename=filename.ext') // 替换为实际的文件名及扩展名
    ctx.set('Content-Length', fs.statSync(filePath).size.toString())
    // 将文件流作为响应体发送
    ctx.body = fileStream
  } else {
    // 文件不存在时返回错误信息
    ctx.status = 404
    ctx.body = 'File not found'
  }
})

module.exports = router
