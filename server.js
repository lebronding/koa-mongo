const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const logger = require('./src/middleware/logger')

// mongo参数
const options = {
    user: 'monitor',
    pass: 'monitor@8pig',
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 4,
    bufferMaxEntries: 0,
    autoReconnect: true
}

mongoose.connect('',options)

const app = new Koa()

// 解析请求体
app.use(bodyParser())
// 打印日志
app.use(logger())

// 引入路由分发
const router = require('./src/routes')
app.use(router.routes())

app.listen(3155)