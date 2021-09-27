/*
 * @Descripttion:
 * @Date: 2021-06-25 14:53:32
 * @LastEditTime: 2021-09-27 17:02:45
 */

module.exports = {
  publicPath: '.',
  devServer: {
    // 跨域设置
    proxy: {
      '/': {
        target: 'http://47.97.73.107:8116',
        // target: 'http://47.98.165.99:6048',
        // target: 'https://draw.miyahub.com',
        changeOrigin: true // 设置同源 默认false，是否需要改变原始主机头为目标URL
      }
    }
  }
}
