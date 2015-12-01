var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var ts = require('gulp-typescript');
var to5 = require('gulp-babel');
var replace = require('gulp-replace');

var tsProject = ts.createProject(paths.root + 'tsconfig.json', {
  typescript: require('typescript')
});

var dtsFile = paths.output + 'fluent-d3.d.ts';

gulp.task('build-dts', function() {
  console.log(require('dts-generator'));
  return require('dts-generator').default({
    name: 'fluent-d3',
    baseDir: './src',
    files: ['index.ts'],
    out: dtsFile
  });
});

gulp.task('build-dts-fix', function() {
  return gulp.src(dtsFile)
    .pipe(replace('declare module \'fluent-d3/index\'', 'declare module \'fluent-d3\''))
    .pipe(gulp.dest(paths.output))
    .pipe(gulp.dest(paths.output + 'amd/')); // also output here, since we are using amd for jspm so it can be included in there.
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
    'build-dts',
    'build-dts-fix',
    callback
  );
});
