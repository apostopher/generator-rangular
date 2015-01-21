/**
 * Created by Rahul on 21/1/15.
 */

'use strict';

var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');
var stylish = require('jshint-stylish');
var config = require('./gulp.config.json');

gulp.task('sass', function () {
  gulp.src('./client/src/**/*.scss')
    .pipe(plug.sass())
    .pipe(plug.concat('all.css'))
    .pipe(gulp.dest('./client/build/css'))
    .pipe(plug.minifyCss({keepBreaks:true}))
    .pipe(plug.rename({extname: '.min.css'}))
    .pipe(gulp.dest('./client/build/css'));

});

gulp.task('js', function(){
  var DEST = './client/build/js';
  return gulp.src(config.js_files)
    .pipe(plug.ngAnnotate())
    .pipe(plug.concat('all.js'))
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(plug.uglify())
    .pipe(plug.rename({extname: '.min.js'}))
    .pipe(gulp.dest(DEST));
});

gulp.task('img', function(){
  return gulp.src('./client/src/**/*.{jpg,png,gif,svg}')
    .pipe(plug.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./client/build/img'));
});

gulp.task('lint', function() {
  return gulp.src(['./client/src/**/*.js', './server/**/*.js'])
    .pipe(plug.jshint('./.jshintrc'))
    .pipe(plug.jshint.reporter(stylish));
});

gulp.task('build', ['lint','sass', 'js', 'img']);