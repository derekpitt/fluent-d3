var gulp = require('gulp');
var release = require('gulp-github-release');

var manifest = require('../../package.json');

gulp.task('release', function() {
  gulp.src([
      './dist/**/*',
      './package.json',
      './README.md'
    ])
    .pipe(release({
      tag: manifest.version,
      //notes: 'very good!',
      manifest: manifest
    }));
});
