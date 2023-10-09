const { school } = require(process.cwd() + '/models')
const router = require('koa-router')()
const axios = require('axios')
const base = '/school'
router.get(base + '/getList', async(ctx, next) => {
  try {
    const data = await school.findAll()
    // ctx.success(
    //   data
    // )
    let currentIndex = 0

    function callApi() {
      const apiUrl = `http://47.93.4.29:88/schoolDetail/${data[currentIndex].school_id}/info.json`
      axios.get(apiUrl)
        .then(response => {
          // 如果响应状态码为200，表示成功
          if (response.status === 200) {
            // 处理接口响应的数据
            console.log('接口调用成功', response.data)
            const params = response.data.data
            params.yk_feature = params?.yk_feature.length>0 && params.yk_feature.toString() || null
            school.update(
              {
                ...params
              },
              {
                where: {
                  school_id: params.school_id
                }
              }
            )
          } else {
            console.error(`接口调用失败，状态码：${response.status}`)
          }
        })
        .catch(error => {
          console.error('接口调用出错:', error)
        })
      currentIndex++
      if (currentIndex >= data.length) {
        currentIndex = 0
      }
    }
    setInterval(callApi, 15000)
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

router.get(base + '/sc', async(ctx, next) => {
  try {
    const data = await school.findAll()
    ctx.success(
      data
    )
  } catch (e) {
    ctx.fail(e)
  }
})

module.exports = router.routes()

