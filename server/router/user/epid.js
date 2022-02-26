const request = require('request')

module.exports = async (req, res) => {
  request({
    url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }, function (error, response, body) {
    const data = JSON.parse(body)
    if (!error && data.code === 10000) {
      res.send(body)
    } else {
      res.send({ code: 400, message: '请求失败' })
    }
  })
}
