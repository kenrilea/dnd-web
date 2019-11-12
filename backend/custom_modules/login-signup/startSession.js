const generateRandomString = require("../../utilities/generateRandomString");

let startSession = (collection, username, res) => {
  const sessionId = generateRandomString(20);

  collection.find({ username: username }).toArray((err, SessionArr) => {
    if (SessionArr.length < 1) {
      collection.insertOne({
        sid: sessionId,
        username: username
      });
      console.log("created a new session");
      return;
    } else {
      let query = { username: username };
      let updatedSession = {
        $set: {
          sid: sessionId,
          username: username
        }
      };
      collection.updateOne(query, updatedSession, (err, result) => {
        if (err) throw err;
        console.log("session updated");
      });
    }
  });
  console.log("sending response");
  res.cookie("sid", sessionId);
  res.status(200);
  res.send(
    JSON.stringify({
      success: true,
      result: "logged in as " + username
    })
  );
};
module.exports = startSession;
