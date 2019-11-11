let vision = require("@google-cloud/vision");
let client = new vision.ImageAnnotatorClient();
const fs = require("fs");
const spellParser = require("./spellParser.js");

const credentials =
  "export GOOGLE_APPLICATION_CREDENTIALS=./cloud-vision/dnd-web-258417-4a4fd2f2b908";

//global variables for batching out api calls
let batches = [];
let batchIndex = 0;

//global spell library mangement variables
let LibIsOpen = false;
let spellLib = {};
const libFileName = "../testFiles/spellLibrary.json";

const sendBatch = () => {
  let curBatch = batches[batchIndex];
  curBatch.forEach(fileName => {
    spellToFile(fileName);
  });
  batchIndex++;
};

const writeFile = (filename, data, shouldStringify) => {
  if (shouldStringify) {
    data = JSON.stringify(data);
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

const openLibrary = () => {
  fs.readFile(libFileName, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    spellLib = JSON.parse(data);
    LibIsOpen = false;
  });
};

const addToLibrary = async spellObj => {
  if (!LibIsOpen) {
    await fs.readFile(libFileName, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      spellLib = JSON.parse(data);
      LibIsOpen = true;
    });
    if (spellLib.index.includes(spellObj.spell_name)) {
      console.log(spellObj.spell_name + "already in library");
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
  }
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
  let outputFileName = file.split(".").shift();
  outputFileName = outputFileName.split("/").pop();
  fs.writeFile(
    __dirname + "/spell-files/" + outputFileName + ".json",
    JSON.stringify(scanTextLines),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
  return scanTextLines;
};

const processScan = textObject => {
  let scanResult = textObject;
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

let readSpell = async fileName => {
  let readFile = __dirname + "/spell-images/" + fileName;
  let scannedLines = await scanToJSON(readFile);
  let spellObj = spellParser(scannedLines);
  return spellObj;
};

const spellToFile = async filePath => {
  let spell = await readSpell(filePath);
  let fileName = filePath.split(".").shift();
  writeFile(fileName, spell, true);
  addToLibrary(spell);
};

let args = process.argv.slice(2, process.argv.length);
if (args[0] === "--all") {
  fs.readdir(__dirname + "/spell-images", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("breaking spells folder");
    let batchNum = files.length / 5;
    if (files.length % batchNum > 0) {
      batchNum++;
    }
    batchNum = Math.floor(batchNum);
    console.log("splitting into " + batchNum);
    for (let j = 0; j < batchNum; j++) {
      let start = j * 5;
      let end = start + 5;
      if (end > files.length) {
        end = files.length;
      }
      batches.push(files.slice(start, end));
    }
    for (let k = 0; k < batches.length; k++) {
      setTimeout(sendBatch, k * 3500);
    }
  });
}
if (args[0].split(".").pop() === "png" || args[0].split(".").pop() === "jpg") {
  spellToFile(args[0]);
}
if (args[0] === "--update-library") {
  fs.readFile(libFileName, (err, data) => {
    if (err) {
      console.log(err);
    }
    spellLib = JSON.parse(data);
    LibIsOpen = true;
    fs.readdir(__dirname + "/spells/", async (err, files) => {
      if (err) {
        console.log(err);
      }
      let spellFiles = files;
      let allSpells = spellFiles.map(fileName => {
        let FileString = fs.readFileSync(
          __dirname + "/spells/" + fileName,
          "utf8"
        );
        return JSON.parse(FileString);
      });
      allSpells.forEach(spellObj => {
        if (spellLib.index.includes(spellObj.spell_name)) {
          console.log(spellObj.spell_name + "already in library");
        } else {
          spellLib.index.push(spellObj.spell_name);
          spellLvl = spellObj.level;
          spellLib = { ...spellLib, [spellObj.spellId]: spellObj };
          console.log(
            `spell ${spellObj.spell_name} added to library as id ${spellObj.spellId}`
          );
        }
      });
      let spellsByLvl = {};
      allSpells.forEach(spellObj => {
        let searchObj = {
          name: spellObj.spell_name,
          id: spellObj.spellId,
          time: spellObj.casting_time
        };
        if (spellsByLvl[spellObj.level] === undefined) {
          spellsByLvl[spellObj.level] = [];
        }
        spellsByLvl[spellObj.level] = spellsByLvl[spellObj.level].concat(
          searchObj
        );
      });
      spellLib.searchLib = spellsByLvl;
      //stringifying and writing library file back to disk
      let libJSON = JSON.stringify(spellLib, undefined, "\t");
      fs.writeFile(libFileName, libJSON, err => {
        if (err) {
          console.log(err);
        }
        console.log("library updated @" + libFileName);
      });
    });
  });
} else {
  console.log("unknown command");
}

module.exports = spellToFile;
