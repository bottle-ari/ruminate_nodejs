const jwt = require('jsonwebtoken');

const token = jwt.sign({ email: "choi0415@hongkis.com" }, "our_secret");
console.log(token);