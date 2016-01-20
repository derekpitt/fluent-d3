import d3 from 'd3';
import { ChartBuilder } from './chart-builder';
const colors = d3.scale.category20().range();
export class DonutGraphBuilder extends ChartBuilder {
    constructor(...args) {
        super(...args);
        this.data = [];
        this.getColorProperty = (a, idx) => colors[idx % colors.length];
        this.getClassProperty = (a) => null;
        this.donutWidth = 20;
        this.mouseInCb = (a) => null;
        this.mouseOutCb = (a) => null;
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
            .on("mouseover", d => this.mouseInCb(d.data))
            .on("mouseout", d => this.mouseOutCb(d.data))
            .attr("class", d => this.getClassProperty(d.data))
            .attr("d", arc)
            .attr("fill", (d, idx) => this.getColorProperty(d.data, idx));
    }
}
