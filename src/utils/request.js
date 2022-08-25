import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store/index'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  
  //设置请求表头
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }

  //config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdCJdLCJ1c2VyX25hbWUiOiJ6c21qfHx6c21qfHw0Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY2MTU2OTUzOSwiYXV0aG9yaXRpZXMiOlsiaWYgbmVlZCAsaSBjYW4gZG8gaXQiXSwianRpIjoiNDc4YTM2ZGQtOTA4OC00ZGJkLWI1NDEtMDE3YThjY2ZlZjIyIiwiY2xpZW50X2lkIjoid2ViLWNsaWVudCJ9.rknTUyHieLNwhfgqBI0GZWagSgCnVKZRxs_aIetW-sE';

  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code 抛错 
  */
    const res = response.data
    if (res.resultCode === 404) {
      Message({
        message: res.resultText,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.resultCode === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
       // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
