let autoLogin = (collection, sid, res) => {
  collection.find({ sid: sid }).toArray((err, foundSessionArr) => {
    if (foundSessionArr.length < 1) {
      return;
    }
    let foundUser = foundSessionArr[0];
    console.log("session match");
    console.log("logged in user " + foundUser.userId);
    res.status(200);
    res.send(
      JSON.stringify({
        success: true,
        result: "logged in"
      })
    );
  });
};
module.exports = autoLogin;
