let fs = require("fs");

let skills = [
  "Animal Handling (Wis)",
  "Arcana (Int)",
  "Athletics (Str)",
  "Deception (Cha)",
  "History (Int)",
  "Insight (Wis)",
  "Intimidation (Cha)",
  "Investigation (Int)",
  "Medicine (Wis)",
  "Nature (Int)",
  "Perception (Wis)",
  "Performance (Cha)",
  "Persuasion (Cha)",
  "Religion (Int)",
  "Sleight of Hand (Dex)",
  "Stealth (Dex)",
  "Survival (Wis)"
];

let toObj = skill => {
  let words = skill.split(" ");
  let stat = words[words.length - 1];
  let name = words.slice(0, words.length - 1).join(" ");
  stat = stat.slice(1, stat.length - 1);
  stat = stat.toLowerCase();
  let skillObj = {
    name: name,
    stat: stat,
    prof: false
  };
  return skillObj;
};

let skillObjs = skills.map(toObj);
let skillJSON = JSON.stringify(skillObjs);
fs.writeFile("./SkillTemplate.json", skillJSON, err => {
  if (err) {
    console.log(err);
  }
  console.log("file written");
});
