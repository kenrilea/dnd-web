let SignUpPreChecks = (body, res) => {
  if (body === undefined) {
    console.log("no data with login request");
    res.status(400);
    res.send(
      JSON.stringify({ success: false, result: "signup data not recieved" })
    );
    return false;
  }
  return true;
};
module.exports = SignUpPreChecks;
