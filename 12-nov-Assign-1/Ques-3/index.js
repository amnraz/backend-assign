
const factorial = require('./factorial');

const number = [5, 7, 10,13]; 
number.forEach(num => {
    console.log(`Factorial of ${num} is ${factorial(num)}`);
});

const { readFileData, appendFileData } = require('./fileOperations');

console.log("initial File Content...");
readFileData();




console.log("Appending Data...");
appendFileData();




console.log("Updated File Content...");
readFileData();

