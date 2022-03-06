const { users } = require('../../db/user')

const article = require('../../db/article')

const { goout } = require('../../db/goout')

const { check } = require('../../db/check')

module.exports = async (req, res) => {
  try {
    const userNum = await users.find()
    const articleNum = await article.find()
    const gooutNum = await goout.find()
    const checkNum = await check.find()
    res.send({
      code: 200,
      data: {
        user: userNum.length,
        article: articleNum.length,
        goout: gooutNum.length,
        check: checkNum.length
      }
    })
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
