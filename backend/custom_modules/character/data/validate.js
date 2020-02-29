const post = (req) => {
    try {
        const data = JSON.parse(req.body.data);
        return { success: true, data }
    } catch (error) {
        return { succes: false, message: 'body validation failed', error }
    }
}

const get = (req) => {
    try {
        const data = { characterId: req.query.characterId };
        return { success: true, data }
    } catch (error) {
        return { succes: false, message: 'body validation failed', error }
    }
}

const put = (req) => {
    try {
        const data = JSON.parse(req.body.data)
        if (!data.characterId) return { success: false, message: 'body validation failed: No character id' }
        return { success: true, data }
    } catch (e) {
        return { success: false, message: 'body validation failed' }
    }
}
module.exports = { get, post, put }