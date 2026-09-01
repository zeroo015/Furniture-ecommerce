const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 部署到 https://<USERNAME>.github.io/<REPO>
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Furniture-ecommerce/'
    : '/'
})
