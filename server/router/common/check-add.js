const { check, validate } = require('../../db/check')

const { users } = require('../../db/user')

module.exports = async (req, res) => {
  try {
    const { account, time, result } = req.body
    const user = await users.findOne({ account })
    if (!user) {
      res.send({
        code: 400,
        message: '该用户不存在'
      })
    } else {
      const { name, address, phone } = user
      const addCheck = { name, account, phone, address, time, result }
      await validate(addCheck)
      await check.create(addCheck)
      res.send({
        code: 200,
        message: `成功添加${name}的核酸检测记录`
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
