// 引入mongoose模块
const mongoose = require('mongoose')

const { username, pwd, databaseName, host, port } = require('../config')

mongoose.connect(`mongodb://${username}:${pwd}@${host}:${port}/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('数据库连接成功') },
    err => { console.log(`${err.message},数据库连接失败`) })
