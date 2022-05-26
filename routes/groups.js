const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    var context = {};
    pool.query("SELECT * FROM work_group", function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('group',context);
    });

});
router.get('/view:id',function(req,res,next){
    var context = {};
    pool.query("SELECT * FROM work_group WHERE id = ?;", [req.params.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('group', context);
    });
});


module.exports = router;