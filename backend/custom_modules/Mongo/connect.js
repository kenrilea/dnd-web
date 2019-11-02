const MongoClient = require("mongodb").MongoClient;

let dataBaseUrl = require("../../utilities/databaseURI");

let usersDB;
let loginInfo;
let sessions;
let stats;

(async function initDB() {
  await MongoClient.connect(
    dataBaseUrl,
    { useNewUrlParser: true },
    (err, allDbs) => {
      console.info(
        "-----------------------Database Initialised-----------------------"
      );
      // Add option useNewUrlParser to get rid of console warning message
      if (err) throw err;
      usersDB = allDbs.db("Users");
      charactersDB = allDbs.db("Characters");
      loginInfo = usersDB.collection("LoginInfo");
      sessions = usersDB.collection("Sessions");
      stats = charactersDB.collection("stats");
    }
  );
})();

if (loginInfo && sessions && stats) {
    module.exports = { collections: {
        loginInfo,
        sessions,
        stats
    }  }
}
