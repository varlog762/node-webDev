const os = require('os');

const { sayHi, userName } = require('./test');

const name = 'Gregory';

console.log(sayHi(name));
console.log(userName);

console.log(os.platform(), os.release());

module.exports = name;
