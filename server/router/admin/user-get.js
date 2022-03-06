// 导入数据库用户模块
const { users } = require('../../db/user')

// 导入数据库分页模块
const mongoosepage = require('mongoose-sex-page')

module.exports = async (req, res) => {
  try {
    const { page, limit, search } = req.body
    if (search) {
      const reg = new RegExp('^.*' + search + '.*$', 'i')
      const result = await mongoosepage(users).find({ name: reg }).page(page).size(limit).exec()
      res.send({
        code: 200,
        data: {
          list: result.records,
          total: result.total
        }
      })
    } else {
      const result = await mongoosepage(users).find().page(page).size(limit).exec()
      res.send({
        code: 200,
        data: {
          list: result.records,
          total: result.total
        }
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
