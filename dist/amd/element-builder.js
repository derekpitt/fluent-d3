define(['exports', 'util/next-id', 'd3'], function (exports, _utilNextId, _d3) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _nextId = _interopRequireDefault(_utilNextId);

    var _d32 = _interopRequireDefault(_d3);

    function defaultToolTipTemplate(data, legendName) {
        return legendName + ' - ' + data.y;
    }

    var ElementBuilder = (function () {
        function ElementBuilder() {
            _classCallCheck(this, ElementBuilder);

            this.className = "";
            this.legendName = "";
            this.id = (0, _nextId['default'])("element");
            this.showHover = false;
            this.hoverTemplate = defaultToolTipTemplate;
            this._tooltipDiv = null;
        }

        _createClass(ElementBuilder, [{
            key: 'withLegendName',
            value: function withLegendName(name) {
                this.legendName = name;
                return this;
            }
        }, {
            key: 'withClass',
            value: function withClass(cl) {
                this.className = cl;
                return this;
            }
        }, {
            key: 'withHover',
            value: function withHover() {
                var template = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                this.showHover = true;
                if (template != null) this.hoverTemplate = template;
                return this;
            }
        }, {
            key: 'tooltipEnter',
            value: function tooltipEnter(d) {
                var _this = this;

                this._tooltipDiv = _d32['default'].select("body").append("div").attr("class", this.className + ' graph_tooltip').html(this.hoverTemplate(d, this.legendName)).style("left", _d32['default'].event.pageX + 'px').style("top", _d32['default'].event.pageY + 'px');
                setTimeout(function () {
                    _this._tooltipDiv.attr("class", _this.className + ' graph_tooltip open');
                }, 1);
            }
        }, {
            key: 'tooltipLeave',
            value: function tooltipLeave() {
                if (this._tooltipDiv) this._tooltipDiv.remove();
            }
        }, {
            key: 'draw',
            value: function draw(svg, x, y, width, height) {}
        }]);

        return ElementBuilder;
    })();

    exports.ElementBuilder = ElementBuilder;
});