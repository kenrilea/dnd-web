const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: __dirname + "/uploads" });

const cookieParser = require("cookie-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

// ____________ENDPOINTS___________________
const characterdata = require('./custom_modules/character/data/rest');
const characterList = require('./custom_modules/character/list/rest');

//_________________________________________

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
// character
let Collection_Characters;
let Collection_CharacterStats;
let Collection_CharacterBaseInfo;
let Collection_CharacterProficiency;
let Collection_CharacterSpells;
let Collection_CharacterCombatStats;
let Collection_CharacterItems;
let Collection_Spells;
let Collection_UserData;

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
      Collection_UserData = UsersDB.collection("users");
      Collection_Sessions = UsersDB.collection("Sessions");
      Collection_Characters = CharactersDB.collection("characters");
      Collection_CharacterStats = CharactersDB.collection("character_stats");
      Collection_CharacterBaseInfo = CharactersDB.collection("character_base_info");
      Collection_CharacterProficiency = CharactersDB.collection("character_proficiency");
      Collection_CharacterItems = CharactersDB.collection("character_items");
      Collection_CharacterCombatStats = CharactersDB.collection("character_combat_stats");
      Collection_CharacterSpells = CharactersDB.collection("character_spells");
      Collection_Spells = GameDB.collection("spells");
      Collection_Notes = CharactersDB.collection("notes");
    }
  );
})();

//_____________________MIDLEWARE_______________________
hostIp = "localhost";

app.use(cookieParser());
app.use(cors());
app.use(cors({ credentials: true, origin: "http://" + hostIp + ":3000" })); // CONFIG FOR LOCAL SERVER
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
    Collection_UserData,
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

// character.routes(app, upload, () => ({
//   loginInfo: Collection_LoginInfo,
//   sessions: Collection_Sessions,
//   characterStats: Collection_CharacterStats,
//   userData: Collection_UserData,
//   characterNotes: Collection_Notes
// }));
// spells.routes(app, upload, () => ({
//   loginInfo: Collection_LoginInfo,
//   sessions: Collection_Sessions,
//   spells: Collection_Spells
// }));
characterdata.routes(app, upload, () => ({
  sessions: Collection_Sessions,
  users: Collection_UserData,
  character: {
    index: Collection_Characters,
    baseInfo: Collection_CharacterBaseInfo,
    stats: Collection_CharacterStats,
    proficiency: Collection_CharacterProficiency,
    spells: Collection_CharacterSpells,
    combatStats: Collection_CharacterCombatStats,
    items: Collection_CharacterItems,
  }
}));
characterList.routes(app, upload, () => ({
  users: Collection_UserData,
  sessions: Collection_Sessions,
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
