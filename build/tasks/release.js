var gulp = require('gulp');
var release = require('publish-release');

var manifest = require('../../package.json');

gulp.task('release', function(cb) {
  release({
    token: process.env.GITHUB_TOKEN,
    owner: 'derekpitt',
    repo: 'fluent-d3',
    tag: manifest.version
  }, function(err, release) {
    cb();
  });
});
