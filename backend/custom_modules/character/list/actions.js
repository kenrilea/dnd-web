const { findOne } = require('../../Mongo/MongoExports.js')

const get = async (collections, data, userId) => {
    const usersResult = await findOne(collections.users, { userId });
    if (usersResult.success !== true) {
        return { success: false, message: 'query failed' }
    }
    const { characterList } = usersResult.data;
    return { success: true, data: { characterList } }
}

module.exports = { get }