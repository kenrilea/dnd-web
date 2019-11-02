// const { collections } = require('../Mongo/connect.js')


let collections = {}
const getRequest = () => {
    // new Promise ((resolve, reject) => {
    //     collections.stats.find({ })
    // })
}

const postRequest = (req) => {
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
    app.get('/character', upload.none(), (req, res) => {
        collections = initialize()
        character.setCollections(collections)
        getRequest();
        res.send('character')
    });
    app.post('/character/stats', upload.none(), (req,res) => {
        console.log()
        console.log('POST: /character/stats')
        collections = initialize()
        console.log('recieved')
        const dbResult = postRequest(req);
        dbResult.then(result => {
            console.log(result)
            res.send(JSON.stringify(result))
            console.log('request complete')
            console.log()
        })
    })
}


module.exports = { routes }