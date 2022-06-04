const express = require('express');
const router = express.Router();
const pool = require('/db/index');

//set up the router
router.get('/', async (req, res) => {
    const events = pool.query("SELECT * FROM events");
         res.render('events',{
             events: events.rows
         });
});
router.post('/edit:id',async function (req, res, next) {
    const event = await pool.query(`UPDATE events SET name = $1, duration = $2, date = $3, description = $4, job = $5 WHERE id = $6`, [req.body.name, req.body.duration, req.body.date, req.body.description, req.params.id]);
    res.render('eventView', {
        event: event.rows
    });
});

router.get('/edit:id',async function (req, res, next) {
    const event = await pool.query(`SELECT * FROM events WHERE id_event = $1`, [req.params.id]);
    res.render('eventEdit', {
        event: event.rows
    });
});

router.get('/view:id',async function (req, res, next) {
    const event = await pool.query(`SELECT * FROM events WHERE id_event = $1`, [req.params.id]);
    res.render('eventView', {
        people: event.rows
    });
});

router.get('/add',async function (req, res, next) {
    const id_location = await pool.query(`SELECT id_location from location WHERE city = $1 AND street = $2 AND street_number = $3`, [req.body.city, req.body.street_name, req.body.street_number])
    pool.query(`INSERT INTO event (date, description, duration, name, id_location)VALUES ($1, $2, $3, $4, $5)`, [req.body.date, req.body.description, req.body.duration, req.body.name, id_location]);

    const events = pool.query("SELECT * FROM events");
    res.render('events', {
        events: events.rows
    });
});

router.post('/delete/id', async (req, res, next) => {
    pool.query(`DELETE FROM events WHERE id_event = $1`, [req.params.id], async(err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
})

module.exports = router;