// 引入mongoose模块
const mongoose = require('mongoose')

// 设置文章集合规则
const rule = new mongoose.Schema({
  title: {
    reqiure: true,
    type: String,
    minlength: 6,
    maxlength: 20
  },
  author: {
    require: true,
    type: String
  },
  publishdate: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  cover: {
    type: String
  },
  content: {
    type: String,
    require: true
  },
  account: {
    type: Number,
    require: true
  },
  read: {
    type: Number
  }
})

// 使用集合规则创建集合
const article = mongoose.model('article', rule, 'article')

module.exports = article
