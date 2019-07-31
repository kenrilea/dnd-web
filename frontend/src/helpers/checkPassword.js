export default (checkPassword = password => {
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let passwordArray = password.split();
  let hasNumber = false;
  let hasLength = false;
  let hasUpperCase = false;
  passwordArray.map(char => {
    if (numbers.includes(char)) {
      hasNumber = true;
      return;
    }
    if (char.toLowerCase() < char) {
      hasUpperCase = true;
      return;
    }
  });
  if (password.length < 7) {
    return false;
  }
});
