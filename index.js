const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require('body-parser');



const { engine } = require("express-handlebars");
//database
const pool = require('/db/index');

//routers
const indexRouter =  require('./routes/index');
const peopleRouter =  require('./routes/people');
const eventsRouter =  require('./routes/events');

//handlebars setup
app.set('view engine', 'hbs');
app.engine( "hbs", engine({
  extname: "hbs",
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/',
  layoutsDir: __dirname + '/views/layouts'
}) );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// url setups
app.use('/', indexRouter);
app.use('/people', peopleRouter);
app.use('/events', eventsRouter);

app.get('/insert',function(req,res,next){
  var context = {};
    pool.query("INSERT INTO person VALUES (first_name,last_name,birth_day,gender,job,id_location,id_group)", [req.query.c], function(err, result){
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
    pool.query("INSERT INTO location VALUES (id,city,street,street_number,zip,country,name)", [req.query.c], function(err, result){
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
    pool.query("INSERT INTO event VALUES (id,datum,description,duration,name,id_location)", [req.query.c], function(err, result){
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
    pool.query("INSERT INTO person_event VALUES (id_person,id_event)", [req.query.c], function(err, result){
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
    pool.query("INSERT INTO work_group VALUES (id,name,manager)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});