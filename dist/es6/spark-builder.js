import { ChartBuilder } from './chart-builder';
import d3 from 'd3';
function defaultToolTipTemplate(data) {
    return `${data.value}`;
}
export class SparkBuilder extends ChartBuilder {
    constructor(...args) {
        super(...args);
        this.data = [];
        this.className = "";
        this.pointSize = 3;
        this._tooltipDiv = null;
        this.showPoints = false;
        this.showPointHover = false;
        this.hoverTemplate = defaultToolTipTemplate;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    withPoints() {
        this.showPoints = true;
        return this;
    }
    withPointSize(size) {
        this.pointSize = size;
        return this;
    }
    withPointHover(t = null) {
        this.showPointHover = true;
        if (t != null) {
            this.hoverTemplate = t;
        }
        return this;
    }
    withClass(cl) {
        this.className = cl;
        return this;
    }
    draw(where) {
        const { svg, height, width } = this.startDraw(where);
        const min = d3.min(this.data.map(d => d.value));
        const max = d3.max(this.data.map(d => d.value));
        const x = d3.scale.linear().domain([0, this.data.length - 1]).range([0, width]);
        const y = d3.scale.linear().domain([min, max]).range([height, 0]);
        const line = d3.svg.line()
            .x((_, i) => x(i))
            .y(d => y(d.value));
        svg.selectAll(`.line`)
            .append("g").attr("class", `line`)
            .data([this.data])
            .enter()
            .append("path")
            .attr("class", `spark`)
            .attr("d", (d) => line(d));
        if (this.showPoints) {
            const points = svg.selectAll(`.points`)
                .append("g").attr("class", `points`)
                .data(this.data)
                .enter()
                .append("circle")
                .attr("class", `point`)
                .attr("cx", (_, i) => x(i))
                .attr("cy", (d) => y(d.value))
                .attr("r", this.pointSize);
            if (this.showPointHover) {
                points.on("mouseover", (d) => this.tooltipEnter(d))
                    .on("mouseout", () => this.tooltipLeave());
            }
        }
    }
    tooltipEnter(d) {
        this._tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", `${this.className} spark_tooltip`)
            .html(this.hoverTemplate(d))
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        setTimeout(() => {
            this._tooltipDiv.attr("class", `${this.className} spark_tooltip open`);
        }, 1);
    }
    tooltipLeave() {
        if (this._tooltipDiv)
            this._tooltipDiv.remove();
    }
}
