define(["exports", "d3"], function (exports, _d3) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var _d32 = _interopRequireDefault(_d3);

    var axisMode;
    (function (axisMode) {
        axisMode[axisMode["range"] = 0] = "range";
        axisMode[axisMode["domain"] = 1] = "domain";
    })(axisMode || (axisMode = {}));

    var AxisBuilder = (function () {
        function AxisBuilder() {
            _classCallCheck(this, AxisBuilder);

            this.xHasTicks = false;
            this.yHasTicks = false;
            this.xTicks = 0;
            this.yTicks = 0;
            this.xMode = axisMode.range;
            this.xRange = [0, 0];
            this.xLabels = [];
            this.yMode = axisMode.range;
            this.yRange = [0, 0];
            this.yLabels = [];
            this.hidden = false;
        }

        _createClass(AxisBuilder, [{
            key: "withXLabels",
            value: function withXLabels(labels) {
                this.xMode = axisMode.domain;
                this.xLabels = labels;
                return this;
            }
        }, {
            key: "withYRange",
            value: function withYRange(start, end) {
                this.yMode = axisMode.range;
                this.yRange = [start, end];
                return this;
            }
        }, {
            key: "withXTicks",
            value: function withXTicks() {
                var howMany = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                this.xHasTicks = true;
                this.xTicks = howMany;
                return this;
            }
        }, {
            key: "withYTicks",
            value: function withYTicks() {
                var howMany = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                this.yHasTicks = true;
                this.yTicks = howMany;
                return this;
            }
        }, {
            key: "hide",
            value: function hide() {
                var _hide = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

                this.hidden = _hide;
                return this;
            }
        }, {
            key: "getXYScales",
            value: function getXYScales(width, height) {
                var x = null;
                switch (this.xMode) {
                    case axisMode.domain:
                        x = _d32["default"].scale.ordinal().domain(this.xLabels).rangePoints([0, width]);
                        break;
                    case axisMode.range:
                        x = _d32["default"].scale.linear().range([width, 0]).domain(this.xRange);
                        break;
                }
                var y = null;
                switch (this.yMode) {
                    case axisMode.domain:
                        y = _d32["default"].scale.ordinal().domain(this.yLabels).rangePoints([0, height]);
                        break;
                    case axisMode.range:
                        y = _d32["default"].scale.linear().range([height, 0]).domain(this.yRange);
                        break;
                }
                return { x: x, y: y };
            }
        }, {
            key: "draw",
            value: function draw(svg, x, y, width, height) {
                if (this.hidden) return;
                var xAxis = _d32["default"].svg.axis().scale(x).orient("bottom");
                if (this.xHasTicks) xAxis.innerTickSize(-height).outerTickSize(0).tickPadding(10);
                if (this.xTicks > 0) xAxis.ticks(this.xTicks);
                var yAxis = _d32["default"].svg.axis().scale(y).orient("left");
                if (this.yHasTicks) yAxis.innerTickSize(-width).outerTickSize(0).tickPadding(10);
                if (this.yTicks > 0) yAxis.ticks(this.yTicks);
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                svg.append("g").attr("class", "y axis").call(yAxis);
            }
        }]);

        return AxisBuilder;
    })();

    exports.AxisBuilder = AxisBuilder;
});