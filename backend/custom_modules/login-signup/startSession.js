const generateRandomString = require("../../utilities/generateRandomString");

let startSession = (collection, userId, res) => {
  const sessionId = generateRandomString(20);

  collection.find({ userId }).toArray((err, SessionArr) => {
    if (SessionArr.length < 1) {
      collection.insertOne({
        sid: sessionId,
        userId
      });
      console.log("created a new session");
      return;
    } else {
      let query = { userId };
      let updatedSession = {
        $set: {
          sid: sessionId,
          userId
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
      result: "logged in"
    })
  );
};
module.exports = startSession;
