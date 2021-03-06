var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// const passport = require('./config/passport');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();



var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var postRouter = require('./routes/posts');

var app = express();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true ,
  useUnifiedTopology: true
}, ()=>console.log('Connected to DB'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Open connection!")
  // we're connected!
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', apiRouter);
app.use('/api/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
