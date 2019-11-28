const startSession = require("./startSession");

const signUp = (
  loginInfoCollection,
  sessionsCollection,
  userData,
  username,
  hashedPassword,
  res
) => {
  loginInfoCollection.find({ username }).toArray((err, foundUsers) => {
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
    loginInfoCollection.insertOne(
      {
        username,
        hashedPassword
      },
      (err, result) => {
        if (err) {
          console.log("error");

          throw err;
        }
        const newUser = { username: username, charList: [] };
        userData.insertOne({ ...newUser }, (err, result) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("account created");
          startSession(sessionsCollection, username, res);
        });
      }
    );
  });
};

module.exports = signUp;
