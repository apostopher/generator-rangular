'use strict';

module.exports = [
  {packagePath: './modules/api'},
  {packagePath: './modules/database', url: 'localhost', name: '<%= name %>'},
  {packagePath: './modules/databus', redis: {host: 'localhost', port: 6379}},
  {packagePath: './modules/realtime', redis: {host: 'localhost', port: 6379}, auth: {timeout: 2000}},
  {packagePath: './modules/jwt', auth: {expires: 45000, secret: 'shhhh....', issuer: 'Rahul Devaskar'}}
];
