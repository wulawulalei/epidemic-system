const { users } = require('../../db/user')

const { goout, validate } = require('../../db/goout')

const { noUserText, addApplyText, hadApplyText } = require('../../config/index.js')

module.exports = async (req, res) => {
  try {
    const { account, result, time } = req.body
    const user = await users.findOne({ account })
    if (!user) {
      res.send({
        code: 400,
        message: noUserText
      })
    } else {
      const applyList = await goout.find({ account })
      let canApply = true
      if (applyList.length > 0) {
        for (var i = 0; i < applyList.length; i++) {
          const expire = new Date(applyList[i].time).getTime()
          const now = new Date().getTime()
          if (applyList[i].status === 0 || (applyList[i].status === 1 && expire > now)) {
            canApply = false
            break
          }
        }
      }
      if (canApply) {
        const { name, phone, address } = user
        const numberaccount = Number(account)
        const addGo = { account: numberaccount, name, phone, address, time, result, status: 0 }
        await validate(addGo)
        await goout.create(addGo)
        res.send({
          code: 200,
          message: addApplyText
        })
      } else {
        res.send({
          code: 400,
          message: hadApplyText
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
