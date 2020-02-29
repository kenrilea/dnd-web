const { insertUnique, updateOne, findOne } = require('../../Mongo/MongoExports.js')
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
    // --- proficiency ---
    const proficiencyData = {
        _id,
        ...data.data.proficiency
    };
    const proficiencyResult = await insertUnique(collections.character.proficiency, _id, proficiencyData);
    if (proficiencyResult.success !== true) { 
        console.log('adding proficiency to DB failed');
    }

    // --- spells ---
    const spellsData = {
        _id,
        spells: data.data.spells
    };
    const spellsResult = await insertUnique(collections.character.spells, _id, spellsData);
    if (spellsResult.success !== true) { 
        console.log('adding spells to DB failed');
    }

    // --- items ---
    const itemsData = {
        _id,
        inventory: data.data.items,
    };
    const itemsResult = await insertUnique(collections.character.items, _id, itemsData);
    if (itemsResult.success !== true) { 
        console.log('adding items to DB failed');
    }

    // --- combat stats ---
    const combatStatsData = {
        _id,
        ...data.data.combatStats
    };
    const combatStatsResult = await insertUnique(collections.character.combatStats, _id, combatStatsData);
    if (combatStatsResult.success !== true) { 
        console.log('adding combat stats to DB failed');
    }

    // --- add to character list ---
    const characterListData = {
        _id,
        name: data.data.baseInfo.name,
    };
    console.log(characterListData)
    console.log(updateOne);
    const characterListResult = await updateOne(collections.users, { userId }, { $push: { characterList: characterListData } })
    console.log(characterListResult);
    return { success: true, message: 'character saved' }
}

const get = async (collections, data, userId) => {
    const { characterId } = data.data;
    try {
        const baseInfo = await findOne(collections.character.index, { _id: characterId, userId })
        const stats = await findOne(collections.character.stats, { _id: characterId })
        const proficiency = await findOne(collections.character.proficiency, { _id: characterId })
        const spells = await findOne(collections.character.spells, { _id: characterId })
        const items = await findOne(collections.character.items, { _id: characterId })
        const combatStats = await findOne(collections.character.combatStats, { _id: characterId })
        const result = {
            data: {
                character: {
                    _id: characterId,
                    baseInfo: baseInfo.data,
                    stats: stats.data,
                    combatStats: combatStats.data,
                    proficiency: proficiency.data,
                    spells: spells.data.spells,
                    items: items.data.inventory
                },
            },
            success: true,
        }
        return result
    } catch (e) {
        console.log(e)
        return { success: false, message: `an error occured while fetching character data for ${characterId}`}
    }
};

const put = async (collections, data, userId) => {
    console.log(data);
    const {
        characterId = { updated: true},
        baseInfo = { updated: true },
        stats = { updated: true},
        combatStats = { updated: true },
        proficiency = { updated: true },
        spells = { updated: true },
        items = { updated: true},
    } = data.data;
    console.log('before')
    console.log(baseInfo)
    console.log('after')
    console.log(baseInfo);
    const baseInfoResult = await updateOne(collections.character.index, { _id: characterId }, { $set: baseInfo })
    console.log(baseInfoResult)
    const statsResult = await updateOne(collections.character.stats, { _id: characterId }, { $set: stats })
    console.log(statsResult)
    const proficiencyResult = await updateOne(collections.character.proficiency, { _id: characterId }, { $set: proficiency })
    console.log(proficiencyResult)
    const spellsResult = await updateOne(collections.character.spells, { _id: characterId }, { $set: spells })
    console.log(spellsResult)
    const itemsResult = await updateOne(collections.character.items, { _id: characterId }, { $set: items })
    console.log(itemsResult)
    const combatStatsResult = await updateOne(collections.character.combatStats, { _id: characterId }, { $set: combatStats })
    console.log(combatStatsResult)
    return { success: true }
}

module.exports = { get, post, put }