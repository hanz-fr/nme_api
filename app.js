require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// LIST OF REGISTERED ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var siswaRouter = require('./routes/siswa');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/siswa', siswaRouter);

module.exports = app;
