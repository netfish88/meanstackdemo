/**
 * Created by DavidHong on 2015. 6. 20..
 */

var express     = require('express');
var bodyParser  = require('body-parser');

var app = express();
// express.static(__dirname + '/assets');

app.use(bodyParser.json());
app.use(require('./controllers'));

app.listen(3000, function() {
    console.log('Server listening on -', 3000)
});


