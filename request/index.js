const axios = require('axios')
const service = axios.create({
  baseURL: '',
  withCredentials: true, // 允许携带 cookie
  timeout: 50000 // 请求超时时间
})
// request 拦截器
service.interceptors.request.use(
  config => {
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

