const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    const people = pool.query("SELECT * FROM person");
        res.render('people',{
            people: people.rows
    });
});

router.get('/view:id',async function (req, res, next) {
    const person = await pool.query(`SELECT * FROM person WHERE id_person = $1`, [req.params.id]);
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
    const person = await pool.query(`SELECT * FROM person WHERE id_person = $1`, [req.params.id]);
    res.render('personEdit', {
        person: person.rows
    });
});

router.get('/add',async function (req, res, next) {
    const id_location = await pool.query(`SELECT id_location from location WHERE city = $1 AND street = $2 AND street_number = $3`, [req.body.city, req.body.street_name, req.body.street_number])
    pool.query(`INSERT INTO person (first_name, last_name, birth_day, gender, job, id_location)VALUES ($1, $2, $3, $4, $5, $6)`, [req.body.firstname, req.body.lastname, req.body.birthDay, req.body.job, req.body.gender, id_location]);

    const people = pool.query("SELECT * FROM person");
    res.render('people', {
        people: people.rows
    });
});

router.post('/delete/id', async (req, res, next) => {
    pool.query(`DELETE FROM person WHERE id_person = $1`, [req.params.id], async(err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
})

module.exports = router;