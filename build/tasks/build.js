var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var ts = require('gulp-typescript');
var to5 = require('gulp-babel');

var tsProject = ts.createProject(paths.root + 'tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('build-es6', function() {
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(paths.output + 'es6/'));
});

gulp.task('build-amd', function() {
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(to5({
      modules: 'amd'
    }))
    .pipe(gulp.dest(paths.output + 'amd/'));
});

gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(to5({
      modules: 'system'
    }))
    .pipe(gulp.dest(paths.output + 'system/'));
});

gulp.task('build-common', function() {
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(to5({
      modules: 'common'
    }))
    .pipe(gulp.dest(paths.output + 'common/'));
});

gulp.task('build-umd', function() {
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(to5({
      modules: 'umd'
    }))
    .pipe(gulp.dest(paths.output + 'umd/'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-es6',
    'build-amd',
    'build-system',
    'build-common',
    'build-umd',
    callback
  );
});
