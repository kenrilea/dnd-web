const findOne = (collection, id) => {
    const dbRequest = new Promise ((resolve, reject) => {
        const query = typeof id === 'object' ? id : { id }
        console.log(query);
        collection.find(query).toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
            }
            if(result.length < 1) {
                resolve({ success: false, message: 'id does not exist'})
            }
            console.log(`success: recieved data for ${id}`)
            resolve({ success: true, data: {...result[0]} })
        })
    })
    return dbRequest
}

module.exports = {findOne}