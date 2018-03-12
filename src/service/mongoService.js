const schema = {
    author: require('../schema/author')
}

// 保存数据
exports.saveData = (name, data) => {
    const saveData = new schema[name](data)
    saveData.save(function (err) {
        console.log(err)
    })
}

// 删除数据
exports.deleteData = (name, data) => {
    schema[name].remove(data, function(err) {
        if (err) console.log(err)
	})
}

// 查找数据集合
exports.findData = (name, watch, cal, data) => {
    // name 数据库名字
    // watch 查找的字段（例如查找最大，最小值）
    // cal 类型（max，min，avg）
    // data 查询条件
    let query = null
    // 查找数据
    if (!cal) {
        query = schema[name].find(data, { _id: 0, __v: 0})
    } else if (cal === 'count') {
        // 查找count
        query = schema[name].find(data, { _id: 0, __v: 0}).count()
    }else {
        // 查找平均值，最大和最小值
        let _query = [{$match: data}, {$group: {_id: cal, data: {}}}]
        // 设置计算条件
        cal && (cal = '$' + cal)
        _query[1].$group.data[cal] = "$" + watch
        query = schema[name].aggregate(_query)
    }
    return new Promise(function(resolve, reject){
        query.exec(function(err, res) {
            if(err) {
                resolve('')
            }else {
                resolve(res)
            }
        })
    })
}