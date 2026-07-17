// Simple helper functions to read and write the JSON files in this folder.
// Since we are not using MongoDB yet, these JSON files act as our "database".

const fs = require("fs");
const path = require("path");

function readData(fileName) {
  const filePath = path.join(__dirname, fileName);
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

function writeData(fileName, data) {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
