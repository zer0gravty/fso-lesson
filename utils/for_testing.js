const palindrome = (str) => str.split('').reverse().join('');
const average = (arr) => (arr.length ? (arr.reduce((acc, ele) => acc + ele, 0) / arr.length) : 0);

module.exports = { palindrome, average };
