/**
 * Created by minhnguy on 26.04.2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index.html');
})

module.exports = router;