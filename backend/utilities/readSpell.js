let vision = require("@google-cloud/vision");
let client = new vision.ImageAnnotatorClient({ projectID: keyPath });
const fs = require("fs");

const scanToJSON = async file => {
  console.log("sending " + file);
  let sendTime = new Date().getTime();
  let scanResult = await client.testDetection(file);
  console.log("file returned in " + new Date().getTime() - sendTime + " ms");
  let scanOutput = scanResult.map(result => {
    let output = result.fullTextAnnotation;
    console.log(output);
    return output;
  });
  let scanJSON = JSON.stringify(scanOutput);
  fs.writeFile(__dirname + "/testOutput.json", scanJSON, err => {
    if (err) {
      console.log(err);
    }
    console.log("file written");
  });
};

let testFile = __dirname + "/test.png";
scanToJSON(testFile);
