const article = require('../../db/article')

const { users } = require('../../db/user')

const webtoken = require('../../module/token')

const { tokenExpireText, tokenExpireCode, addArticleText } = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const { title, author, cover, content, account, token } = req.body
    const result = webtoken.verify(token)
    if (!result) {
      res.send({
        code: tokenExpireCode,
        message: tokenExpireText
      })
    } else {
      const user = await users.findOne({ account })
      var addArticle = { title, author, content, account, read: 0 }
      user.avatar && (addArticle.avatar = user.avatar)
      cover && (addArticle.cover = cover)
      await article.create(addArticle)
      res.send({
        code: 200,
        message: addArticleText
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
