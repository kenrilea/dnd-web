let generateRandomString = length => {
  let char = "ABCDEFGHIJKLMNOPQRSTUVWYXZ1234567890";
  char = char.split("");
  let string = "";
  for (let i = 0; i < length; i++) {
    string = string + char[Math.floor(Math.random() * char.length)];
  }
  return string;
};
module.exports = generateRandomString;
