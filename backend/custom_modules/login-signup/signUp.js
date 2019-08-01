const startSession = require("./startSession");

const signUp = (
  userInfoCollection,
  sessionsCollection,
  username,
  hashedPassword,
  res
) => {
  userInfoCollection.find({ username }).toArray((err, foundUsers) => {
    if (foundUsers.length > 0) {
      console.log("username taken");
      res.status(400);
      res.send(
        JSON.stringify({
          success: false,
          result: "Username already in use",
          credentials: "include"
        })
      );
      return;
    }
    userInfoCollection.insertOne(
      {
        username,
        hashedPassword
      },
      (err, result) => {
        if (err) {
          console.log("error");

          throw err;
        }
        console.log("account created");
        startSession(sessionsCollection, username, res);
      }
    );
  });
};

module.exports = signUp;
