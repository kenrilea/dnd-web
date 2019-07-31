csvParseObject = object => {
  let newObject = {};
  Object.keys(object).forEach(key => {
    let newKey;
    Object.keys(object[key]).forEach(subKey => {
      if (subKey === "Id") {
        newKey = object[key][subKey];
      } else {
        newObject[newKey][subKey] = object[key][subKey];
      }
    });
  });
  return newObject;
};

module.exports = csvParseObject;
