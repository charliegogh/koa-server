const router = require('koa-router')()
const path = require('path')
const { Workbook, Topic, Marker, Zipper } = require('xmind')
const fs = require('fs')
// xmind
router.get('/xmind', async(ctx, next) => {
  const fileExt = '.xmind' // 文件后缀
  const fileName = '.xmind' // 文件名（不包含后缀）
  const [workbook, marker] = [new Workbook(), new Marker()]
  const topic = new Topic({ sheet: workbook.createSheet('sheet title', 'Central Topic') })
  const zipper = new Zipper({ path: path.resolve(__dirname, '../../files'), workbook, filename: fileName })

  // topic.on() default: `central topic`
  topic.add({ title: 'main topic 1' })

  topic
    .on(topic.cid(/* In default, the componentId is last element*/))

  // add subtopics under `main topic 1`
    .add({ title: 'subtopic 1' })
    .add({ title: 'subtopic 2' })

  // attach text note to `main topic 1`
    .note('This is a note attached on main topic 1')

  // attach a marker flag to `subtopic 1`
    .on(topic.cid('subtopic 1'))
    .marker(marker.week('fri'))

  // add a component of the summary that contains two sub topics
    .summary({ title: 'subtopic summary', edge: topic.cid('subtopic 2') })

  const rs = await zipper.save()
  console.log(rs, '~~~~~~~~')
  const filePath = path.resolve(__dirname, `../../files/xmind.xmind`) // 文件路径
  const isFileExists = fs.existsSync(filePath)
  if (isFileExists) {
    const fileStream = fs.createReadStream(filePath)
    ctx.set('Content-disposition', `attachment; filename=${fileName}${fileExt}`)
    ctx.set('Content-type', 'application/octet-stream')
    ctx.body = fileStream
  }
})
module.exports = router.routes()
