'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config');
var del = require('del');
var stylish = require('jshint-stylish');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var path = require('path');
var glob = require('glob');
var plato = require('plato');
var args = require('yargs').argv;

// Tasks ---
gulp.task('default', $.taskListing);

gulp.task('clean', function (done) {
  var toBeCleaned = [].concat(config.allCssFiles, config.destFiles);
  del(toBeCleaned, done);
});

gulp.task('lint', function () {
  return gulp.src(config.allJsFiles)
    .pipe($.jscs('./.jscsrc'))
    .pipe($.jshint('./.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});

gulp.task('styles', function () {
  return gulp.src(config.allScssFiles)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 4%']}))
    .pipe(gulp.dest(config.sourceLocation));
});

gulp.task('bower', function () {
  return gulp.src(config.indexFile)
    .pipe(wiredep(config.wiredepOptions))
    .pipe(gulp.dest(config.clientLocation));
});

gulp.task('dev', ['lint', 'styles', 'bower'], function () {
  var allFiles = [].concat(config.allCssFiles, config.clientJsFiles);
  return gulp.src(config.indexFile)
    .pipe($.inject(gulp.src(allFiles, {read: false}), config.injectOptions))
    .pipe(gulp.dest(config.clientLocation));
});

gulp.task('serve', ['dev'], function (done) {
  return serve(false, done);
});

gulp.task('build', ['clean', 'dev'], function () {
  var assets = $.useref.assets({searchPath: config.clientLocation});
  var cssFilter = $.filter('**/*.css');
  var jsAppFilter = $.filter('**/' + config.optimized.app);
  var jsLibFilter = $.filter('**/' + config.optimized.lib);
  var templateFile = void 0;
  gulp.src(config.allHtmlFiles)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(config.templateCache.options))
    .pipe($.header('"use strict";\n'))
    .pipe($.tap(function (file) {
      templateFile = file;
    }));
  return gulp.src(config.indexFile)
    .pipe($.plumber())
    .pipe(assets)
    .pipe($.tap(function (file) {
      if (isAppJs(file.path)) {
        file.contents = Buffer.concat([file.contents, templateFile.contents]);
      }
    }))
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(jsLibFilter)
    .pipe($.uglify())
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.destLocation));
});

gulp.task('spec', function () {
  log('building specRunner.html');
  return buildSpecFile();
});

gulp.task('serve-spec', ['spec'], function (done) {
  return serve(true, done);
});

gulp.task('plato', function(done) {
  log('Analyzing source with Plato');
  log('Browse to /report/plato/index.html to see Plato results');

  startPlatoVisualizer(done);
});

// Utilities ---
function log(message) {
  $.util.log($.util.colors.blue('*** ' + message));
}
function isAppJs(url) {
  return (url.split(path.sep).pop() === config.optimized.app);
}

function watchScssFiles() {
  return gulp.watch(config.allScssFiles, ['styles']);
}

function watchNewFiles() {
  return gulp.watch(config.allClientFiles, function (event) {
    if (event.type === 'added' || event.type === 'deleted') {
      buildSpecFile();
    }
  });
}

function buildSpecFile() {
  var wiredepOptions = config.wiredepOptions;
  wiredepOptions.devDependencies = true;
  return gulp.src(config.specRunner)
    .pipe(wiredep(wiredepOptions))
    .pipe($.inject(gulp.src(config.testLibs, {read: false}), {name: 'inject:testlibraries'}))
    .pipe($.inject(gulp.src(config.clientJsFiles, {read: false})))
    .pipe($.inject(gulp.src(config.clientSpecFiles, {read: false}), {name: 'inject:specs'}))
    .pipe(gulp.dest(config.clientLocation));
}

function serve(isSpec, done) {
  $.nodemon(config.nodemonOptions)
    .on('restart', function () {
      setTimeout(function () {
        browserSync.notify('reloading now...');
        browserSync.reload({stream: false});
      }, 1000);
    })
    .on('start', function () {
      setTimeout(function () {
        startBrowserSync(isSpec);
        watchScssFiles();
        watchNewFiles();
      }, 1000);
    });
  done();
}

function startBrowserSync(isSpec) {
  if (browserSync.active) {
    return;
  }
  var options = config.browserOptions;
  if (isSpec) {
    options.startPath = config.specRunnerFile;
  }
  browserSync(options);
}

function startPlatoVisualizer(done) {
  log('Running Plato');

  var files = glob.sync(config.plato.js);
  var excludeFiles = /.*\.spec\.js/;

  var options = {
    title: 'Plato Inspections Report',
    exclude: excludeFiles
  };
  var outputDir = config.report + '/plato';

  plato.inspect(files, outputDir, options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    if (args.verbose) {
      log(overview.summary);
    }
    if (done) { done(); }
  }
}
