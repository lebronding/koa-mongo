const { resolve } = require('path')

// 环境变量
exports.PORT = 3144
const IS_PROD = exports.IS_PROD = process.env.NODE_ENV ==='production'
const IS_TEST = exports.IS_TEST = process.env.NODE_ENV ==='test'
const IS_BUILD = exports.IS_BUILD = IS_PROD || IS_TEST

// 日志
exports.LOGGER_PATH = IS_BUILD ? '/data/logs/koa_mongo/' : resolve(__dirname, '../log')