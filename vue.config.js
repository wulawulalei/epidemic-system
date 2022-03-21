const titles = require('./titles.js')
const glob = require('glob')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pages = {}
const isProduction = process.env.NODE_ENV == 'production'

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
  publicPath: isProduction ? './' : '',
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
    config.devtool(isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map')
    config.plugins.delete('named-chunks')
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })

    // scss
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )

    // img
    config.module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  },
  configureWebpack: () => {
    return {
      plugins: [new BundleAnalyzerPlugin()]
    }
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
