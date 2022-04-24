const express = require('express')

const user = express.Router()

// 验证token
user.post('/*', require('../module/requireIntercept'))

// 获取疫情数据
user.get('/EPID', require('./common/epid'))

// 添加外出记录
user.post('/apply-add', require('./common/apply-add'))

// 获取本人外出记录
user.post('/apply-get', require('./common/apply-get'))

// 添加核酸检测记录
user.post('/check-add', require('./common/check-add'))

// 获取核酸检测记录
user.post('/check-get', require('./common/check-get'))

// 获取公告列表
user.post('/article-get', require('./common/article-get'))

// 获取个人信息
user.post('/personal', require('./common/personal-get'))

// 修改个人信息
user.post('/user-modify', require('./admin/user-modify'))

// 更换图片
user.post('/img-modify', require('./common/img-modify'))

module.exports = user
