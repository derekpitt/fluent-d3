define(['exports', './util/empty-element', 'd3'], function (exports, _utilEmptyElement, _d3) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _empty = _interopRequireDefault(_utilEmptyElement);

    var _d32 = _interopRequireDefault(_d3);

    var ChartBuilder = (function () {
        function ChartBuilder() {
            _classCallCheck(this, ChartBuilder);

            this.size = { width: 0, height: 0 };
            this.margin = { top: 0, right: 0, left: 0, bottom: 0 };
            this.legendElementWidth = 200;
            this._svg = null;
        }

        _createClass(ChartBuilder, [{
            key: 'withSize',
            value: function withSize(width, height) {
                this.size.width = width;
                this.size.height = height;
                return this;
            }
        }, {
            key: 'withMargins',
            value: function withMargins(top, right, bottom, left) {
                this.margin.top = top;
                this.margin.right = right;
                this.margin.bottom = bottom;
                this.margin.left = left;
                return this;
            }
        }, {
            key: 'withLegendWidth',
            value: function withLegendWidth(width) {
                this.legendElementWidth = width;
                return this;
            }
        }, {
            key: 'drawLine',
            value: function drawLine(x1, y1, x2, y2, className) {
                if (this._svg == null) return;
                this._svg.append("line").attr("class", className).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
            }
        }, {
            key: 'drawLegend',
            value: function drawLegend(legendData) {
                var _this = this;

                if (this._svg == null) return;
                var legend = this._svg.selectAll(".legend").data(legendData).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
                    return 'translate(' + i * _this.legendElementWidth + ', -40)';
                });
                legend.append("rect").attr("width", 10).attr("height", 10).attr("class", function (d) {
                    return d.className;
                });
                legend.append("text").attr("transform", function (d, i) {
                    return "translate(20, 10)";
                }).attr("class", function (d) {
                    return d.className;
                }).text(function (d) {
                    return d.legendName;
                });
            }
        }, {
            key: 'startDraw',
            value: function startDraw(where) {
                (0, _empty['default'])(where);
                this._svg = _d32['default'].select(where).append("svg").attr("width", this.size.width + this.margin.left + this.margin.right).attr("height", this.size.height + this.margin.top + this.margin.bottom).append("g").attr("transform", 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
                var width = this.size.width;
                var height = this.size.height;
                return { svg: this._svg, width: width, height: height };
            }
        }]);

        return ChartBuilder;
    })();

    exports.ChartBuilder = ChartBuilder;
});