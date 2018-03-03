'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    babel = require("gulp-babel"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano'),
    svg = require('postcss-inline-svg'),
    svgo = require('postcss-svgo');

gulp.task('sass', function () {
  return gulp.src('./source/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      svg(),
      svgo(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('js', function () {
  return gulp.src('source/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('default', function () {
  livereload.listen();
  gulp.watch('./source/*.js', ['js']);
  gulp.watch('./source/style/**/*.scss', ['sass']);
});
