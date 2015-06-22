/**
 * Created by DavidHong on 2015. 6. 21..
 */
var path = require('path');
var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../ng'));
console.log(express.static(__dirname + '/../ng'));

router.get("/",function(req,res) {
    res.sendFile(path.join(__dirname, '../layouts', 'posts.html'));
});

module.exports = router;
