var mysql = require('mysql');
var pool = mysql.createPool({
    host  : 'classmysql.engr.oregonstate.edu',
    user  : 'cs340_seabramg',
    password: '7316',
    database: 'cs340_seabramg'
});

/*
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});*/

module.exports.pool = pool;
