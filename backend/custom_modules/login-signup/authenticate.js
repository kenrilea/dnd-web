const { searchOne } = require('../Mongo/MongoExports.js')

const authenticate = async (sessions, req) => {
    console.log(req.cookies);
    const sid = req.cookies.sid
    return searchOne(sessions, { sid })
}

module.exports = authenticate;