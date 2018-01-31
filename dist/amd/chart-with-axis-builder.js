define(['exports', './axis-builder', './chart-builder'], function (exports, _axisBuilder, _chartBuilder) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var ChartWithAxisBuilder = (function (_ChartBuilder) {
        _inherits(ChartWithAxisBuilder, _ChartBuilder);

        function ChartWithAxisBuilder() {
            _classCallCheck(this, ChartWithAxisBuilder);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _get(Object.getPrototypeOf(ChartWithAxisBuilder.prototype), 'constructor', this).apply(this, args);
            this.axisBuilder = new _axisBuilder.AxisBuilder();
            this.elements = [];
        }

        _createClass(ChartWithAxisBuilder, [{
            key: 'configureAxis',
            value: function configureAxis(configurer) {
                this.axisBuilder = new _axisBuilder.AxisBuilder();
                configurer(this.axisBuilder);
                return this;
            }
        }, {
            key: 'drawElements',
            value: function drawElements(svg, x, y, width, height) {
                this.elements.forEach(function (e) {
                    e.draw(svg, x, y, width, height);
                });
                var elementsWithLegend = this.elements.filter(function (e) {
                    return e.legendName.length > 0;
                });
                this.drawLegend(elementsWithLegend);
            }
        }, {
            key: 'draw',
            value: function draw(where) {
                var _startDraw = this.startDraw(where);

                var svg = _startDraw.svg;
                var width = _startDraw.width;
                var height = _startDraw.height;

                var _axisBuilder$getXYScales = this.axisBuilder.getXYScales(width, height);

                var x = _axisBuilder$getXYScales.x;
                var y = _axisBuilder$getXYScales.y;

                this.axisBuilder.draw(svg, x, y, width, height);
                this.drawElements(svg, x, y, width, height);
            }
        }]);

        return ChartWithAxisBuilder;
    })(_chartBuilder.ChartBuilder);

    exports.ChartWithAxisBuilder = ChartWithAxisBuilder;
});