// 引入express框架
const express = require('express')

// 引入处理路径模块
const path = require('path')

// 创建服务器
const app = express()

require('./db/connect')

// 引入body-parser模块处理post请求参数
const bodyPaser = require('body-parser')

// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }))

/**
 * 全系统允许跨域处理 这段配置要再new出express实例的时候就要设置了，放在所有的api前面，不然没有效果
 */
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-A11ow-origin', 'localhost:8080')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length,Authorization, Accept,X-Requested-with'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// 当从用户页面切换到管理员页面以及相反或者token过期时的处理
// app.get('/admin.html', require('./module/intercept'))
// app.get('/user.html', require('./module/intercept'))

// 开放静态资源
app.use(express.static(path.join(__dirname, 'web')))

// 引入路由模块
const admin = require('./router/admin')
const user = require('./router/user')
const login = require('./router/login')

// 配置路由模块路径
app.use('/admin', admin)
app.use('/user', user)
app.use('/login', login)

// 监听端口
app.listen(8080, () => {
  console.log('collecting')
})
