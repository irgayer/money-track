var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConfig = require('./config/database.config');
var mongoose = require('mongoose');

var AccountController = require('./controllers/AccountController');
var CategoryController = require('./controllers/CategoryController');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Databse Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/accounts', AccountController.all);
app.post('/accounts', AccountController.create);
app.delete('/accounts/:id', AccountController.delete);

app.get('/categories', CategoryController.all);
app.post('/categories', CategoryController.create);
app.delete('/categories/:id', CategoryController.delete);

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
