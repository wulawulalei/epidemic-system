const express = require('express')

const user = express.Router()

// 获取疫情数据
user.get('/EPID', require('./user/epid'))

module.exports = user
