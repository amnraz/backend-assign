function factorial(n) {
    if (n < 0) {
        return "Undefined for negative numbers";
    } else if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
module.exports = factorial