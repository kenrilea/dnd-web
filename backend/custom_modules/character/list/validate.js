const get = (req) => {
    try {
        return { success: true, data }
    } catch (error) {
        return { succes: false, message: 'body validation failed', error }
    }
}

module.exports = { get }