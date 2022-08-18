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
  // // 让每个请求携带自定义token
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken()
  // }

  // 测试用token   后台获取
  config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdCJdLCJ1c2VyX25hbWUiOiIxOTk5MTF8fHlhdG9yb3x8MSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2NjA5MjkyMTAsImF1dGhvcml0aWVzIjpbImlmIG5lZWQgLGkgY2FuIGRvIGl0Il0sImp0aSI6ImJiMTllOGE0LTMyYzQtNDQ5YS1hZWRkLTk3ZmMwZTVlMTNmNyIsImNsaWVudF9pZCI6IndlYi1jbGllbnQifQ.hi83yQJZn7Xr7cDtXZiYzR3WVCb0DUx61x4FKOQ9OBY'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code 抛错 可结合自己业务进行修改
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
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
