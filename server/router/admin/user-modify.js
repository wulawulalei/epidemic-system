// 引入bcrypt模块
const bcrypt = require('bcrypt')

const {
  users,
  validate
} = require('../../db/user')

const {
  goout
} = require('../../db/goout')

const {
  check
} = require('../../db/check')

const article = require('../../db/article')

const fs = require('fs')

const path = require('path')

const {
  noUserText,
  updateUserText
} = require('../../config/index')

module.exports = async (req, res) => {
  try {
    const {
      account,
      password,
      phone,
      address,
      authority,
      name,
      village,
      avatar
    } = req.body
    const user = await users.findOne({
      account
    })
    if (!user) {
      res.send({
        code: 400,
        message: noUserText
      })
    } else {
      var updateUser = {
        account: Number(account),
        phone,
        address: Number(address),
        name
      }
      authority && (updateUser.authority = Number(authority))
      password && (updateUser.password = password)
      village && (updateUser.village = Number(village))
      if (avatar) {
        // 有图片则修改图片名称
        const splitUrl = avatar.split('-choose')
        const realAvatar = `${splitUrl[0]}${splitUrl[1]}`
        const uploadDir = path.join(__dirname, '../', '../', 'web')
        fs.renameSync(path.join(uploadDir, avatar), path.join(uploadDir, realAvatar))
        updateUser.avatar = realAvatar
      }
      // 密码加密
      if (password) {
        await validate(updateUser)
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)
        // 将用户添加到数据库中
        await users.updateOne({
          account
        }, {
          ...updateUser,
          password: bcryptPassword
        })
      } else {
        // 将用户添加到数据库中
        await users.updateOne({
          account
        }, {
          ...updateUser,
          password: user.password
        })
      }
      // 修改所有的外出申请信息
      const gooutList = await goout.findOne({
        account
      })
      gooutList && await goout.updateMany({
        account
      }, {
        $set: {
          name,
          phone,
          address: Number(address)
        }
      })
      const checkList = await check.findOne({
        account
      })
      checkList && await check.updateMany({
        account
      }, {
        $set: {
          name,
          phone,
          address: Number(address)
        }
      })
      // 修改所有的文章信息
      const articleList = await article.findOne({
        account
      })
      articleList && await article.updateMany({
        account
      }, {
        $set: {
          author: name,
          avatar: updateUser.avatar
        }
      })
      res.send({
        code: 200,
        message: updateUserText
      })
    }
  } catch (error) {
    res.send({
      code: 400,
      message: error.message
    })
  }
}
