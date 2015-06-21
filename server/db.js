/**
 * Created by DavidHong on 2015. 6. 20..
 */

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/social', function() {
    console.log('mongodb connected');
})
module.exports = mongoose;

