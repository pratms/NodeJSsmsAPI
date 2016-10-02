var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb')
var mongojs = require('mongojs');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var accountSid = 'AC5b3a64ad844dfbb918812897bcf2a1ce'; 
var authToken = '8c055fe15f07533ff69388be72b93b16';  

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

client.messages.create({
    body: 'Hello manish,  pratik is here to recive you',
    to: '+12019203362',  
    from: '+16466528019' 
}, function(err) {
    console.log(err);
});

// view engine setup
var db = mongojs('mongodb://localhost/students', ['details']);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/posts', function(req, res){
  db.details.find(function(err, data) 
  {
  // if( err || !details) 
  //   console.log("No female details found");
  // else 
  //   details.forEach( function(data) {
     console.log(data);
     res.json(data);
  });



});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
