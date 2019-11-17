const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: __dirname + "/uploads" });

const cookieParser = require("cookie-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

const passwordCheck = require(__dirname + "/utilities/passwordCheck.js");
const signUpPreChecks = require("./utilities/signUpPreChecks");
const passwordHash = require("password-hash");
const character = require("./custom_modules/character/character.js");
const spells = require("./custom_modules/character/spells.js");
// importing test files
const testChars = require("./testFiles/testChars.js");
//___________________Custom Modules___________________________

//login signup
const HandleAuth = require("./custom_modules/login-signup/module");

// app.listen(4000, () => {
//    // LOCAL SERVER
//    console.log("Running on port 4000");
// });
//_____________________MOGODB Setup___________________

let dataBaseUrl = require("./utilities/databaseURI");

let UsersDB;
let Collection_LoginInfo;
let Collection_Sessions;
let Collection_CharacterStats;
let Collection_Spells;

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
      UsersDB = allDbs.db("Users");
      CharactersDB = allDbs.db("Characters");
      GameDB = allDbs.db("Game");
      Collection_LoginInfo = UsersDB.collection("LoginInfo");
      Collection_Sessions = UsersDB.collection("Sessions");
      Collection_CharacterStats = CharactersDB.collection("stats");
      Collection_Spells = GameDB.collection("spells");
    }
  );
})();

//_____________________MIDLEWARE_______________________
hostIp = 'localhost'

app.use(cookieParser());
app.use(cors());
app.use(cors({ credentials: true, origin: "http://" + hostIp +":3000" })); // CONFIG FOR LOCAL SERVER
app.use("/images", express.static(__dirname + "/uploads")); // Files in local folder uploads have endpoints as /images/x
app.use("/assets", express.static(__dirname + "/assets"));

//app.use(cors({ credentials: true, origin: "http://134.209.119.133:3000" })); // CONFIG FOR REMOTE SERVER

//_________________Begining of END POINTS____________________

//test
app.get("/test", (req, res) => {
  res.send("test successful");
});

//SIGNUP
app.post("/signup", upload.none(), (req, res) => {
  if (!signUpPreChecks(req.body, res)) {
    return;
  }
  console.log("login request recieved || user: " + req.body.username);
  if (!passwordCheck(req.body.password, res)) {
    return;
  }
  let hashedPassword = passwordHash.generate(req.body.password);
  HandleAuth.signUp(
    Collection_LoginInfo,
    Collection_Sessions,
    req.body.username,
    hashedPassword,
    res
  );
});

//AutoLogin
app.post("/auto-login", upload.none(), (req, res) => {
  console.log(req.cookies.sid);
  HandleAuth.autoLogin(Collection_Sessions, req.cookies.sid, res);
});

//LOGIN
app.post("/login", upload.none(), (req, res) => {
  if (req.body === undefined) {
    console.log("no data with login request");
    res.status(400);
    res.send(
      JSON.stringify({ success: false, result: "login data not recieved" })
    );
    return;
  }
  console.log("login request recieved || user: " + req.body.username);
  HandleAuth.login(
    Collection_LoginInfo,
    Collection_Sessions,
    req.body.username,
    req.body.password,
    res
  );
});

// Character

character.routes(app, upload, () => ({
  loginInfo: Collection_LoginInfo,
  sessions: Collection_Sessions,
  characterStats: Collection_CharacterStats
}));
spells.routes(app, upload, () => ({
  loginInfo: Collection_LoginInfo,
  sessions: Collection_Sessions,
  spells: Collection_Spells
}));

//__________________TEST CODE_________________________
app.get("/test/characters", (req, res) => {
  console.log("GET: /test/characters");
  let charList = [];
  let charIds = Object.keys(testChars);
  charIds.forEach(id => {
    charList.push(testChars[id].baseInfo);
  });
  charList = JSON.stringify(charList);
  res.send(charList);
});
app.get("/test/get-char", (req, res) => {
  let searchId = req.query.id;
  console.log("GET: character data forn" + searchId);
  let charLib = testChars;
  let found = charLib[searchId];
  if (found === undefined) {
    res.send({ success: false, err: "No character by that id" });
    return;
  }
  let char = found;
  let package = JSON.stringify({ success: true, charData: char });
  res.send(package);
});
app.post("/test/save-char", upload.none(), (req, res) => {
  console.log("POST: save-char");
  console.log(req.body);
  let body = req.body;
  let charData = JSON.parse(body.charData);
  console.log("save request for " + body.id);
  let charLib = testChars;
  charLib[body.id] = charData;
  fs.writeFile(
    __dirname + "/testFiles/testCharBackup.json",
    JSON.stringify(charLib, undefined, "\t"),
    err => {
      if (err) {
        console.log(err);
      }
      console.log("character library written");
    }
  );
});

/*
const fs = require("fs");
let loadTest = () => {
  console.log("loading test set to DB");
  //this is for loading the test spell set out of a json file on disk into the DB
  fs.readFile(
    "C:/Users/travi/web_files/dnd-web/backend/testFiles/spellLibrary.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      let lib = JSON.parse(data);
      //we remove the index array since we dont want to push it into the db
      lib.index = undefined;
      let spellIds = Object.keys(lib);
      spellIds = spellIds.slice(1, 11);
      spellIds.forEach(id => {
        let data = { body: {} };
        data.body.id = id;
        data.body.spell = JSON.stringify(lib[id]);
        console.log("adding spell to db: " + id);
        spells.addSpell(data);
      });
    }
  );
};

loadTest();
*/



//_________________End of END POINTS____________________
app.listen(4000, hostIp, () => {
  // REMOTE SERVER/DROPLET
  console.log("Running on port 4000 host:" + hostIp);
});

