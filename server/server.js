var express = require('express');
// var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
// var bodyParser = require('body-parser');

var app = express();

app.use(cors({ allowedOrigins: ['localhost:3000']}));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000);

module.exports = app;