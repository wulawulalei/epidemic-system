import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || undefined
    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data,
        token
      })
    } else if (config.method === 'get') {
      config.params = qs.stringify({
        ...config.params,
        token
      })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
// 请求后如果返回token过期的话则跳转到登录页面
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 10000 || res.code === 200) {
      return res
    } else if (res.code === 600) {
      window.location.pathname = '/login.html'
    } else if (res.code === 700) {
      if (res.identity === 0) {
        window.location.pathname = '/user.html'
      } else if (res.identity === 1) {
        window.location.pathname = '/admin.html'
      }
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
