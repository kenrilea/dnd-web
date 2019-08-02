const express = require("express");
const cors = require("cors");
const multer = require("multer");

const upload = multer();

const cookieParser = require("cookie-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

const passwordCheck = require(__dirname + "/utilities/passwordCheck.js");

const passwordHash = require("password-hash");
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
      Collection_LoginInfo = UsersDB.collection("LoginInfo");
      Collection_Sessions = UsersDB.collection("Sessions");
    }
  );
})();

//_____________________MIDLEWARE_______________________
app.use(cookieParser());
app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CONFIG FOR LOCAL SERVER
app.use("/images", express.static(__dirname + "/uploads")); // Files in local folder uploads have endpoints as /images/x
app.use("/assets", express.static(__dirname + "/assets"));

//app.use(cors({ credentials: true, origin: "http://134.209.119.133:3000" })); // CONFIG FOR REMOTE SERVER

//_________________Begining of END POINTS____________________

app.get("/", (req, res) => {
  res.send("hello");
});
//----------------------------------------------------------------------------

//SIGNUP
app.post("/signup", upload.none(), (req, res) => {
  if (req.body === undefined) {
    console.log("no data with login request");
    res.status(400);
    res.send(
      JSON.stringify({ success: false, result: "signup data not recieved" })
    );
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

//---------------------------------------------------------------------------
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

//---------------------------------------------------------------------------
//__________________TEST CODE_________________________

//_________________End of END POINTS____________________
app.listen(4000, "0.0.0.0", () => {
  // REMOTE SERVER/DROPLET
  console.log("Running on port 4000 , 0.0.0.0");
});
