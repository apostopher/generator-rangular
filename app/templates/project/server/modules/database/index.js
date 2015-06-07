'use strict';

var mongoose = require('mongoose');

module.exports = databasePlugin;

// Implementation ---
function databasePlugin(options, __, register) {
  var database = {
    connect: connect
  };

  return register(null, {database: database});

  // Implementation ---
  function connect() {
    mongoose.connect('mongodb://' + options.url + '/' + options.name);
  }
}

