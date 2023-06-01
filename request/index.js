const axios = require('axios')
const service = axios.create({
  baseURL: '',
  withCredentials: true, // 允许携带 cookie
  timeout: 50000 // 请求超时时间
})
// request 拦截器
service.interceptors.request.use(
  config => {
    config.headers['Token'] = 'WEEvREcwSlJHSldTTEYySCtSNGRxbG1hb2JrL1M3WmduTGtIYXJLd0xTcz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4ggI8Fm4gTkoUKaID8j8gFw!!'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    const errMsg = error.toString()
    const code = errMsg.substr(errMsg.indexOf('code') + 5)
    return Promise.reject(error)
  }
)
const fetch = (method, url, data = {}, config) => {
  config = config || {}
  config.method = method
  config.url = url
  method.toLocaleLowerCase() === 'get'
    ? (config['params'] = data)
    : method.toLocaleLowerCase() === 'delete'
      ? (config['params'] = data)
      : (config['data'] = data)
  return service(config).then(function(res) {
    return res.data
  })
}
const postAction = (url, data = {}, config) => {
  return fetch('post', url, data, config)
}
const generateUuid = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}

async function sendRequests() {
  const url = 'https://x.cnki.net/readApi/api/v1/note?tableName=CJFDTOTAL&dbCode=CJFD&fileCode=JSJA202212026&topic=f73a4683-01aa-4bf7-9a40-4d1ac9d8f15a&fsType=1&signStr=&from=ReadingHistory'
  const ids = []
  let index = 0
  while (index < 20) {
    const id = generateUuid()
    const data = {
      'appId': 'CRSP_BASIC_PSMC',
      'id': id,
      'threadId': id,
      'sourceId': 'CJFD|JSJA202212026',
      'paragraphId': 'CJFD|JSJA202212026_h1_3-P860',
      'sectionId': 'CJFD|JSJA202212026_h1_3',
      'title': '%E9%9D%A2%E5%90%91%E6%B7%B1%E5%BA%A6%E5%8D%B7%E7%A7%AF%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%E7%9A%84%E5%B0%8F%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%AE%97%E6%B3%95%E7%BB%BC%E8%BF%B0',
      'quote': '%E6%AD%A3%E8%B4%9F%E6%A0%B7',
      'startOffset': 210,
      'endOffset': 213,
      'type': 4,
      'noteColor': 'rgb(255,136,0)',
      'noteOpacity': '1',
      'lineType': 0,
      'lineWidth': '2px',
      'extension': '{}'
    }
    postAction(url, data).then(rs => {
      console.log(rs?.content?.note?.id)
    })
    index++
  }
  console.log(ids)
}

sendRequests()
