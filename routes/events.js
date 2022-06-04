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

module.exports = router;