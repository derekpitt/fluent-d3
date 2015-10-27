'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _elementBuilder = require('./element-builder');

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

function defaultDataFilter(d) {
    return d.y > 0;
}

var LineBuilder = (function (_ElementBuilder) {
    _inherits(LineBuilder, _ElementBuilder);

    function LineBuilder() {
        _classCallCheck(this, LineBuilder);

        _get(Object.getPrototypeOf(LineBuilder.prototype), 'constructor', this).call(this);
        this.data = [];
        this.hasPoints = false;
        this.pointsFilter = defaultDataFilter;
        this.fillBelow = false;
        this.smooth = false;
    }

    _createClass(LineBuilder, [{
        key: 'withData',
        value: function withData(data) {
            this.data = data;
            return this;
        }
    }, {
        key: 'withPoints',
        value: function withPoints() {
            var filter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            this.hasPoints = true;
            if (filter != null) this.pointsFilter = filter;
            return this;
        }
    }, {
        key: 'withFill',
        value: function withFill() {
            this.fillBelow = true;
            return this;
        }
    }, {
        key: 'withSmoothLine',
        value: function withSmoothLine() {
            var val = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            this.smooth = val;
            return this;
        }
    }, {
        key: 'draw',
        value: function draw(svg, x, y, width, height) {
            var _this = this;

            var line = _d32['default'].svg.line().x(function (d) {
                return x(d.x);
            }).y(function (d) {
                return y(d.y);
            });
            if (this.smooth) line.interpolate("monotone").tension(0.5);
            if (this.fillBelow) {
                var area = _d32['default'].svg.area().x(function (d) {
                    return x(d.x);
                }).y0(height).y1(function (d) {
                    return y(d.y);
                });
                if (this.smooth) area.interpolate("monotone").tension(0.5);
                svg.selectAll('.' + this.className + '-fill').data([this.data]).enter().append("path").attr("class", 'fill ' + this.className + '-fill').attr("d", area);
            }
            svg.selectAll('.' + this.className + '-line').append("g").attr("class", this.className + '-line').data([this.data]).enter().append("path").attr("class", 'line ' + this.className).attr("d", function (d) {
                return line(_this.data);
            });
            if (this.hasPoints) {
                var points = this.data.filter(this.pointsFilter);
                svg.selectAll('.' + this.className + '-point-ticks').append("g").attr("class", this.className + '-ticks').data(points).enter().append("line").attr("class", 'point-tick ' + this.className).attr("x1", function (d) {
                    return x(d.x);
                }).attr("y1", function (d) {
                    return y(d.y);
                }).attr("x2", function (d) {
                    return x(d.x);
                }).attr("y2", height);
                var selectedPoints = svg.selectAll('.' + this.className + '-points').append("g").attr("class", this.className + '-points').data(points).enter().append("circle").attr("class", 'point ' + this.className).attr("cx", function (d) {
                    return x(d.x);
                }).attr("cy", function (d) {
                    return y(d.y);
                }).attr("r", function (d) {
                    return 0;
                }); // use stroke in your css to make it bigger
                if (this.showHover) {
                    selectedPoints.on("mouseover", function (d) {
                        return _this.tooltipEnter(d);
                    }).on("mouseout", function () {
                        return _this.tooltipLeave();
                    });
                }
            }
        }
    }]);

    return LineBuilder;
})(_elementBuilder.ElementBuilder);

exports.LineBuilder = LineBuilder;