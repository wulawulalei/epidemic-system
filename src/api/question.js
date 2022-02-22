import request from '@/utils/request'

const rPost = request.post

const rGet = request.get

// 登陆
export const loginSystem = (data) => rPost('/login', data)

// 获取疫情数据
export const epidemic = (params) => rGet('/EPID/ug/api/wuhan/app/data/list-total', { params })
