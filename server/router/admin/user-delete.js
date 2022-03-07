// 导入数据库用户模块
const { users } = require('../../db/user')

const { noUserText, deleteUserText } = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const { account } = req.body
    const user = await users.findOne({ account })
    if (!user) {
      res.send({
        code: 400,
        message: noUserText
      })
    } else {
      await users.findOneAndDelete({ account })
      res.send({
        code: 200,
        message: deleteUserText
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
