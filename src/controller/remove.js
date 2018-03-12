const { deleteData } = require('../service/mongoService')

module.exports = ctx => {
    const { author } = ctx.query
    deleteData('author', {author: author})
    ctx.body = 'remove'
} 