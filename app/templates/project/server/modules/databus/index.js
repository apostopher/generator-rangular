'use strict';

var redis = require('redis');

module.exports = databusPlugin;

// Implementation ---

function databusPlugin(options, __, register) {
  var pubClient = redis.createClient(options.redis.port, options.redis.host);
  var subClient = redis.createClient(options.redis.port, options.redis.host);

  pubClient.on('error', errorHandler);
  subClient.on('error', errorHandler);

  var databus = {
    publish: publish,
    on: on
  };

  // register plugin
  register(null, {databus: databus});

  // Implementation ---

  function publish(channel, message) {
    pubClient.publish(channel, message);
  }

  function on(channel, callback) {
    subClient.on(channel, callback);
  }

  function errorHandler(error) {
    // TODO : setup good notification for errors. slack maybe?
    console.log(error);
  }

}
