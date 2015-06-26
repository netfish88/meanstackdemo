/**
 * Created by DavidHong on 2015. 6. 21..
 */

// var path = require('path');

var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../templates'));

router.get("/",function(req,res) {

    res.render('app.html.ejs')
});

module.exports = router;