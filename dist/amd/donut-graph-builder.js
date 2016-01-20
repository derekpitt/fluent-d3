define(['exports', 'd3', './chart-builder'], function (exports, _d3, _chartBuilder) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _d32 = _interopRequireDefault(_d3);

    var colors = _d32['default'].scale.category20().range();

    var DonutGraphBuilder = (function (_ChartBuilder) {
        _inherits(DonutGraphBuilder, _ChartBuilder);

        function DonutGraphBuilder() {
            _classCallCheck(this, DonutGraphBuilder);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _get(Object.getPrototypeOf(DonutGraphBuilder.prototype), 'constructor', this).apply(this, args);
            this.data = [];
            this.getColorProperty = function (a, idx) {
                return colors[idx % colors.length];
            };
            this.getClassProperty = function (a) {
                return null;
            };
            this.donutWidth = 20;
            this.mouseInCb = function (a) {
                return null;
            };
            this.mouseOutCb = function (a) {
                return null;
            };
        }

        _createClass(DonutGraphBuilder, [{
            key: 'withDonutWitdh',
            value: function withDonutWitdh(width) {
                this.donutWidth = width;
                return this;
            }
        }, {
            key: 'withData',
            value: function withData(data) {
                this.data = data;
                return this;
            }
        }, {
            key: 'withColor',
            value: function withColor(cb) {
                this.getColorProperty = cb;
                return this;
            }
        }, {
            key: 'withClass',
            value: function withClass(cb) {
                this.getClassProperty = cb;
                return this;
            }
        }, {
            key: 'onDataMouseIn',
            value: function onDataMouseIn(cb) {
                this.mouseInCb = cb;
                return this;
            }
        }, {
            key: 'onDataMouseOut',
            value: function onDataMouseOut(cb) {
                this.mouseOutCb = cb;
                return this;
            }
        }, {
            key: 'draw',
            value: function draw(where) {
                var _this = this;

                var _startDraw = this.startDraw(where);

                var svg = _startDraw.svg;
                var width = _startDraw.width;
                var height = _startDraw.height;

                var radius = Math.min(width, height) / 2;
                var donutGroup = svg.append("g").attr("transform", 'translate(' + width / 2 + ', ' + height / 2 + ')');
                var arc = _d32['default'].svg.arc().innerRadius(radius - this.donutWidth).outerRadius(radius);
                var pie = _d32['default'].layout.pie().value(function (d) {
                    return d.value;
                }).sort(null);
                donutGroup.selectAll("path").data(pie(this.data)).enter().append("path").on("mouseover", function (d) {
                    return _this.mouseInCb(d.data);
                }).on("mouseout", function (d) {
                    return _this.mouseOutCb(d.data);
                }).attr("class", function (d) {
                    return _this.getClassProperty(d.data);
                }).attr("d", arc).attr("fill", function (d, idx) {
                    return _this.getColorProperty(d.data, idx);
                });
            }
        }]);

        return DonutGraphBuilder;
    })(_chartBuilder.ChartBuilder);

    exports.DonutGraphBuilder = DonutGraphBuilder;
});