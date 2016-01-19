System.register(['./line-graph-builder', './donut-graph-builder', './spark-builder'], function (_export) {
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
    }, function (_sparkBuilder) {
      for (var _key3 in _sparkBuilder) {
        if (_key3 !== 'default') _export(_key3, _sparkBuilder[_key3]);
      }
    }],
    execute: function () {}
  };
});