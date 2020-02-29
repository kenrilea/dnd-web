const validate = require('./validate.js');
const actions = require('./actions.js');
const authenticate = require('../../login-signup/authenticate.js');

let collections = {};

const routes = async (app, upload, initialize) => {
  app.get("/character/data", async (req, res) => {
    console.log();
    console.log("GET: /character/data");
    collections = initialize();
    console.log("recieved");
    const authentication = await authenticate(collections.sessions, req)
    if (!authentication.success) {
        console.log('authentication failed');
        res.send(JSON.stringify({ success: false, message: 'you are not logged in' }))
        return;
    }
    const userId = authentication.data.userId;

    console.log(`request made by ${authentication.data.userId}`)
    let data = { success: false };
    data = validate.get(req, userId);
    if (data.success === false) {
        console.log('validation failed');
        res.send(JSON.stringify(data))
        return;
    }
    data = await actions.get(collections, data, userId)
    if (data.success === false) {
        console.log('action failed')
        res.send(JSON.stringify(data));
    }
    if (data.success === true) {
        console.log('success');
        res.send(JSON.stringify(data));
        return;
    }
    res.send({success: false, message: 'unexpected: execution exited without creating a valid result'})
  });

  app.post("/character/data", upload.none(), async (req, res) => {
    console.log();
    console.log("POST: /character/data");
    collections = initialize();
    console.log("recieved");
    const authentication = await authenticate(collections.sessions, req)
    if (!authentication.success) {
        console.log('authentication failed');
        res.send(JSON.stringify({ success: false, message: 'you are not logged in' }))
        return;
    }
    const userId = authentication.data.userId;

    console.log(`request made by ${authentication.data.userId}`)
    let data = { success: false };
    data = validate.post(req, userId);
    if (data.success === false) {
        console.log('validation failed');
        res.send(JSON.stringify(data))
        return;
    }
    data = await actions.post(collections, data, userId)
    if (data.success === false) {
        console.log('action failed')
        res.send(JSON.stringify(data));
    }
    if (data.success === true) {
        console.log('success');
        res.send(JSON.stringify(data));
        return;
    }
    res.send({success: false, message: 'unexpected: execution exited without creating a valid result'})
  });
  
  app.post("/character/data/save", upload.none(), async (req, res) => {
    console.log();
    console.log("PUT: /character/data");
    collections = initialize();
    console.log("recieved");
    const authentication = await authenticate(collections.sessions, req)
    if (!authentication.success) {
        console.log('authentication failed');
        res.send(JSON.stringify({ success: false, message: 'you are not logged in' }))
        return;
    }
    const userId = authentication.data.userId;

    console.log(`request made by ${authentication.data.userId}`)
    let data = { success: false };
    data = validate.put(req, userId);
    if (data.success === false) {
        console.log('validation failed');
        res.send(JSON.stringify(data))
        return;
    }
    data = await actions.put(collections, data, userId)
    if (data.success === false) {
        console.log('action failed')
        res.send(JSON.stringify(data));
    }
    if (data.success === true) {
        console.log('success');
        res.send(JSON.stringify(data));
        return;
    }
    res.send({success: false, message: 'unexpected: execution exited without creating a valid result'})
  });
};

module.exports = { routes };