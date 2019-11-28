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
      newChars = result.charList.concat(charId);
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

const characterList = user => {
  dbResult = new Promise((resolve, reject) => {
    collections.userData.findOne({ username: user }, (err, result) => {
      if (err) {
        console.log(err);
        resolve([]);
      }
      resolve(result.charList);
    });
  });
  return dbResult;
  //return mongo.listCollection(collections.characterStats);
};

const routes = async (app, upload, initialize) => {
  app.get("/character/stats", (req, res) => {
    console.log("GET: /character/stats");
    collections = initialize();
    const dbResult = getCharStats(req);
    dbResult.then(result => {
      res.send(result);
      console.log("request complete");
      console.log();
    });
  });
  app.post("/character/stats", upload.none(), (req, res) => {
    console.log();
    console.log("POST: /character/stats");
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
  app.post("/character/update", upload.none(), (req, res) => {
    console.log("POST: /charcater/update");
    collections = initialize();
    collections.characterStats.updateOne(
      { id: req.body.id },
      { $set: { charData: req.body.charData } },
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(
            JSON.stringify({
              success: false,
              msg: "error writing character stats to db"
            })
          );
          return;
        }
        console.log("char stats updated for " + req.body.id);
        res.send(JSON.stringify({ success: true, char: result.charData }));
      }
    );
  });
  // ---------------------------------------------------------
  app.get("/character/list", upload.none(), (req, res) => {
    console.log();
    console.log("GET: /character/list");
    collections = initialize();
    console.log("recieved");
    collections.sessions.findOne({ sid: req.cookies.sid }, (err, result) => {
      if (err) {
        console.log(err);
      }
      let user = result.username;
      const dbResult = characterList(user);
      dbResult.then(result => {
        console.log(result);
        res.send(JSON.stringify(result));
        console.log("request complete");
        //console.log()
      });
    });
  });
};

module.exports = { routes };
