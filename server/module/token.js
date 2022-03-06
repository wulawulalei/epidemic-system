const jwt = require('jsonwebtoken')

const { signature, expiresIn } = require('../config')

module.exports = {
  create (message) {
    const token = jwt.sign({ message }, signature, { expiresIn })
    return token
  },
  verify (token) {
    try {
      const result = jwt.verify(token, signature)
      return result
    } catch {
      return false
    }
  }
}
