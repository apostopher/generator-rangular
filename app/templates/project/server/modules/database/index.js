/**
 * Created by Rahul on 31/1/15.
 */

'use strict';

var app = require('express')();
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect('mongodb://' + config.url + '/' + config.name);

module.exports = app;
