'use strict';

var _ = require('lodash');
var socketIO = require('socket.io');
var redis = require('socket.io-redis');

module.exports = realtimePlugin;

// Implementation ---

function realtimePlugin(options, imports, register) {
  var io;
  var realtime = {
    init: init,
    emitToUser: emitToUser,
    emitToUsers: emitToUsers,
    isUserOnline: isUserOnline
  };

  register(null, {realtime: realtime});

  // Implementation ---

  function init(server) {
    io = socketIO(server);
    io.adapter(redis(options.redis));
    io.on('connection', onConnect);
  }

  function isUserOnline(userId) {
    var room = io.sockets.adapter.rooms[userId];
    return (!!room && Object.keys(room).length > 0);
  }

  function emitToUsers(users, data) {
    return _.reduce(users, function (memo, user) {
      if (!emitToUser(user, data)) {
        // gather all users who are not online. we need to communicate with them via email maybe.
        memo.push(user);
      }
      return memo;
    }, []);
  }

  function emitToUser(userId, data) {
    var messageSent = false;
    if (isUserOnline(userId)) {
      io.to(userId).emit('message', data);
      messageSent = true;
    }
    return messageSent;
  }

  function onConnect(socket) {
    var authTimeout = setTimeout(function () {
      return connectToPublic(socket);
    }, options.auth.timeout);

    // Authenticate token
    socket.on('authenticate', function (tokenData) {
      clearTimeout(authTimeout);
      imports.jwt.verify(tokenData.token, function (error, decoded) {
        if (error) {
          console.log(error);
          disconnectFromPublic(socket);
          connectToPublic(socket);
          return;
        }
        // Leave public channel
        disconnectFromPublic(socket);

        socket.sub = decoded.sub;
        socket.join(decoded.sub);
        socket.on('message', dispatch);
        emitToUser(decoded.sub, {type: 'welcome', data: 'Welcome ' + decoded.sub});
      });
    });
  }

  function dispatch(data) {
    imports.databus.publish('message', data);
  }

  function publicDispatch(data) {
    imports.databus.publish('public', data);
  }

  function connectToPublic(socket) {
    socket.join('public');
    socket.emit('message', 'Connected to public channel');
    socket.on('message', publicDispatch);
  }

  function disconnectFromPublic(socket) {
    socket.leave('public');
    socket.removeListener('public', publicDispatch);
  }
}
