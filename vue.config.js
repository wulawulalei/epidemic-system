const titles = require('./titles.js')
const glob = require('glob')
const path = require('path')
const merge = require('webpack-merge')
const pages = {}

glob.sync('./src/pages/**/app.js').forEach((entry) => {
  const chunk = entry.split('./src/pages/')[1].split('/app.js')[0]
  titles[chunk] &&
    (pages[chunk] = {
      entry,
      template: 'public/index.html',
      title: titles[chunk],
      chunks: ['chunk-vendors', 'chunk-common', chunk],
      filename: chunk + '.html'
    })
})
module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? './' : '',
  pages,
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    port: 8080,
    proxy: {
      '/API': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '/API': ''
        }
      },
      '/EPID': {
        target: 'https://c.m.163.com',
        changeOrigin: true,
        pathRewrite: {
          '/EPID': ''
        }
      }
    }
  },
  outputDir: './server/web',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    // build optimize
    config.plugins.delete('named-chunks')

    // resolveLoader
    config.resolveLoader.modules
      .add(path.resolve(__dirname, './build/loader'))
      .end()

    // scss
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )

    // svg
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()

    // img
    config.module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) =>
        merge(options, {
          publicPath:
            process.env.NODE_ENV === 'production' ? '/templates/pages/' : '/'
        })
      )
      .end()
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/style/abstracts/*.scss')]
    })
}
