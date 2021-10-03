const validator = require('validator');

console.log(validator.isEmail('minhvu72826@gmail.com'));

console.log(validator.isEmail('minhvu72826gmail.com'));

console.log(validator.isURL('https://mead.io'));

console.log(validator.isURL('https:/mead.io'));