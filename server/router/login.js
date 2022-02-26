const express = require('express')

const jwToken = require('jsonwebtoken')

const login = express.Router()

// 登录
login.post('/', (req, res) => {
  console.log(req.body)
  // register为0是登录，为1是注册
  if (req.body.register === 0) {
    console.log('登录')
    res.send({
      code: 200,
      identity: 1
    })
    // identity为0时为普通用户，1为管理员
  } else if (req.body.register === 1) {
    console.log('注册')
    res.send({
      code: 200,
      identity: 0
    })
  }
})

module.exports = login
