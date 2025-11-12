const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'data.txt');

// Function to read file content
function readFileData() {
    const data = fs.readFileSync('./data.txt', 'utf8');
    console.log( data);
}

// Function to append data to the file
function appendFileData() {
    fs.appendFileSync('./data.txt', '\nThis is Appended data');
  
}

module.exports = {
    readFileData,
    appendFileData
};
