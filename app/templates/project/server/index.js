'use strict';

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var compress = require('compression');
var cons = require('consolidate');
var args = require('yargs').argv;

var app = express();

app.use(compress());
app.use(helmet());

var webApp;
if (isDev()) {
  webApp = path.join(__dirname, '/../client');
  app.use(express.static(webApp));
  app.use(express.static('./'));
} else {
  webApp = path.join(__dirname, '/../client/build');
  app.use(express.static(webApp));
}

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', webApp);

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen((process.env.PORT || 3000), onStart);

//Implementation ---

function onStart() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('<%= name %> server listening at http://%s:%s', host, port);
}

function isDev() {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'dev') {
    return true;
  } else if (args.dev) {
    return true;
  } else {
    return false;
  }
}
