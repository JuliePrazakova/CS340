const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    const groups = pool.query("SELECT * FROM work_group");
        res.render('group',{
            groups: groups.rows
        });
});

router.post('/edit:id',async function (req, res, next) {
    const group = await pool.query(`UPDATE work_group SET name = $1, description = $2, manager = $3  WHERE id = $4`, [req.body.name, req.body.description, req.body.manager, req.params.id]);
    res.render('groupView', {
        group: group.rows
    });
});

router.get('/edit:id',async function (req, res, next) {
    const group = await pool.query(`SELECT * FROM work_group WHERE id_group = $1`, [req.params.id]);
    res.render('groupEdit', {
        group: group.rows
    });
});

router.get('/view:id',async function (req, res, next) {
    const group = await pool.query(`SELECT * FROM work_group WHERE id_group = $1`, [req.params.id]);
    res.render('groupView', {
        group: group.rows
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

router.get('/add',async function (req, res, next) {
    pool.query(`INSERT INTO work_group (name, description, manager)VALUES ($1, $2, $3)`, [req.body.name, req.body.description, req.body.manager]);

    const groups = pool.query("SELECT * FROM work_group");
    res.render('groups', {
        groups: groups.rows
    });
});

router.post('/delete/id', async (req, res, next) => {
    pool.query(`DELETE FROM work_group WHERE id_group = $1`, [req.params.id], async(err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
})

module.exports = router;