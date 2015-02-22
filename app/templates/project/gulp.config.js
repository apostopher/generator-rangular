'use strict';

var wiredep = require('wiredep');
var bowerFiles = wiredep({devDependencies: true}).js;
var client = 'client/';
var clientLocation = client;
var indexFile = clientLocation + 'index.html';
var sourceLocation = clientLocation + 'src/';
var destLocation = clientLocation + 'build/';
var destFiles = destLocation + '**/*';
var report = clientLocation + 'report/';

var server = 'server/';
var serverLocation = './' + server;

var nodeServer = serverLocation + 'index.js';
var testServerPort = 8888;

var allClientFiles = clientLocation + 'src/**/*.{html,js,css}';

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
  clientLocation + 'src/**/*.js',
  '!' + clientLocation + 'src/**/*.spec.js'
];

var clientSpecFiles = [
  clientLocation + 'src/**/*.spec.js'
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
  watch: [serverLocation],
  env: {
    'NODE_ENV': 'dev'
  }
};

var browserOptions = {
  proxy: 'localhost:' + (process.env.PORT || 3000),
  files: [clientLocation + 'src/**/*.js',
    clientLocation + 'src/**/*.html',
    clientLocation + 'src/**/*.css'],
  port: 8181,
  injectChanges: true,
  notify: true,
  reloadDelay: 0
};

var karma = {
  files: [].concat(bowerFiles, clientJsFiles),
  exclude: [],
  preprocessors: {},
  coverage: {
    dir: report + 'coverage',
    reporters: [
      {type: 'html', subdir: 'report-html'},
      {type: 'text-summary'}
    ]
  }
};

var testLibs = [
  'node_modules/mocha/mocha.js',
  'node_modules/sinon/lib/sinon.js',
  'node_modules/sinon/lib/sinon/**/*.js',
  'node_modules/chai/chai.js',
  'node_modules/mocha-clean/index.js',
  'node_modules/sinon-chai/lib/sinon-chai.js'
];

var plato = {
  js: clientLocation + 'src/**/*.js'
};

var specRunnerFile = 'specs.html';
var specRunner = clientLocation + specRunnerFile;

karma.preprocessors[sourceLocation + '**/!(*.spec)+(.js)'] = ['coverage'];

// Configuration
module.exports = {
  client: client,
  clientLocation: clientLocation,
  destLocation: destLocation,
  destFiles: destFiles,
  indexFile: indexFile,
  allClientFiles: allClientFiles,
  allHtmlFiles: allHtmlFiles,
  allScssFiles: allScssFiles,
  sourceLocation: sourceLocation,
  allCssFiles: allCssFiles,
  allJsFiles: allJsFiles,
  clientJsFiles: clientJsFiles,
  clientSpecFiles: clientSpecFiles,
  wiredepOptions: wiredepOptions,
  injectOptions: injectOptions,
  optimized: optimized,
  templateCache: templateCache,
  nodemonOptions: nodemonOptions,
  browserOptions: browserOptions,
  karma: karma,
  report: report,
  nodeServer: nodeServer,
  testServerPort: testServerPort,
  specRunner: specRunner,
  specRunnerFile: specRunnerFile,
  testLibs: testLibs,
  plato: plato
};
