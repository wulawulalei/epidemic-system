const webToken = require('./token')

const { users } = require('../db/user')

const { noUserText, tokenExpireCode, tokenExpireText } = require('../config/index')

const check = async (req, res) => {
  const result = webToken.verify(req.body.token)
  if (result) {
    const user = await users.findOne({ account: result.message })
    if (!user) {
      res.send({
        code: 400,
        message: noUserText
      })
    } else {
      res.send({
        code: 200,
        identity: user.authority,
        username: user.name,
        avatar: user.avatar || null,
        account: user.account
      })
    }
  } else {
    res.send({
      code: tokenExpireCode,
      message: tokenExpireText
    })
  }
}
module.exports = check
