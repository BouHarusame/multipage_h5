let pageMethod = require('./util/getPages.js')
const pages = pageMethod.pages()
module.exports = {
  pages,
  publicPath: process.env.NODE_ENV === 'production'
    ? './dist/'
    : '/'
}
