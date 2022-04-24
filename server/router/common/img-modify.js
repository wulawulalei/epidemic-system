const fs = require('fs')

const path = require('path')

const formidable = require('formidable')

module.exports = (req, res) => {
  const uploadDir = path.join(__dirname, '../', '../', 'web', 'avatar')
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
    } else {
      const type = files.img.mimetype.split('/')[1]
      fs.renameSync(files.img.filepath, path.join(uploadDir, `${files.img.originalFilename}-choose.${type}`))
      res.send({
        code: 200,
        img: `/avatar/${files.img.originalFilename}-choose.${type}`
      })
    }
  })
}
