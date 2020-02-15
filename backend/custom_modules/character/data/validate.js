const post = (req) => {
    try {
        const data = JSON.parse(req.body.data);
        return { success: true, data }
    } catch (error) {
        return { succes: false, message: 'body validation failed', error }
    }
}

module.exports = { post }