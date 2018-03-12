const { findData } = require('../service/mongoService')

module.exports = async (ctx) => {
    const { author, start, end } = ctx.query
    const data = {
        author: author,
        time : {
            $gte : start,
            $lte : end
        }
    }
    // 去掉空值
    for (const key in data) {
        if (data[key] === undefined) {
            delete data[key]
        } else if (typeof data[key] === 'object') {
            const _data = data[key]
            for (const i in _data) {
                if ( _data[i] === undefined) {
                    delete _data[i]
                }
            }
            if (Object.keys(_data).length === 0) {
                delete data[key]
            }
        }
    }
    // 模糊查询
    data.author && (data.author = new RegExp( "" + author + ""))
    
    const _result = await findData('author', data).then(function(value){
        return value
    }) 
    const result = {}

    if (_result){
        result.ret = 0
        result.resMsg = '成功'
        result.data = _result
    } else {
        result.ret = 404;
        result.retMsg = '失败';
        result.data = _result;
    }

    ctx.body = result
} 