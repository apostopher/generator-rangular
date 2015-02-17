'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp.config');
var del = require('del');
var stylish = require('jshint-stylish');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');

// Tasks ---
gulp.task('default', $.taskListing);

gulp.task('clean', function(done){
  var toBeCleaned = [].concat(config.allCssFiles, config.destFiles);
  del(toBeCleaned, done);
});

gulp.task('lint', function(){
  return gulp.src(config.allJsFiles)
    .pipe($.jscs('./.jscsrc'))
    .pipe($.jshint('./.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});

gulp.task('styles', function(){
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

gulp.task('dev', ['lint', 'styles', 'bower'], function(){
  var allFiles = [].concat(config.allCssFiles, config.clientJsFiles);
  return gulp.src(config.indexFile)
    .pipe($.inject(gulp.src(allFiles, {read: false}), config.injectOptions))
    .pipe(gulp.dest(config.clientLocation));
});

gulp.task('serve', ['dev'], function(){
  return $.nodemon(config.nodemonOptions)
    .on('restart', function () {
      setTimeout(function () {
        browserSync.notify('reloading now...');
        browserSync.reload({stream: false});
      }, 1000);
    })
    .on('start', function () {
      startBrowserSync();
    });
});

gulp.task('build', ['clean', 'dev'], function(){
  var assets = $.useref.assets({searchPath: config.clientLocation});
  var cssFilter = $.filter('**/*.css');
  var jsAppFilter = $.filter('**/' + config.optimized.app);
  var jsLibFilter = $.filter('**/' + config.optimized.lib);
  var templateFile = void 0;
  gulp.src(config.allHtmlFiles)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(config.templateCache.options))
    .pipe($.header('"use strict";\n'))
    .pipe($.tap(function(file) {
      templateFile = file;
    }));
  return gulp.src(config.indexFile)
    .pipe($.plumber())
    .pipe(assets)
    .pipe($.tap(function(file){
      if(file.path.slice(-6) === config.optimized.app){
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

// Utilities ---
function watchScssFiles() {
  return gulp.watch(config.allScssFiles, ['styles']);
}

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  watchScssFiles();
  browserSync(config.browserOptions);
}
