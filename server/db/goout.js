// 引入mongoose模块
const mongoose = require('mongoose')

// 引入joi模块
const joi = require('joi')

// 设置外出集合规则
const rule = new mongoose.Schema({
  // 账号
  account: {
    type: Number,
    require: true,
    minlength: 6,
    maxlength: 15
  },
  // 名称
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
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
  result: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  status: {
    type: Number
  },
  failResult: {
    type: String
  }
})

// 使用集合规则创建集合
const goout = mongoose.model('goout', rule, 'goout')

// 建立规则
function validate (check) {
  const schema = joi.object({
    name: joi.string().min(2).max(20).required().error(new Error('用户名不符合要求')),
    account: joi.number().integer().min(100000).max(999999999999999).required().error(new Error('账号不符合要求')),
    phone: joi.string().regex(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).required().error(new Error('手机号不符合要求')),
    address: joi.number().integer().valid(0, 1, 2, 3).required().error(new Error('住址不符合要求')),
    time: joi.string().required().error(new Error('返区时间不符合要求')),
    result: joi.string().required().error(new Error('外出原因不符合要求')),
    status: joi.number().integer().valid(0, 1, 2).required().error(new Error('外出状态不符合要求')),
    failResult: joi.string().optional()
  })
  return schema.validateAsync(check)
}

module.exports = { goout, validate }
