// 导入数据库用户模块
const { users } = require('../../db/user')

const article = require('../../db/article')

const webtoken = require('../../module/token')

module.exports = async (req, res) => {
  try {
    const { token } = req.body
    const fruit = webtoken.verify(token)
    const account = fruit.message
    const result = await users.findOne({ account })
    // 当用户为管理员时
    if (result.authority) {
      const articles = await article.find({ account })
      const readNum = articles.reduce((acc, item) => {
        acc += item.read
        return acc
      }, 0)
      res.send({
        code: 200,
        data: {
          personal: result,
          articlenum: articles.length,
          readNum
        }
      })
    } else {
      res.send({
        code: 200,
        data: result
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
