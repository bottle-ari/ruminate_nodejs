var mysql = require('mysql');
var db = mysql.createConnection({
    host: '34.64.158.118',
    user: 'root',
    password: 'ols0415&*',
    database: 'test_todo'
});
db.connect();

module.exports = db;