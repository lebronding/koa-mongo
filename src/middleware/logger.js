const logger = require('../utils/logger')
const moment = require('moment')

module.exports = () => async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const errorContext = ctx.errorContext
  const ip = ctx.request.header['x-real-ip'] || ctx.ip
  if (errorContext) {
    logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}|${ip}|${errorContext.statusCode || 5001}|${ms}|${ctx.url}|${ctx.errorContext.stack || ctx.errorContext.returnMsg}`)
  } else {
    logger.info(`${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}|${ip}|${ctx.status}|${ms}|${ctx.url}`)
  }

  ctx.set('X-Response-Time', `${ms}ms`)
}