const article = require('../../db/article')

const {
  users
} = require('../../db/user')

const path = require('path')

const fs = require('fs')

const {
  addArticleText, hasArticle
} = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const {
      title,
      author,
      cover,
      content,
      account
    } = req.body
    const articleResult = await article.findOne({
      title
    })
    if (!articleResult) {
      const user = await users.findOne({
        account
      })
      var addArticle = {
        title,
        author,
        content,
        account,
        read: 0
      }
      user.avatar && (addArticle.avatar = user.avatar)
      if (cover) {
        // 有图片则修改图片名称
        const splitUrl = cover.split('-choose')
        const realCover = `${splitUrl[0]}${splitUrl[1]}`
        const uploadDir = path.join(__dirname, '../', '../', 'web')
        fs.renameSync(path.join(uploadDir, cover), path.join(uploadDir, realCover))
        addArticle.cover = realCover
      }
      await article.create(addArticle)
      res.send({
        code: 200,
        message: addArticleText
      })
    } else {
      res.send({
        code: 400,
        message: hasArticle
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
