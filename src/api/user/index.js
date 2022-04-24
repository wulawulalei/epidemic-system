import request from '@/utils/request'

const rPost = request.post

const rGet = request.get

// 获取疫情数据
export const epidemic = (params) => rGet('/user/EPID', { params })

// 添加外出记录
export const addapply = (data) => rPost('/user/apply-add', data)

// 获取本人外出记录
export const getapply = (data) => rPost('/user/apply-get', data)

// 添加核酸检测记录
export const addcheck = (data) => rPost('/user/check-add', data)

// 获取核酸检测记录
export const getcheck = (data) => rPost('/user/check-get', data)

// 获取公告列表
export const getarticle = (data) => rPost('/user/article-get', data)

// 获取个人信息
export const personal = (data) => rPost('/user/personal', data)

// 修改个人信息
export const modifyuser = (data) => rPost('/user/user-modify', data)

// 更换图片
export const avatarModify = (data) => rPost('/user/img-modify', data)
