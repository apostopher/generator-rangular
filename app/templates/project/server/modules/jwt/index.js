'use strict';

var jwt = require('jsonwebtoken');

module.exports = jwtPlugin;

//Implementation ---

function jwtPlugin(options, __, register) {
  var jwtService = {
    generate: generate,
    verify: verify
  };
  register(null, {jwt: jwtService});

  // Implementation ---

  function generate(subject, expires) {
    return jwt.sign({}, options.auth.secret, {
      subject: subject,
      expiresInMinutes: (expires || options.auth.expires),
      issuer: options.auth.issuer
    });
  }

  function verify(token, callback) {
    jwt.verify(token, options.auth.secret, function (error, decoded) {
      if (error) {
        return callback(error);
      }
      if (decoded.iss !== options.auth.issuer) {
        return callback(new Error('Invalid token'));
      }
      return callback(null, decoded);
    });
  }
}

