const express = require('express')

const admin = express.Router()

// 获取疫情数据
admin.get('/EPID', require('./admin/epid'))

module.exports = admin
