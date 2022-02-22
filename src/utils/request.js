import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
// import {
//   Message
// } from 'element-ui'

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
    config.params = {
      ...config.params
    }

    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data
      })
    } else if (config.method === 'get') {
      config.params = {
        ...config.params
      }
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 10000) {
      return res
    } else if (res.code !== 10000 || (res.code !== 200 && res.status !== 'ok')) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
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
