let passwordCheck = (password, res) => {
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let passwordArray = password.split("");
  let hasNumber = false;
  let hasNormal = false;
  let hasLength = false;
  let hasUpperCase = false;
  let messages = [];
  passwordArray.forEach(char => {
    if (numbers.includes(char)) {
      hasNumber = true;
    } else if (char.toLowerCase() !== char) {
      hasUpperCase = true;
    } else {
      hasNormal = true;
    }
  });
  if (password.length > 6) {
    hasLength = true;
  }
  if (hasNumber && hasNormal && hasLength && hasUpperCase) {
    return true;
  }
  console.log("password failed check");
  res.status(400);
  res.send(
    JSON.stringify({
      success: false,
      result:
        "Password must be 7 or more characters long and contain one lowercase letter, one number, on upper case letter"
    })
  );
  return false;
};

module.exports = passwordCheck;
