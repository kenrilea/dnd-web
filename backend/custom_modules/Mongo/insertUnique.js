const insertUnique = (collection, id, data) => {
    const dbResult = new Promise ((resolve, reject) => {
        collection.find({ id }).toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
                return
            }
            if(result.length > 0) {
                resolve({ success: false, message: `${id} already exists`})
                return;
            }
            collection.insertOne(
                {
                    ...data
                }, (err, result) => {
                    if (err) {
                        resolve({ success: false, error: err})
                    }
                    console.log(`${id} was added`)
                    resolve({ success: true })
                    return
                }
            )
        });
    });
    return dbResult
}

module.exports = { insertUnique }