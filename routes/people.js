const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    const people = pool.query("SELECT * FROM people");
        res.render('people',{
            people: people.rows
    });
});

router.get('/view:id',async function (req, res, next) {
    const person = await pool.query(`SELECT * FROM people WHERE id_person = $1`, [req.params.id]);
            res.render('people', {
                people: person.rows
            });
});

router.post('/edit:id',async function (req, res, next) {
    const person = await pool.query(`UPDATE person SET first_name = $1, last_name = $2, birth_day = $3, gender = $4, job = $5 WHERE id = $6`, [req.body.firstname, req.body.lastname, req.body.birthDay, req.body.job, req.body.gender, req.params.id]);
    res.render('personView', {
        person: person.rows
    });
});

router.get('/edit:id',async function (req, res, next) {
    const person = await pool.query(`SELECT * FROM people WHERE id_person = $1`, [req.params.id]);
    res.render('personEdit', {
        person: person.rows
    });
});
module.exports = router;