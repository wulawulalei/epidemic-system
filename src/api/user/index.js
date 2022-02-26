import request from '@/utils/request'

// const rPost = request.post

const rGet = request.get

// 获取疫情数据
export const epidemic = (params) => rGet('/user/EPID', { params })
