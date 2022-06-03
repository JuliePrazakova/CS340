const express = require('express');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const pool = require('../db/index');

//set up the router
router.get('/', function(req, res) {
    res.render('index.hbs');

});

module.exports = router;