import d3 from 'd3';
var axisMode;
(function (axisMode) {
    axisMode[axisMode["range"] = 0] = "range";
    axisMode[axisMode["domain"] = 1] = "domain";
})(axisMode || (axisMode = {}));
export class AxisBuilder {
    constructor() {
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
    withXLabels(labels) {
        this.xMode = axisMode.domain;
        this.xLabels = labels;
        return this;
    }
    withYRange(start, end) {
        this.yMode = axisMode.range;
        this.yRange = [start, end];
        return this;
    }
    withXTicks(howMany = 0) {
        this.xHasTicks = true;
        this.xTicks = howMany;
        return this;
    }
    withYTicks(howMany = 0) {
        this.yHasTicks = true;
        this.yTicks = howMany;
        return this;
    }
    hide(hide = true) {
        this.hidden = hide;
        return this;
    }
    getXYScales(width, height) {
        let x = null;
        switch (this.xMode) {
            case axisMode.domain:
                x = d3.scale.ordinal().domain(this.xLabels).rangePoints([0, width]);
                break;
            case axisMode.range:
                x = d3.scale.linear().range([width, 0]).domain(this.xRange);
                break;
        }
        let y = null;
        switch (this.yMode) {
            case axisMode.domain:
                y = d3.scale.ordinal().domain(this.yLabels).rangePoints([0, height]);
                break;
            case axisMode.range:
                y = d3.scale.linear().range([height, 0]).domain(this.yRange);
                break;
        }
        return { x: x, y: y };
    }
    draw(svg, x, y, width, height) {
        if (this.hidden)
            return;
        let xAxis = d3.svg.axis().scale(x).orient("bottom");
        if (this.xHasTicks)
            xAxis.innerTickSize(-height).outerTickSize(0).tickPadding(10);
        if (this.xTicks > 0)
            xAxis.ticks(this.xTicks);
        let yAxis = d3.svg.axis().scale(y).orient("left");
        if (this.yHasTicks)
            yAxis.innerTickSize(-width).outerTickSize(0).tickPadding(10);
        if (this.yTicks > 0)
            yAxis.ticks(this.yTicks);
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
        svg.append("g").attr("class", "y axis").call(yAxis);
    }
}
