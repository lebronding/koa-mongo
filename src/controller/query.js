const axios = require('axios')

module.exports = async(ctx) => {
    const { data } = await axios.post('').catch(e => {
        throw e;
    });
    console.log(data)
    ctx.body = data
} 