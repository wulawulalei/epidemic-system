import request from '@/utils/request'

const rPost = request.post

const rGet = request.get

// 获取首页数据
export const dashboard = (data) => rPost('/admin/dashboard', data)

// 获取疫情数据
export const epidemic = (params) => rGet('/admin/EPID', { params })

// 获取用户信息
export const getuser = (data) => rPost('/admin/user-get', data)

// 添加用户
export const adduser = (data) => rPost('/admin/user-add', data)

// 修改用户信息
export const usermodify = (data) => rPost('/admin/user-modify', data)

// 删除用户
export const deleteuser = (data) => rPost('/admin/user-delete', data)

// 获取全部外出记录
export const getapply = (data) => rPost('/admin/apply-get', data)

// 添加外出记录
export const addapply = (data) => rPost('/admin/apply-add', data)

// 处理外出记录
export const handleapply = (data) => rPost('/admin/apply-handle', data)

// 添加核酸检测记录
export const addcheck = (data) => rPost('/admin/check-add', data)

// 获取核酸检测记录
export const getcheck = (data) => rPost('/admin/check-get', data)

// 获取文章列表
export const getarticle = (data) => rPost('/admin/article-get', data)

// 发布文章
export const addarticle = (data) => rPost('/admin/article-add', data)

// 获取个人信息
export const personal = (data) => rPost('/admin/personal', data)
