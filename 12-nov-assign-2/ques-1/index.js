const boxen = require('boxen');

const message = "I am using my first external module!"
const title = " Hurry..!!!"

// 1. Classic (default style)
console.log(boxen(message, { 
    title,
    color: 'white',
    borderStyle: 'classic',
    backgroundColor: 'green',
    padding: 1,
    
 }));

 // 2. SingleDouble border style
console.log(boxen(message, {
  title,
  borderStyle: 'singleDouble',
  backgroundColor: 'blue',
  padding: 1,
  color: 'white',
}));

// 3. Round border style
console.log(boxen(message, {
  title,
  borderStyle: 'round',
  backgroundColor: 'red',
    padding: 1,
    color: 'white',
}));