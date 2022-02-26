import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
import {
  Message
} from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.url !== '/login') {
      if (config.method === 'post') {
        config.data = qs.stringify({
          ...config.data
        })
      } else if (config.method === 'get') {
        config.params = {
          ...config.params
        }
      }
    } else {
      config.data = qs.stringify({
        ...config.data
      })
    }
    return config
  },
  (error) => {
    console.log(error)
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
