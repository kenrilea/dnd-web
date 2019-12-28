import proxy from "./proxy.js";

const loadChar = async charId => {
  console.log("fetching char data for " + charId);
  let path = proxy + "/character/stats?id=" + charId;
  let newChar = undefined;
  let res = await fetch(path);
  let body = await res.text();
  body = JSON.parse(body);
  if (body.success === false) {
    console.log(body);
    return;
  } else {
    newChar = JSON.parse(body.data.charData);
    console.log("retreived char " + newChar.baseInfo.name);
  }
  return newChar;
};
const loadNotes = async charId => {
  let path = proxy + "/character/notes?id=" + charId;
  let notes = undefined;
  let res = await fetch(path);
  let body = await res.text();
  body = JSON.parse(body);
  if (body.success === false) {
    console.log(body);
    return;
  } else {
    console.log(body);
    notes = body.data;
  }
  return notes;
};

export { loadChar, loadNotes };
