import { ElementBuilder } from './element-builder';
import d3 from 'd3';
function defaultDataFilter(d) {
    return d.y > 0;
}
export class LineBuilder extends ElementBuilder {
    constructor() {
        super();
        this.data = [];
        this.hasPoints = false;
        this.pointsFilter = defaultDataFilter;
        this.fillBelow = false;
        this.smooth = false;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    withPoints(filter = null) {
        this.hasPoints = true;
        if (filter != null)
            this.pointsFilter = filter;
        return this;
    }
    withFill() {
        this.fillBelow = true;
        return this;
    }
    withSmoothLine(val = true) {
        this.smooth = val;
        return this;
    }
    draw(svg, x, y, width, height) {
        let line = d3.svg
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.y));
        if (this.smooth)
            line.interpolate("monotone").tension(0.5);
        if (this.fillBelow) {
            let area = d3.svg
                .area()
                .x((d) => x(d.x))
                .y0(height)
                .y1((d) => y(d.y));
            if (this.smooth)
                area.interpolate("monotone").tension(0.5);
            svg.selectAll(`.${this.className}-fill`)
                .data([this.data])
                .enter()
                .append("path")
                .attr("class", `fill ${this.className}-fill`)
                .attr("d", area);
        }
        svg.selectAll(`.${this.className}-line`)
            .append("g").attr("class", `${this.className}-line`)
            .data([this.data])
            .enter()
            .append("path")
            .attr("class", `line ${this.className}`)
            .attr("d", (d) => line(this.data));
        if (this.hasPoints) {
            let points = this.data.filter(this.pointsFilter);
            svg.selectAll(`.${this.className}-point-ticks`)
                .append("g").attr("class", `${this.className}-ticks`)
                .data(points)
                .enter()
                .append("line")
                .attr("class", `point-tick ${this.className}`)
                .attr("x1", (d) => x(d.x))
                .attr("y1", (d) => y(d.y))
                .attr("x2", (d) => x(d.x))
                .attr("y2", height);
            let selectedPoints = svg.selectAll(`.${this.className}-points`)
                .append("g").attr("class", `${this.className}-points`)
                .data(points)
                .enter()
                .append("circle")
                .attr("class", `point ${this.className}`)
                .attr("cx", (d) => x(d.x))
                .attr("cy", (d) => y(d.y))
                .attr("r", (d) => 0); // use stroke in your css to make it bigger
            if (this.showHover) {
                selectedPoints.on("mouseover", (d) => this.tooltipEnter(d))
                    .on("mouseout", () => this.tooltipLeave());
            }
        }
    }
}
