const { goout, validate } = require('../../db/goout')

const { noApplyText } = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const { _id, status, failResult } = req.body
    const record = await goout.findOne({ _id })
    if (!record) {
      res.send({
        code: 400,
        message: noApplyText
      })
    } else {
      const { name, account, phone, address, time, result } = record
      var addGo = { name, account, phone, address, time, result }
      addGo.status = Number(status)
      failResult && (addGo.failResult = failResult)
      await validate(addGo)
      await goout.updateOne({ _id }, addGo)
      res.send({
        code: 200,
        message: addGo.status === 1 ? `${addGo.name}的申请通过审核` : `成功拒绝${addGo.name}的外出申请`
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
