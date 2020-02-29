// const { collections } = require('../Mongo/connect.js')
const mongo = require("../Mongo/MongoExports.js");

let collections = {};
const getCharStats = req => {
  if (!req.query) {
    return { success: false, message: "request query is required" };
  }
  const { id } = req.query;
  if (!id) {
    return { success: false, message: 'request query param "id" is required' };
  }
  console.log(`getting character stats for ${id}`);
  const dbRequest = new Promise((resolve, reject) => {
    collections.characterStats.find({ id }).toArray((err, result) => {
      if (err) {
        resolve({ success: false, error: err });
      }
      if (result.length < 1) {
        resolve({ success: false, message: "id does not exist" });
      }
      console.log(`success: recieved data for ${id}`);
      resolve({ success: true, data: { ...result[0] } });
    });
  });
  return dbRequest;
};

const newCharStats = req => {
  if (!req.body) {
    return { success: false, message: "request body is required" };
  }
  console.log(req.body);
  const id = req.body.id;
  console.log(`adding new character stats for ${id}`);
  const dbRequest = new Promise((resolve, reject) => {
    collections.characterStats.find({ id: id }).toArray((err, result) => {
      if (err) {
        resolve({ success: false, error: err });
      }
      if (result.length > 0) {
        resolve({ success: false, message: `stats for ${id} already exist` });
        return;
      }
      collections.characterStats.insertOne(
        {
          ...req.body
        },
        (err, result) => {
          if (err) {
            resolve({ success: false, error: err });
          }
          console.log("success");
          resolve({ success: true });
        }
      );
    });
  });
  return dbRequest;
};
const addUserChar = req => {
  collections.sessions.findOne({ sid: req.cookies.sid }, (err, session) => {
    if (err) {
      console.log(err);
    }
    let user = session.username;
    console.log("session found for " + user);
    const charId = req.body.id;
    collections.userData.findOne({ username: user }, (err, result) => {
      if (err) {
        console.log(err);
      }
      
      newChars = ((result && result.charList) || []).concat(charId);
      console.log(newChars);
      collections.userData.updateOne(
        { username: user },
        { $set: { charList: newChars } },
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  });
};

const routes = async (app, upload, initialize) => {
    app.post("/character/data", upload.none(), (req, res) => {
        console.log();
        console.log("POST: /characterdata");
        collections = initialize();
        console.log("recieved");
        const dbResult = newCharStats(req);
        dbResult.then(result => {
        if (result.success) {
            console.log("char written to db");
            addUserChar(req);
        } else {
            console.log(result);
        }
        console.log(result);
        res.send(JSON.stringify(result));
        console.log("request complete");
        });
    });
};

module.exports = { routes };
