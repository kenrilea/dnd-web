const mongo = require("../Mongo/MongoExports.js");
const readSpell = require("../../utilities/readSpell.js");

let collections = {};

const addSpell = req => {
  if (!req.body) {
    return {
      success: false,
      message: "post request to /spell must have a body"
    };
  }
  const { id } = req.body;
  console.log(`attempting to create new spell: ${id}`);
  const dbResult = mongo.insertUnique(collections.spells, id, req.body);
  return dbResult;
};
const getSpell = req => {
  if (!req.query) {
    return {
      success: false,
      message: "get request to /spell must have a query id"
    };
  }
  const { id } = req.query;
  return mongo.findOne(collections.spells, id);
};

const routes = (app, upload, initialize) => {
  app.post("/spell", upload.single(), (req, res) => {
    console.log();
    console.log("POST: /spell");
    collections = initialize();
    if (req.file === undefined) {
      const dbResult = addSpell(req);
      dbResult.then(response => {
        console.log(response);
        res.send(response);
        console.log("request complete");
        console.log();
      });
    } else {
    }
  });
  app.get("/spell", upload.none(), (req, res) => {
    console.log();
    console.log("get: /spell");
    collections = initialize();
    const dbResult = getSpell(req);
    dbResult.then(response => {
      res.send(response);
    });
  });
};

module.exports = { routes };
