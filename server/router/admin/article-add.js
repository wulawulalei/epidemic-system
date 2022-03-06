const article = require('../../db/article')

const { users } = require('../../db/user')

const webtoken = require('../../module/token')

module.exports = async (req, res) => {
  try {
    const { title, author, cover, content, account, token } = req.body
    const result = webtoken.verify(token)
    if (!result) {
      res.send({
        code: 400,
        message: 'token已过期'
      })
    } else {
      const user = await users.findOne({ account })
      var addArticle = { title, author, content, account, read: 0 }
      user.avatar && (addArticle.avatar = user.avatar)
      cover && (addArticle.cover = cover)
      await article.create(addArticle)
      res.send({
        code: 200,
        message: '公告添加成功'
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
