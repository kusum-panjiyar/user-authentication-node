const validator = require('validator')
const isEmail = require('validator/lib/isEmail')

console.log(validator.isEmail('kusum@gmail.com'))
console.log(isEmail('kusum@gamil.com'))