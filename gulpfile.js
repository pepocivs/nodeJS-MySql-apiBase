'use strict';

var gulp   = require('gulp');
var eslint = require('gulp-eslint');

// Lint Javascript
gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', '**/{*.js,*.html}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
