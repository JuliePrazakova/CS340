var mysql = require('mysql');
//const handlebars = require('handlebars')
//working on making handlebars
const path = require('path');

var express = require('express');

var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'DogDb'
});
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO person VALUES (first_name,last_name,birth_day,gender,job,id_location,id_group)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO location VALUES (id,city,street,street_number,zip,country,name)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO event VALUES (id,datum,description,duration,name,id_location)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});


app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO person_event VALUES (id_person,id_event)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});


app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO work_group VALUES (id,name,manager)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});