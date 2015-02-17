'use strict';

var client = 'client/';
var clientLocation = './' + client;
var indexFile = clientLocation + 'index.html';
var sourceLocation = clientLocation + 'src/';
var destLocation = clientLocation + 'build/';
var destFiles = destLocation + '**/*';

var server = 'server/';
var serverLocation = './' + server;

var allHtmlFiles = [
  clientLocation + 'src/**/*.html'
];
var allScssFiles = [
  clientLocation + 'src/**/*.base.scss',
  clientLocation + 'src/**/*.scss'
];

var allCssFiles = [
  clientLocation + 'src/**/*.base.css',
  clientLocation + 'src/**/*.css'
];

var allJsFiles = [
  clientLocation + 'src/**/*.js',
  './server/**/*.js'
];

var clientJsFiles = [
  clientLocation + 'src/**/*.module.js',
  clientLocation + 'src/**/*.js'
];

var wiredepOptions = {
  bowerJson: require('./bower'),
  directory: clientLocation + 'bower_components',
  ignorePath: ''
};

var injectOptions = {
  ignorePath: client
};

var optimized = {
  app: 'app.js',
  lib: 'lib.js'
};

var templateCache = {
  options: {
    module: '<%= name %>.core',
    standalone: false,
    root: 'src/',
    starttag: '<!-- inject:templates:js -->',
    ignorePath: client
  }
};

var nodemonOptions = {
  script: serverLocation + 'index.js',
  delayTime: 1,
  watch: [serverLocation]
};

var browserOptions = {
  proxy: 'localhost:3000',
  files: [clientLocation + 'src/**/*.js',
    clientLocation + 'src/**/*.html',
    clientLocation + 'src/**/*.css'],
  port: 8181,
  injectChanges: true,
  notify: true,
  reloadDelay: 0
};

// Configuration
module.exports = {
  client: client,
  clientLocation: clientLocation,
  destLocation: destLocation,
  destFiles: destFiles,
  indexFile: indexFile,
  allHtmlFiles: allHtmlFiles,
  allScssFiles: allScssFiles,
  sourceLocation: sourceLocation,
  allCssFiles: allCssFiles,
  allJsFiles: allJsFiles,
  clientJsFiles: clientJsFiles,
  wiredepOptions: wiredepOptions,
  injectOptions: injectOptions,
  optimized: optimized,
  templateCache: templateCache,
  nodemonOptions: nodemonOptions,
  browserOptions: browserOptions
};
