System.register(['./line-graph-builder', './donut-graph-builder'], function (_export) {
  'use strict';

  return {
    setters: [function (_lineGraphBuilder) {
      for (var _key in _lineGraphBuilder) {
        if (_key !== 'default') _export(_key, _lineGraphBuilder[_key]);
      }
    }, function (_donutGraphBuilder) {
      for (var _key2 in _donutGraphBuilder) {
        if (_key2 !== 'default') _export(_key2, _donutGraphBuilder[_key2]);
      }
    }],
    execute: function () {}
  };
});