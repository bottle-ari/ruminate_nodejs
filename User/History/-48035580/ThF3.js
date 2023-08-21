
SECRET_KEY = "our_secret"


const jwt = require('jsonwebtoken');


// make token
const token = jwt.sign({ email: "choi0415@hongkis.com" }, SECRET_KEY,
{ expiresIn: "24h",});
console.log(token);


// check token
const verified = jwt.verify(token, SECRET_KEY);
console.log(verified);