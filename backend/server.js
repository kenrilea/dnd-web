const express = require("express");
const cors = require("cors");
const multer = require("multer");

const upload = multer();

const cookieParser = require("cookie-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

const passwordCheck = require(__dirname + "/utilities/passwordCheck.js");
const generateRandomString = require(__dirname +
  "/utilities/generateRandomString.js");
const passwordHash = require("password-hash");

// app.listen(4000, () => {
//    // LOCAL SERVER
//    console.log("Running on port 4000");
// });
//_____________________MOGODB Setup___________________

let dataBaseUrl =
  "mongodb+srv://admin:WhqtQsNqxt@cluster0-58fms.mongodb.net/test?retryWrites=true&w=majority";

let UsersDB;
let Collection_LoginInfo;
let Collection_Sessions;

(async function initDB() {
  await MongoClient.connect(
    dataBaseUrl,
    { useNewUrlParser: true },
    (err, allDbs) => {
      console.log(
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
  if (!passwordCheck(req.body.password)) {
    console.log("password failed check");
    res.status(400);
    res.send(
      JSON.stringify({
        success: false,
        result:
          "Password must be 7 or more characters long and contain one lowercase letter, one number, on upper case letter"
      })
    );
    return;
  }
  let hashedPassword = passwordHash.generate(req.body.password);
  Collection_LoginInfo.find({ username: req.body.username }).toArray(
    (err, foundUsers) => {
      if (foundUsers.length > 0) {
        console.log("username taken");
        res.status(400);
        res.send(
          JSON.stringify({ success: false, result: "Username already in use" })
        );
        return;
      }
      Collection_LoginInfo.insertOne(
        {
          username: req.body.username,
          hashedPassword
        },
        (err, result) => {
          if (err) throw err;
          console.log(result);
          console.log("account created");
          res.status(200);
          res.send(
            JSON.stringify({ success: true, result: "account created" })
          );
          return;
        }
      );
    }
  );
});

//---------------------------------------------------------------------------
//AutoLogin
app.post("/auto-login", upload.none(), (req, res) => {
  let loggedIn = false;
  console.log(req.cookies.sid);
  Collection_Sessions.find({ sid: req.cookies.sid }).toArray(
    (err, foundSessionArr) => {
      if (foundSessionArr.length < 1) {
        return;
      }
      let foundUser = foundSessionArr[0];
      console.log("session match");
      console.log("logged in user " + foundUser.username);
      loggedIn = true;
      res.status(200);
      res.send(
        JSON.stringify({
          success: true,
          result: "logged in as " + foundUser.username
        })
      );
    }
  );
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
  Collection_LoginInfo.find({ username: req.body.username }).toArray(
    (err, foundUserArr) => {
      if (foundUserArr.length < 1) {
        res.send(
          JSON.stringify({
            success: false,
            result: "username or password was incorrect"
          })
        );
      }
      const foundUser = foundUserArr[0];
      if (passwordHash.verify(req.body.password, foundUser.hashedPassword)) {
        console.log("password match");
        const sessionId = generateRandomString(20);

        Collection_Sessions.find({ username: req.body.username }).toArray(
          (err, SessionArr) => {
            if (SessionArr.length < 1) {
              Collection_Sessions.insertOne({
                sid: sessionId,
                username: req.body.username
              });
              return;
            }
            let query = { username: req.body.username };
            let updatedSession = {
              $set: {
                sid: sessionId,
                username: req.body.username
              }
            };
            Collection_Sessions.updateOne(
              query,
              updatedSession,
              (err, result) => {
                if (err) throw err;
                console.log("session updated");
              }
            );
          }
        );

        res.cookie("sid", sessionId);
        res.status(200);
        res.send(
          JSON.stringify({
            success: true,
            reesult: "logged in as " + req.body.username
          })
        );
        return;
      }
      console.log("passwords did not match");
      res.status(200);
      res.send(
        JSON.stringify({
          success: false,
          reesult: "username or password was incorrect"
        })
      );
      return;
    }
  );
});

//---------------------------------------------------------------------------
//__________________TEST CODE_________________________

//_________________End of END POINTS____________________
app.listen(4000, "0.0.0.0", () => {
  // REMOTE SERVER/DROPLET
  console.log("Running on port 4000 , 0.0.0.0");
});
