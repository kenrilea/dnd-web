const searchOne = (collection, searchParams) => {
    console.log(searchParams)
    const dbRequest = new Promise ((resolve, reject) => {
        collection.find({ ...searchParams }).toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
            }
            if(result.length < 1) {
                resolve({ success: false, message: 'search param does not exist'})
            }
            console.log(`success: found entry in collection`)
            resolve({ success: true, data: {...result[0]} })
        })
    })
    return dbRequest
}

module.exports = {searchOne}