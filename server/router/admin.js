const express = require('express')

const admin = express.Router()

// 验证token
admin.post('/beforeEnter', require('../module/intercept'))

// 首页信息
admin.post('/dashboard', require('./admin/dashboard'))

// 获取疫情数据
admin.get('/EPID', require('./common/epid'))

// 获取用户信息
admin.post('/user-get', require('./admin/user-get'))

// 添加用户
admin.post('/user-add', require('./common/user-add'))

// 修改用户信息
admin.post('/user-modify', require('./admin/user-modify'))

// 删除用户
admin.post('/user-delete', require('./admin/user-delete'))

// 获取全部外出记录
admin.post('/apply-get', require('./common/apply-get'))

// 添加外出记录
admin.post('/apply-add', require('./common/apply-add'))

// 处理外出记录
admin.post('/apply-handle', require('./admin/apply-handle'))

// 添加核酸检测记录
admin.post('/check-add', require('./common/check-add'))

// 获取核酸检测记录
admin.post('/check-get', require('./common/check-get'))

// 获取文章列表
admin.post('/article-get', require('./common/article-get'))

// 阅读文章
admin.post('/article-read', require('./common/article-read'))

// 发布文章
admin.post('/article-add', require('./admin/article-add'))

// 获取个人信息
admin.post('/personal', require('./common/personal-get'))

module.exports = admin
