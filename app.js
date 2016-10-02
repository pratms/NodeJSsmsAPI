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


// view engine setup
var db = mongojs('mongodb://localhost/students', ['details']);

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.get('/', function(req, res, next) {
var accountSid = 'AC5b3a64ad844dfbb918812897bcf2a1ce'; 
var authToken = '8c055fe15f07533ff69388be72b93b16';  

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

client.messages.create({
    body: 'Hello from Pratik Modak',
    to: '+19292168151',  
    from: '+16466528019' 
}, function(err) {
    console.log(err);
}
);
  res.render('index', {  
   body: 'Twilio will send "Hello from Pratik Modak" to ',
    to: '+1 (929)216-8151',  
    from: '+16466528019'  });
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
