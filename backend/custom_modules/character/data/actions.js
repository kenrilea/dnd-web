const { insertUnique } = require('../../Mongo/insertUnique.js')
const createId = require('../../../utilities/generateRandomString.js');

const post = async (collections, data, userId) => {
    console.log('---------------------')
    const _id = createId(10);
    console.log('-----------------')
    const indexData = {
        ...data.data.baseInfo,
        userId,
        _id,
    }
    const indexResult = await insertUnique(collections.character.index, _id, indexData);
    if (indexResult.success === false) {
        return { success: false, message: 'adding to DB failed'}
    }
    const statsData = {
        _id,
        ...data.data.stats
    };
    const statsResult = await insertUnique(collections.character.stats, _id, statsData);
    if (statsResult.success !== true) { 
        console.log('adding stats to DB failed');
    }
    const proficiencyData = {
        _id,
        ...data.data.proficiency
    };
    const proficiencyResult = await insertUnique(collections.character.proficiency, _id, proficiencyData);
    if (proficiencyResult.success !== true) { 
        console.log('adding proficiency to DB failed');
    }
    return { success: true, message: 'character saved' }
}

module.exports = { post }