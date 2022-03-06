const webToken = require('./token')

const { users } = require('../db/user')

const check = async (req, res, next) => {
  const result = webToken.verify(req.body.token)
  if (result) {
    const user = await users.findOne({ account: result.message })
    if (!user) {
      res.send({
        code: 400,
        message: '没有该用户'
      })
    } else {
      res.send({
        code: 200,
        identity: user.authority
      })
    }
    next()
  } else {
    res.send({
      code: 200
    })
  }
}
module.exports = check
