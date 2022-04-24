const fs = require('fs')
const path = require('path')

class moveBuildFilePlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.done.tap('moveBuildFilePlugin', () => {
      // 记录删除dist和修改名称所用时间
      console.time('build and rename')
      // 先删除dist目录
      rmdir(this.options.objectDir, (error) => {
        if (error) {
          console.log(error)
          return
        }
        // 删除dist后，修改新打包生成的build文件为dist
        fs.renameSync(this.options.outputDir, this.options.objectDir)
        console.timeEnd('build and rename')
        console.log('build and rename end')
      })
    })
  }
}

function rmdir (filePath, callback) {
  // 先判断当前filePath的类型(文件还是文件夹,如果是文件直接删除, 如果是文件夹, 去取当前文件夹下的内容, 拿到每一个递归)
  fs.stat(filePath, function (err, stat) {
    if (err) return console.log(err)
    if (stat.isFile()) {
      fs.unlink(filePath, callback)
    } else {
      if (!/user-avatar/.test(filePath)) {
        fs.readdir(filePath, function (err, data) {
          if (err) return console.log(err)
          const dirs = data.map((dir) => path.join(filePath, dir))
          let index = 0
          !(function next () {
            // 此处递归删除掉所有子文件 后删除当前 文件夹
            if (index === dirs.length) {
              fs.rmdir(filePath, callback)
            } else {
              rmdir(dirs[index++], next)
            }
          })()
        })
      } else {
        console.log(filePath, 1)
      }
    }
  })
}

module.exports = moveBuildFilePlugin
