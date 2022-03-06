// 引入mongoose模块
const mongoose = require('mongoose')

// 引入joi模块
const joi = require('joi')

// 创建集合规则
const rule = new mongoose.Schema({
// 姓名
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },
  // 账号
  account: {
    type: Number,
    require: true,
    minlength: 6,
    maxlength: 15,
    unique: true
  },
  // 头像
  avatar: {
    type: String
  },
  // 密码
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  // 住址
  address: {
    type: Number,
    require: true
  },
  // 电话号码
  phone: {
    type: String,
    require: true
  },
  // 权限
  authority: {
    type: Number,
    require: true,
    default: 0
  },
  // 管理的区号
  village: {
    type: Number
  }
})

// 使用规则创建集合
const users = mongoose.model('users', rule, 'users')

// 建立用户规则
function validate (user) {
  const schema = joi.object({
    name: joi.string().min(2).max(20).required().error(new Error('用户名不符合要求')),
    account: joi.number().integer().min(100000).max(999999999999999).required().error(new Error('账号不符合要求')),
    avatar: joi.string().optional().error(new Error('头像不符合要求')),
    password: joi.string().regex(/^\w{6,20}$/).required().error(new Error('密码不符合要求')),
    phone: joi.string().regex(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).required().error(new Error('手机号不符合要求')),
    address: joi.number().integer().valid(0, 1, 2, 3).required().error(new Error('住址不符合要求')),
    authority: joi.number().integer().valid(0, 1).required().error(new Error('权限不符合要求')),
    village: joi.number().integer().valid(0, 1, 2, 3).optional().error(new Error('管理区号不符合要求'))
  })
  return schema.validateAsync(user)
}

module.exports = { users, validate }
