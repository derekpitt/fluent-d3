'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _chartBuilder = require('./chart-builder');

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

function defaultToolTipTemplate(data) {
    return '' + data.value;
}

var SparkBuilder = (function (_ChartBuilder) {
    _inherits(SparkBuilder, _ChartBuilder);

    function SparkBuilder() {
        _classCallCheck(this, SparkBuilder);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(SparkBuilder.prototype), 'constructor', this).apply(this, args);
        this.data = [];
        this.className = "";
        this.pointSize = 3;
        this._tooltipDiv = null;
        this.showPoints = false;
        this.showPointHover = false;
        this.hoverTemplate = defaultToolTipTemplate;
    }

    _createClass(SparkBuilder, [{
        key: 'withData',
        value: function withData(data) {
            this.data = data;
            return this;
        }
    }, {
        key: 'withPoints',
        value: function withPoints() {
            this.showPoints = true;
            return this;
        }
    }, {
        key: 'withPointSize',
        value: function withPointSize(size) {
            this.pointSize = size;
            return this;
        }
    }, {
        key: 'withPointHover',
        value: function withPointHover() {
            var t = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            this.showPointHover = true;
            if (t != null) {
                this.hoverTemplate = t;
            }
            return this;
        }
    }, {
        key: 'withClass',
        value: function withClass(cl) {
            this.className = cl;
            return this;
        }
    }, {
        key: 'draw',
        value: function draw(where) {
            var _this = this;

            var _startDraw = this.startDraw(where);

            var svg = _startDraw.svg;
            var height = _startDraw.height;
            var width = _startDraw.width;

            var min = _d32['default'].min(this.data.map(function (d) {
                return d.value;
            }));
            var max = _d32['default'].max(this.data.map(function (d) {
                return d.value;
            }));
            var x = _d32['default'].scale.linear().domain([0, this.data.length - 1]).range([0, width]);
            var y = _d32['default'].scale.linear().domain([min, max]).range([height, 0]);
            var line = _d32['default'].svg.line().x(function (_, i) {
                return x(i);
            }).y(function (d) {
                return y(d.value);
            });
            svg.selectAll('.line').append("g").attr("class", 'line').data([this.data]).enter().append("path").attr("class", 'spark').attr("d", function (d) {
                return line(d);
            });
            if (this.showPoints) {
                var points = svg.selectAll('.points').append("g").attr("class", 'points').data(this.data).enter().append("circle").attr("class", 'point').attr("cx", function (_, i) {
                    return x(i);
                }).attr("cy", function (d) {
                    return y(d.value);
                }).attr("r", this.pointSize);
                if (this.showPointHover) {
                    points.on("mouseover", function (d) {
                        return _this.tooltipEnter(d);
                    }).on("mouseout", function () {
                        return _this.tooltipLeave();
                    });
                }
            }
        }
    }, {
        key: 'tooltipEnter',
        value: function tooltipEnter(d) {
            var _this2 = this;

            this._tooltipDiv = _d32['default'].select("body").append("div").attr("class", this.className + ' spark_tooltip').html(this.hoverTemplate(d)).style("left", _d32['default'].event.pageX + 'px').style("top", _d32['default'].event.pageY + 'px');
            setTimeout(function () {
                _this2._tooltipDiv.attr("class", _this2.className + ' spark_tooltip open');
            }, 1);
        }
    }, {
        key: 'tooltipLeave',
        value: function tooltipLeave() {
            if (this._tooltipDiv) this._tooltipDiv.remove();
        }
    }]);

    return SparkBuilder;
})(_chartBuilder.ChartBuilder);

exports.SparkBuilder = SparkBuilder;