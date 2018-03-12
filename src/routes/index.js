const router = require('koa-router')()

const controller = require('../controller')

router.get('/report', controller.report)
router.get('/remove', controller.remove)
router.post('/find', controller.find)
router.get('/query',controller.query)

module.exports = router