import { xyData, dataFilter } from './util/interfaces';
import { ElementBuilder } from './element-builder';
import { Drawer, Scale } from './axis-builder';
import d3 from 'd3';

function defaultDataFilter(d: xyData) {
    return d.y > 0;
}

export class LineBuilder<T extends xyData> extends ElementBuilder {
    private data: T[] = [];

    private hasPoints = false;
    private pointsFilter: dataFilter<T> = defaultDataFilter;
    private fillBelow = false;
    private smooth = false;

    constructor() {
        super();
    }

    public withData(data: T[]): this {
        this.data = data;
        return this;
    }

    public withPoints(filter: dataFilter<T> = null): this {
        this.hasPoints = true;
        if (filter != null)
            this.pointsFilter = filter;
        return this;
    }

    public withFill(): this {
        this.fillBelow = true;
        return this;
    }

    public withSmoothLine(val = true): this {
        this.smooth = val;
        return this;
    }


    public draw(svg: d3.Selection<any>, x: any, y: any, width: number, height: number) {
        let line = d3.svg.line<xyData>()
                     .x((d) => x(d.x))
                     .y((d) => y(d.y));

        if (this.smooth)
            line.interpolate("monotone").tension(0.5);

        if (this.fillBelow) {
            const area = d3.svg.area<xyData>()
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
            const points = this.data.filter(this.pointsFilter);

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

            const selectedPoints = svg.selectAll(`.${this.className}-points`)
                                      .append("g").attr("class", `${this.className}-points`)
                                      .data(points)
                                      .enter()
                                      .append("circle")
                                      .attr("class", `point ${this.className}`)
                                      .attr("cx", (d) => x(d.x))
                                      .attr("cy", (d) => y(d.y))
                                      .attr("r", (d) => 5);

            if (this.showHover) {
                selectedPoints.on("mouseover", (d) => this.tooltipEnter(d))
                              .on("mouseout", () => this.tooltipLeave());
            }
        }
    }
}
