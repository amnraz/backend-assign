const isPrime = require('./isPrime');

const number = [2, 10, 17, 21, 29];

number.forEach(num => {
    if (isPrime(num)) {
        console.log(`${num} is a prime number.`);
    } else {
        console.log(`${num} is not a prime number.`);
    }
});