const express = require('express');
  path = require('path'),    
  bodyParser = require('body-parser'),
  dotenv = require('dotenv'),
  app = express();

var index = require('./routes/index');

// process env file
dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

console.log("---- " + process.env.ENV_DATABASE_NAME);

// connect to mongo
require('./mongo/connect')(process.env.ENV_DATABASE_HOST,process.env.ENV_DATABSE_NAME,process.env.ENV_DATABSE_SECRET);

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
