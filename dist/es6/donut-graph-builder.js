import d3 from 'd3';
import { ChartBuilder } from './chart-builder';
const colors = d3.scale.category20().range();
//const defaultHover = <T extends HasValue>(d: T) => `d.value
export class DonutGraphBuilder extends ChartBuilder {
    constructor(...args) {
        super(...args);
        this.data = [];
        this.getColorProperty = (a, idx) => colors[idx % colors.length];
        this.getClassProperty = (a) => null;
        this.donutWidth = 20;
        this.mouseInCb = (a) => null;
        this.mouseOutCb = (a) => null;
        this.showHover = false;
        this.hover = (a) => `${a.value}`;
        this._tooltipDiv = null;
    }
    withDonutWitdh(width) {
        this.donutWidth = width;
        return this;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    withColor(cb) {
        this.getColorProperty = cb;
        return this;
    }
    withClass(cb) {
        this.getClassProperty = cb;
        return this;
    }
    onDataMouseIn(cb) {
        this.mouseInCb = cb;
        return this;
    }
    onDataMouseOut(cb) {
        this.mouseOutCb = cb;
        return this;
    }
    withHover(cb) {
        if (cb != null)
            this.hover = cb;
        this.showHover = true;
        return this;
    }
    tooltipEnter(d) {
        this._tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", `${this.getClassProperty(d)} graph_tooltip`)
            .html(this.hover(d))
            .style("background-color", this.getColorProperty(d))
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        setTimeout(() => {
            this._tooltipDiv.attr("class", `${this.getClassProperty(d)} graph_tooltip open`);
        }, 1);
    }
    tooltipLeave() {
        if (this._tooltipDiv)
            this._tooltipDiv.remove();
    }
    draw(where) {
        const { svg, width, height } = this.startDraw(where);
        const radius = Math.min(width, height) / 2;
        const donutGroup = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${(height / 2)})`);
        let arc = d3.svg.arc()
            .innerRadius(radius - this.donutWidth)
            .outerRadius(radius);
        let pie = d3.layout.pie()
            .value(d => d.value)
            .sort(null);
        donutGroup.selectAll("path")
            .data(pie(this.data))
            .enter()
            .append("path")
            .on("mouseover", d => {
            this.mouseInCb(d.data);
            if (this.showHover)
                this.tooltipEnter(d.data);
        })
            .on("mouseout", d => {
            this.mouseOutCb(d.data);
            if (this.showHover)
                this.tooltipLeave();
        })
            .attr("class", d => this.getClassProperty(d.data))
            .attr("d", arc)
            .attr("fill", (d, idx) => this.getColorProperty(d.data, idx));
    }
}
