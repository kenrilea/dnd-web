const fs = require("fs");
const randString = "abcdefghijklmnopqrstuvwxyz";

//spell output object
//{spellId: "rand6letterString",
//    spell_name: "Hail of Thorns",
//    casting_time: "1 bonus action",
//    range: "Self",
//    components: ["V"],
//    duration: "Until dispelled",
//    description:}

const parseSpell = spellLines => {
  let generateId = length => {
    let chars = [];
    for (let i = 0; i < length; i++) {
      let charNum = Math.floor(Math.random() * 26);
      chars.push(randString[charNum]);
    }
    return chars.join("");
  };
  let getLevel = () => {
    let levelLine = undefined;
    for (let i = 0; i < spellLines.length; i++) {
      if (!isNaN(spellLines[i][0])) {
        levelLine = spellLines[i];
        break;
      }
      if (spellLines[i].includes("cantrip")) {
        return spellLines[i].split(" ").pop();
      }
      if (spellLines[i] === "lst") {
        levelLine = spellLines[i];
        break;
      }
    }
    let lvlInt = parseInt(levelLine[0]);
    if (isNaN(lvlInt) || lvlInt === 1) {
      return "first";
    }
    if (lvlInt === 2) {
      return "second";
    }
    if (lvlInt === 3) {
      return "third";
    }
    if (lvlInt === 4) {
      return "fourth";
    }
    if (lvlInt === 5) {
      return "fifth";
    }
    if (lvlInt === 6) {
      return "sixth";
    }
    if (lvlInt === 7) {
      return "seventh";
    }
    if (lvlInt === 8) {
      return "eighth";
    }
    if (lvlInt === 9) {
      return "ninth";
    }
  };
  let parseTitle = rawTitle => {
    let words = rawTitle.split(" ");
    words = words.map(word => {
      return word.toLowerCase();
    });
    words = words.map(word => {
      return word[0].toUpperCase() + word.slice(1, word.length);
    });
    return words.join(" ");
  };
  let getCastTime = () => {
    let found = spellLines.filter(line => {
      if (line.includes("Casting Time")) {
        return true;
      }
      return false;
    });
    if (found.length > 1) {
      console.log("multiple cast times found");
    }
    let words = found[0].split(" ");
    words = words.filter(word => {
      if (word === "Casting" || word === "Time:") {
        return false;
      }
      return true;
    });
    let time = words.join(" ");
    if (!time.includes("action")) {
      console.log("found casting time: " + time);
      return time;
    }
    words = words.filter(word => {
      if (isNaN(parseInt(word))) {
        return true;
      }
      return false;
    });
    time = words.join(" ");
    console.log("found casting time: " + time);
    return time;
  };
  let getRange = () => {
    let found = spellLines.filter(line => {
      let words = line.split(" ");
      if (words[0].includes("Range")) {
        return true;
      }
      return false;
    });
    if (found.length > 1) {
      console.log("multiple ranges found");
    }
    found = found[0];
    let words = found.split(" ");
    words.shift();
    return words.join(" ");
  };
  let getComponents = () => {
    let toggle = false;
    let found = spellLines.filter(line => {
      let words = line.split(" ");
      if (words[0].includes("Components")) {
        console.log("component start: " + words);
        if (line.includes("(")) {
          console.log("toggle on");
          toggle = true;
        } else {
          return true;
        }
      }
      if (line.includes(")") && toggle) {
        toggle = false;
        return true;
      }
      return toggle;
    });
    let foundStr = found.join(" ");
    console.log(foundStr);
    let words = foundStr.split(" ");
    words.shift();
    let components = [];
    for (let i = 0; i < words.length; i++) {
      if (words[0].length < 3) {
        if (components.length < 3) {
          components.push(words.shift()[0]);
        } else {
          let materials = words.join(" ");
          materials = materials.slice(1, materials.length - 1);
          components.push(materials);
          i = 9999;
        }
      } else {
        let materials = words.join(" ");
        materials = materials.slice(1, materials.length - 1);
        components.push(materials);
        i = 9999;
      }
    }
    return components;
  };
  let rowMinusHeader = header => {
    let found = spellLines.filter(line => {
      let words = line.split(" ");
      if (words[0].includes(header)) {
        return true;
      }
      return false;
    });
    let words = found[0].split(" ");
    words.shift();
    return words.join(" ");
  };
  let getDescription = () => {
    let descriptionStart = undefined;
    for (let i = 0; i < spellLines.length; i++) {
      if (spellLines[i].includes("Duration")) {
        descriptionStart = i + 1;
        i = 9999;
      }
    }
    let descriptionLines = spellLines.slice(
      descriptionStart,
      spellLines.length
    );
    return descriptionLines.join("\n");
  };
  const paragraphToWordsArray = paragraph => {
    let string = paragraph.split("\n").join(" ");
    return string.split(" ");
  };
  let getSaveStat = description => {
    let string = description.split("\n").join(" ");
    let words = string.split(" ");
    let saveIndex = undefined;
    for (let i = 0; i < words.length; i++) {
      if (words[i] === "saving" && words[i + 1].includes("throw")) {
        saveIndex = i - 1;
        i = 9999;
      }
    }
    //console.log(words[saveIndex] + " saving throw");
    if (words[saveIndex] === undefined) {
      return "None";
    }
    return words[saveIndex];
  };
  const getDamage = description => {
    const checkIsDice = string => {
      let isDice = true;
      for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] != "d") {
          isDice = false;
          return isDice;
        }
      }
      return isDice;
    };
    let words = paragraphToWordsArray(description);
    let baseDmg = [];
    let bonusDmg = [];
    let isBaseDmg = true;
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (!isNaN(word[0])) {
        if (isNaN(word)) {
          if (checkIsDice(word)) {
            //console.log(word);
            if (isBaseDmg) {
              baseDmg.push(word + " " + words[i + 1]);
            } else {
              bonusDmg.push(word);
            }
          }
        }
      }
      if (word === "At") {
        if (words[i + 1] === "Higher" && words[i + 2] === "Levels.") {
          isBaseDmg = false;
        }
      }
    }
    if (baseDmg.length < 1) {
      return;
    }
    let damage = baseDmg.join(" and ");
    if (bonusDmg.length > 0) {
      damage = damage + ` plus ${bonusDmg[0]} per spell level above base`;
    }
    return damage;
  };
  const cropText = () => {
    let startIndex = 0;
    for (let i = 0; i < spellLines.length; i++) {
      if (spellLines[i] === spellLines[i].toUpperCase()) {
        console.log("allcaps at line " + i);
        startIndex = i;
        break;
      }
    }
    return spellLines.slice(startIndex, spellLines.length);
  };
  spellLines = cropText();
  console.log("cropped lines:");
  console.log(spellLines);
  let spell = {
    spellId: generateId(6),
    level: getLevel(),
    spell_name: parseTitle(spellLines[0]),
    casting_time: getCastTime(),
    range: getRange(),
    components: getComponents(),
    duration: rowMinusHeader("Duration"),
    description: getDescription()
  };
  spell.save = getSaveStat(spell.description);
  spell.damage = getDamage(spell.description);
  //console.log(spell);
  return spell;
};

/*
fs.readFile("../testFiles/testSpellStr.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log("test file opened");
  let scanResult = JSON.parse(data);
  scanResult = scanResult[0];
  let lines = scanResult.text.split("\n");
  parseSpell(lines);
});
*/

module.exports = parseSpell;

//test set
/*
[
    "ARCANE LOCK",
    "2nd-level abjuration",
    "Casting Time: 1 action",
    "Range: Touch",
    "Components: V, S, M (gold dust worth at least 25 gp,",
    "which the spell consumes)",
    "Duration: Until dispelled",
    "You touch a closed door, window, gate, chest, or other",
    "entryway, and it becomes locked for the duration. You",
    "and the creatures you designate when you cast this",
    "spell can open the object normally. You can also set a",
    "password that, when spoken within 5 feet of the object,",
    "suppresses this spell for 1 minute. Otherwise, it is",
    "impassable until it is broken or the spell is dispelled or",
    "suppressed. Casting knock on the object suppresses",
    "arcane lock for 10 minutes",
    "While affected by this spell, the object is more difficult",
    "to break or force open; the DC to break it or pick any",
    "locks on it increases by 10",
    ""
  ]
  */
