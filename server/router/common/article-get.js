const article = require('../../db/article')

const webtoken = require('../../module/token')

// 导入数据库分页模块
const mongoosepage = require('mongoose-sex-page')

module.exports = async (req, res) => {
  try {
    const { page, limit, id, search, token } = req.body
    const result = webtoken.verify(token)
    if (!result) {
      res.send({
        code: 400,
        message: 'token已过期'
      })
    } else {
      if (id) {
        const essay = await article.findOne({ _id: id })
        const { title, author, content, account, read, publishdate } = essay
        const readNum = read + 1
        await article.updateOne({ _id: id }, { title, author, content, account, read: readNum, publishdate })
        const result = await article.findOne({ _id: id })
        res.send({
          code: 200,
          data: result
        })
      } else {
        if (search) {
          const reg = new RegExp('^.*' + search + '.*$', 'i')
          const result = await mongoosepage(article).find({ title: reg }).page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: result.records,
              total: result.total
            }
          })
        } else {
          const result = await mongoosepage(article).find().page(page).size(limit).exec()
          res.send({
            code: 200,
            data: {
              list: result.records,
              total: result.total
            }
          })
        }
      }
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
