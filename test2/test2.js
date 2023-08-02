console.log("console log : test2 file")

const multiply = function (a, b) {return a * b};
const subtract = function (a,b) {return a-b};

module.exports ={multiply,subtract}
/*
위 방법 대신에
module.exports.multiply = multiply
module.exports.subtract = subtract
*/