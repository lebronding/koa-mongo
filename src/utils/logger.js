const fs = require('fs')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const moment = require('moment')
const { LOGGER_PATH } = require('../config');

(function initLogDir () {
  const path = LOGGER_PATH
  fs.exists(path, (exists) => {
    if (!exists) {
      fs.mkdir(path, (err) => {
        if (err) {
          console.log('log文件夹建立失败', err)
        }
      })
    }
  })
})()

const dateFormat = function () {
  return moment().format('YYYY-MM-DD HH:mm:ss:SSS')
}

const allLoggerTransport = new DailyRotateFile({
  name: 'all',
  filename: `${LOGGER_PATH}/.log`,
  timestamp: dateFormat,
  level: 'silly',
  colorize: true,
  maxsize: 1024 * 1024 * 10,
  datePattern: 'access.yyyy-MM-dd',
  prepend: true
})

const logger = new (winston.Logger)({
  transports: [
    allLoggerTransport
  ]
})

module.exports = logger