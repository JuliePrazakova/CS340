const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    var context = {};
    pool.query("SELECT * FROM events", function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('events',context);
    });
});

router.get('/view:id',function(req,res,next){
    var context = {};
    pool.query("SELECT * FROM events WHERE id = ?;", [req.params.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('events', context);
    });
});

router.get('/edit:id',function(req,res,next){
    var context = {};
    pool.query("UPDATE event SET date = :date, description = :description, duration = :duration, name = :name WHERE id = ?;", [req.query.c, req.params.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('events',context);
    });
});

module.exports = router;