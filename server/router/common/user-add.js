const webtoken = require('../../module/token')

// 引入bcrypt模块
const bcrypt = require('bcrypt')

const { users, validate } = require('../../db/user')

const { addUserText, hadUser } = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const { account, password, phone, address, authority, name, village, inLogin } = req.body
    const user = await users.findOne({ account })
    if (user) {
      res.send({
        code: 400,
        message: hadUser
      })
    } else {
      var addUser = { account: Number(account), password, phone, address: Number(address), name, authority: 0 }
      authority && (addUser.authority = Number(authority))
      village && (addUser.village = Number(village))
      await validate(addUser)
      // 密码加密
      const salt = await bcrypt.genSalt(10)
      const bcryptPassword = await bcrypt.hash(password, salt)
      // 将用户添加到数据库中
      await users.create({ ...addUser, password: bcryptPassword })
      if (inLogin) {
        const token = webtoken.create(account)
        res.send({
          code: 200,
          identity: authority || 0,
          token
        })
      } else {
        res.send({
          code: 200,
          message: addUserText
        })
      }
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
