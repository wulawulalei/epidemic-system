import request from '@/utils/request'

const rPost = request.post

// const rGet = request.get

// 登陆
export const loginSystem = (data) => rPost('/login', data)
