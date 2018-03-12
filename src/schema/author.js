const mongoose = require('mongoose')

const author = new mongoose.Schema({
    author: {
        type: String
    },
    time: {
        type: String
    }
}, {
    toJSON: true,
    versionKey: false
})

module.exports = mongoose.model('author', author)