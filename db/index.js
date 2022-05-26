var mysql = require('mysql');
var con = mysql.createConnection({
    host  : 'localhost',
    user  : 'student',
    password: 'default',
    database: 'DogDb'
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;