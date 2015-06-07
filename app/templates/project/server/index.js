'use strict';

var architect = require('architect');
var deps = require('./index.config');

var tree = architect.resolveConfig(deps, __dirname);

// Start app
architect.createApp(tree, appStarted);

// Implementation ---
function appStarted() {
  console.log('app started');
}

