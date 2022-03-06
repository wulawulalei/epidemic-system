import request from '@/utils/request'

const rPost = request.post

// 页面跳转拦截器
export const beforeEnter = (data) => rPost('/login/beforeEnter')

// 登陆
export const loginSystem = (data) => rPost('/login', data)

// 注册
export const register = (data) => rPost('/login/register', data)
