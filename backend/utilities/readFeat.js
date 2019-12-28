let vision = require("@google-cloud/vision");
let client = new vision.ImageAnnotatorClient();
const fs = require("fs");
const spellParser = require("./spellParser.js");

const credentials =
  "export GOOGLE_APPLICATION_CREDENTIALS=./cloud-vision/dnd-web-258417-4a4fd2f2b908.json";

const writeFile = (filename, data, shouldStringify) => {
  if (shouldStringify) {
    data = JSON.stringify(data, undefined, "\t");
    fs.writeFile(`${__dirname}/spells/${filename}.json`, data, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("json file written");
      return;
    });
  } else {
    console.log("writing to disk as " + __dirname + filename + ".js");
    fs.writeFile(__dirname + "/" + filename + ".js", data, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("file written");
      return;
    });
  }
};

const addToLibrary = spellObj => {
  let libFileName = "../testFiles/spellLibrary.json";
  fs.readFile(libFileName, (err, data) => {
    if (err) {
      console.log(err);
    }
    let spellLib = JSON.parse(data);
    if (spellLib.index.includes(spellObj.spell_name)) {
      console.log("spell already in library");
      return;
    }
    spellLib.index.push(spellObj.spell_name);
    spellLvl = spellObj.level;
    spellLib = { ...spellLib, [spellObj.spellId]: spellObj };
    console.log(
      `spell ${spellObj.spell_name} added to library as id ${spellObj.spellId}`
    );
    writeData = JSON.stringify(spellLib);
    fs.writeFile(libFileName, writeData, err => {
      if (err) {
        console.log(err);
      }
      console.log("library file written");
    });
  });
};

const scanToJSON = async file => {
  console.log("sending " + file);
  let sendTime = new Date().getTime();
  let scanResult = await client.textDetection(file);
  console.log("file returned in " + new Date().getTime() - sendTime + " ms");
  let scanOutput = scanResult.map(result => {
    let output = result.fullTextAnnotation;
    console.log(output);
    return output;
  });
  let scanTextLines = processScan(scanOutput);
  //let fileName = __dirname + "/rawDruidSpells.js";
  return scanTextLines;
};

const featParser = scanLines => {
  let titleIndexs = [];
  for (let i = 0; i < scanLines.length; i++) {
    if (scanLines[i] === scanLines[i].toUpperCase()) {
      titleIndexs.push(i);
    }
  }
  let featList = [];
  for (let j = 0; j < titleIndexs.length; j++) {
    let feat = scanLines.slice(titleIndexs[j], titleIndexs[j + 1]);
    featList.push(feat);
  }
  return featList;
};

const processScan = textObject => {
  let scanResult = textObject;
  if (scanResult === null || scanResult === undefined) {
    return [];
  }
  let lines = scanResult[0].text.split("\n");
  console.log(lines);
  return lines;
  /*
  console.log("saving...");
  fs.writeFile(__dirname + "/druidSpellArray.js", lines, err => {
    if (err) {
      console.log(err);
    }
    console.log("file written");
  });
  */
};

const processScanFile = async file => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let scanResult = JSON.parse(data);
    //let scanResult = data;
    let lines = scanResult[0].text.split("\n");
    console.log(lines);
    console.log("saving...");
    fs.writeFile(__dirname + "/druidSpellArray.js", lines, err => {
      if (err) {
        console.log(err);
      }
      console.log("file written");
    });
  });
};

let readFeat = async fileName => {
  let readFile = __dirname + "/feat-images/" + fileName;
  fs.readdir(__dirname + "/feat-images/", (err, featFiles) => {
    Promise.all(
      featFiles.map(async fileName => {
        let scannedLines = await scanToJSON(
          __dirname + "/feat-images/" + fileName
        );
        let featList = featParser(scannedLines);
        return featList;
      })
    ).then(featList => {
      console.log("all feats scanned");
      console.log(featList);
      let allFeats = [];
      featList.forEach(smallList => {
        allFeats.concat(smallList);
      });
      console.log(allFeats);
    });
  });
};

const featToFile = async filePath => {
  let feats = await readFeat();
  //writeFile(fileName, spell, true);
  //addToLibrary(spell);
};

let args = process.argv.slice(2, process.argv.length);
featToFile();
