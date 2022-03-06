// 导入数据库用户模块
const { users } = require('../../db/user')

module.exports = async (req, res) => {
  try {
    const { account } = req.body
    const user = await users.findOne({ account })
    if (!user) {
      res.send({
        code: 400,
        message: '没有该用户'
      })
    } else {
      await users.findOneAndDelete({ account })
      res.send({
        code: 200,
        message: '成功删除该用户'
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
