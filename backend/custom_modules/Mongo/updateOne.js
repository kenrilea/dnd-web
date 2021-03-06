const updateOne = (collection, search, updateData) => {
    const dbRequest = new Promise ((resolve, reject) => {
        console.log(updateData)
        if (!updateData) resolve({ success: false, message: 'no update data' })
        collection.updateOne({ ...search }, updateData, { upsert: true }).then( (err, result) => {
            console.log('------');
            console.log(!!err)
            console.log(!!result)
            console.log('------');
            resolve({ success: true });
            // if(err) {
            //     resolve({ success: false, error: err})
            // }
            // if(result.length < 1) {
            //     resolve({ success: false, message: 'search found no matches'})
            // }
            // console.log(`success: updated document`)
            // resolve({ success: true });
        })
    })
    return dbRequest
}

module.exports = { updateOne }