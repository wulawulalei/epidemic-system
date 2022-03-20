const webToken = require('./token')

const { users } = require('../db/user')

const { noUserText, noUserCode, ultraVires, tokenExpireCode, tokenExpireText } = require('../config/index')

const check = async (req, res, next) => {
  try {
    const result = webToken.verify(req.body.token)
    console.log(req.baseUrl)
    if (result) {
      const user = await users.findOne({ account: result.message })
      if (!user) {
        // 在user页面时重定向到login页面
        if (req.baseUrl === '/user') {
          res.send({
            code: noUserCode,
            message: noUserText
          })
        } else {
        // 在管理后台则报错
          res.send({
            code: 400,
            message: noUserText
          })
        }
      } else {
        if (user.authority === 0 && req.baseUrl === '/admin') {
        // 当token信息为用户时但是请求的页面是在admin,需要重定向到user
          res.send({
            code: ultraVires,
            identity: 0
          })
        } else if (user.authority === 1 && req.baseUrl === '/user') {
        // 当token信息为管理员时但是请求的页面是在user,需要重定向到admin
          res.send({
            code: ultraVires,
            identity: 1
          })
        } else {
          next()
        }
      }
    } else {
      res.send({
        code: tokenExpireCode,
        message: tokenExpireText
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
module.exports = check
