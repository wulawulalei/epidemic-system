const { goout } = require('../../db/goout')

const { users } = require('../../db/user')

const webtoken = require('../../module/token')

const { noUserText, tokenExpireText, tokenExpireCode } = require('../../config/index')

// 导入数据库分页模块
const mongoosepage = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 判断用户是普通用户还是管理员
  try {
    const { page, limit, token, personal, search } = req.body
    const result = webtoken.verify(token)
    // 判断token是否过期
    if (result) {
      const user = await users.findOne({ account: result.message })
      // 判断用户是否存在
      if (user && user.authority === 0) {
        if (personal) {
          const list = await goout.find()
          if (list.length > 0) {
            const adopt = list.filter(item => {
              return item.status === 1
            })
            if (adopt.length > 0) {
              res.send({
                code: 200,
                data: adopt[adopt.length - 1]
              })
            } else {
              const applying = list.filter(item => {
                return item.status === 0
              })
              if (applying.length > 0) {
                res.send({
                  code: 200,
                  data: applying[applying.length - 1]
                })
              } else {
                const refuse = list.filter(item => {
                  return item.status === 2
                })
                res.send({
                  code: 200,
                  data: refuse[refuse.length - 1]
                })
              }
            }
          } else {
            res.send({
              code: 200,
              data: {
                name: user.name,
                avatar: user.avatar || ''
              }
            })
          }
        } else {
          const list = await mongoosepage(goout).find({ account: user.account }).page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: list.records,
              total: list.total
            }
          })
        }
      } else if (user && user.authority === 1) {
        if (search) {
          const reg = new RegExp('^.*' + search + '.*$', 'i')
          const result = await mongoosepage(goout).find({ name: reg, status: 0 }).page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: result.records,
              total: result.total
            }
          })
        } else {
          const list = await mongoosepage(goout).find({ status: 0 }).page(page).size(limit).exec()
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
          message: noUserText
        })
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
