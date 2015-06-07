'use strict';

/*var pnrickmem = require('pubnub-rickshaw-memory');
 pnrickmem.init({dev: true});*/

var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compress = require('compression');
var cons = require('consolidate');
var args = require('yargs').argv;

module.exports = apiServer;

// Implementation ---

function apiServer(options, imports, register) {
  var app = express();
  var server = http.Server(app);

  app.use(bodyParser.json());
  app.use(compress());
  app.use(helmet());

  // connect to db
  imports.database.connect();

  // Connect websocket
  imports.realtime.init(server);

  // Connect client
  serveClient(app);

  server.listen((process.env.PORT || 3300), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('api server listening at http://%s:%s', host, port);
  });

  // Start module
  register(null);
}

function serveClient(app) {
  var webApp;
  if (isDev()) {
    webApp = path.join(__dirname, '/../../../client');
    app.use(express.static(webApp));
    app.use(express.static('./'));
  } else {
    webApp = path.join(__dirname, '/../../../client/build');
    app.use(express.static(webApp));
  }

  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  app.set('views', webApp);

  app.get('/', function (req, res) {
    res.render('index');
  });
}

function isDev() {
  var nodeEnv = process.env.NODE_ENV;
  return ((nodeEnv === 'dev') || args.dev);

}
