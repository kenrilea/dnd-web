// const { collections } = require('../Mongo/connect.js')


let collections = {}
const getCharStats = (req) => {
    if (!req.query) {
        return { success: false, message: 'request query is required' }
    }
    const { characterId } = req.query;
    if (!characterId) {
        return { success: false, message: 'request query param "characterId" is required' }
    }
    console.log(`getting character stats for ${characterId}`)
    const dbRequest = new Promise ((resolve, reject) => {
        collections.characterStats.find({ characterId }).toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
            }
            if(result.length < 1) {
                resolve({ success: false, message: 'characterId does not exist'})
            }
            console.log(`success: recieved data for ${characterId}`)
            resolve({ success: true, data: {...result[0]} })
        })
    })
    return dbRequest;
}

const newCharStats = (req) => {
    if (!req.body) {
        return { success: false, message: 'request body is required' }
    }
    const { characterId } = req.body
    console.log(`adding new character stats for ${characterId}`)
    const dbRequest = new Promise ((resolve, reject) => {
        collections.characterStats.find({ characterId }).toArray( (err, result) => {
            if(err) {
                resolve({ success: false, error: err})
            }
            if(result.length > 0) {
                resolve({ success: false, message: `stats for ${characterId} already exist`})
                return;
            }
            collections.characterStats.insertOne(
                {
                    ...req.body
                }, (err, result) => {
                    if (!err) {
                        resolve({ success: false, error: err})
                    }
                    console.log('success')
                    resolve({ success: true })
                }
            )
        });
    });
    return dbRequest;
}
const routes = async (app, upload, initialize) => {
    app.get('/character/stats', upload.none(), (req, res) => {
        console.log()
        console.log('GET: /character/stats')
        collections = initialize()
        const dbResult = getCharStats(req);
        dbResult.then((result) => {
            res.send(result)
            console.log('request complete')
            console.log()
        })
    });
    app.post('/character/stats', upload.none(), (req,res) => {
        console.log()
        console.log('POST: /character/stats')
        collections = initialize()
        console.log('recieved')
        const dbResult = newCharStats(req);
        dbResult.then(result => {
            console.log(result)
            res.send(JSON.stringify(result))
            console.log('request complete')
            console.log()
        })
    })
}


module.exports = { routes }