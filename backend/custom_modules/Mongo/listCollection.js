const listCollection = (collection, id, data) => {
    const dbResult = new Promise ((resolve, reject) => {
        collection.find().toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
                return
            }
            console.log(result)
            if(!result || !result.map) {
                resolve([])
            }
            const idList = result.map(({ id }) => {return id})
            resolve(idList)
        });
    });
    return dbResult
}

module.exports = { listCollection }