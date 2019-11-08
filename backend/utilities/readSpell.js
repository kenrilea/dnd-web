let vision = require("@google-cloud/vision");
let client = new vision.ImageAnnotatorClient();
const fs = require("fs");
const spellParser = require("./spellParser.js");

const credentials =
  "export GOOGLE_APPLICATION_CREDENTIALS=./cloud-vision/witf-52d1a1543c18.json";

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
  fs.writeFile(outputFileName + ".json", JSON.stringify(scanTextLines), err => {
    if (err) {
      console.log(err);
    }
  });
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
};

let args = process.argv.slice(2, process.argv.length);
spellToFile(args[0]);
