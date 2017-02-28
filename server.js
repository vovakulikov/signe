/**
 * Created by Vova on 28.02.2017.
 */

var express = require('express');
var app = express();


app.use('/static', express.static(__dirname + '/demos/dist/_logFilter/'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});