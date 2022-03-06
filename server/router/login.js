const express = require('express')

const webtoken = require('../module/token')

// 引入bcrypt模块
const bcrypt = require('bcrypt')

const { users } = require('../db/user')

const login = express.Router()

// 验证token
login.post('/beforeEnter', require('../module/intercept'))

// 登录
login.post('/', async (req, res) => {
  // register为0是登录，为1是注册
  try {
    const { account, password } = req.body
    const user = await users.findOne({ account: account })
    if (user) {
      const test = await bcrypt.compare(password, user.password)
      if (test) {
        const token = webtoken.create(account)
        res.send({
          code: 200,
          identity: user.authority,
          token
        })
      } else {
        res.send({
          code: 400,
          message: '密码错误'
        })
      }
    } else {
      res.send({
        code: 400,
        message: '该账号不存在'
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
})

// 注册
login.post('/register', require('./common/user-add'))

module.exports = login
