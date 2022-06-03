const express = require('express');
const router = express.Router();
const pool = require('../db/index').pool;

//set up the router
router.get('/', function(req, res,next) {
    var context = {};
    pool.query("SELECT * FROM person", function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('people',context);
    });
});

router.get('/view:id',function(req,res,next){
    var context = {};
    pool.query("SELECT * FROM person WHERE id = ?;", [req.params.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('people', context);
    });
});

router.get('/edit:id',function(req,res,next){
    var context = {};
    pool.query("UPDATE person SET first_name = first_name, last_name = :last_name, birth_day = :birth_day, gender = :gender, job = :job WHERE id = ?;", [req.query.c, req.params.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('people',context);
    });
});
module.exports = router;