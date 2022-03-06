const { check } = require('../../db/check')

const { users } = require('../../db/user')

const webtoken = require('../../module/token')

// 导入数据库分页模块
const mongoosepage = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 判断用户是普通用户还是管理员
  try {
    console.log(req.body)
    const { page, limit, search, token } = req.body
    const result = webtoken.verify(token)
    // 判断token是否过期
    if (result) {
      const user = await users.findOne({ account: result.message })
      if (user && user.authority === 0) {
        const list = await mongoosepage(check).find({ account: user.account }).page(page).size(limit).exec()
        res.send({
          code: 200,
          data: {
            list: list.records,
            total: list.total
          }
        })
      } else if (user && user.authority === 1) {
        if (search) {
          const reg = new RegExp('^.*' + search + '.*$', 'i')
          const list = await mongoosepage(check).find({ name: reg }).page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: list.records,
              total: list.total
            }
          })
        } else {
          const list = await mongoosepage(check).find().page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: list.records,
              total: list.total
            }
          })
        }
      } else {
        res.send({
          code: 400,
          message: '该用户不存在'
        })
      }
    } else {
      res.send({
        code: 400,
        message: 'token已过期'
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
