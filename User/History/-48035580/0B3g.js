
SECRET_KEY = "our_secret"


const jwt = require('jsonwebtoken');


// make token
const token = jwt.sign({ email: "choi0415@hongkis.com" }, SECRET_KEY,
{ expiresIn: "24h",});
console.log(token);


// check token
const verified = jwt.verify(token, SECRET_KEY);
// get decode data
const decoded = jwt.decode(token);

// verified -> email / iat (unix time stamp when token made) / exp
console.log("verified"+verified);

console.log("decoded : "+decoded);

