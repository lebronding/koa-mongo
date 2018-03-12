const moment = require('moment')
const { saveData } = require('../service/mongoService')

module.exports = ctx => {
    const { author } = ctx.query
    const data = {
        author: author,
        time: moment().format('YYYY-MM-DD HH:mm:ss:SSS')
    }
    saveData('author', data)
    ctx.body = 'report'
} 