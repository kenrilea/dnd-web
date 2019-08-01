const passwordHash = require("password-hash");

const startSession = require("./startSession");

let login = (
  Collection_LoginInfo,
  Collection_Sessions,
  username,
  password,
  res
) => {
  Collection_LoginInfo.find({ username: username }).toArray(
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
      if (passwordHash.verify(password, foundUser.hashedPassword)) {
        console.log("password match");
        startSession(Collection_Sessions, username, res);
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
};
module.exports = login;
