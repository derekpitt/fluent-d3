var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  source: [
    appRoot + '../node_modules/typescript/bin/lib.es6.d.ts',
    appRoot + '**/*.ts'
  ],
  output: 'dist/',
  packageName: pkg.name
};
