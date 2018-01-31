(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'd3', './chart-builder'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('d3'), require('./chart-builder'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.d3, global.chartBuilder);
        global.donutGraphBuilder = mod.exports;
    }
})(this, function (exports, _d3, _chartBuilder) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _d32 = _interopRequireDefault(_d3);

    var colors = _d32['default'].scale.category20().range();
    //const defaultHover = <T extends HasValue>(d: T) => `d.value

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
            this.showHover = false;
            this.hover = function (a) {
                return '' + a.value;
            };
            this._tooltipDiv = null;
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
            key: 'withHover',
            value: function withHover(cb) {
                if (cb != null) this.hover = cb;
                this.showHover = true;
                return this;
            }
        }, {
            key: 'tooltipEnter',
            value: function tooltipEnter(d) {
                var _this = this;

                this._tooltipDiv = _d32['default'].select("body").append("div").attr("class", this.getClassProperty(d) + ' graph_tooltip').html(this.hover(d)).style("background-color", this.getColorProperty(d)).style("left", _d32['default'].event.pageX + 'px').style("top", _d32['default'].event.pageY + 'px');
                setTimeout(function () {
                    _this._tooltipDiv.attr("class", _this.getClassProperty(d) + ' graph_tooltip open');
                }, 1);
            }
        }, {
            key: 'tooltipLeave',
            value: function tooltipLeave() {
                if (this._tooltipDiv) this._tooltipDiv.remove();
            }
        }, {
            key: 'draw',
            value: function draw(where) {
                var _this2 = this;

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
                    _this2.mouseInCb(d.data);
                    if (_this2.showHover) _this2.tooltipEnter(d.data);
                }).on("mouseout", function (d) {
                    _this2.mouseOutCb(d.data);
                    if (_this2.showHover) _this2.tooltipLeave();
                }).attr("class", function (d) {
                    return _this2.getClassProperty(d.data);
                }).attr("d", arc).attr("fill", function (d, idx) {
                    return _this2.getColorProperty(d.data, idx);
                });
            }
        }]);

        return DonutGraphBuilder;
    })(_chartBuilder.ChartBuilder);

    exports.DonutGraphBuilder = DonutGraphBuilder;
});