(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './line-graph-builder'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./line-graph-builder'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lineGraphBuilder);
    global.index = mod.exports;
  }
})(this, function (exports, _lineGraphBuilder) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  _defaults(exports, _interopExportWildcard(_lineGraphBuilder, _defaults));
});