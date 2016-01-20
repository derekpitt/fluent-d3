import empty from './util/empty-element';
import d3 from 'd3';

export class ChartBuilder {
    private size = { width: 0, height: 0 };
    private padding = { top: 0, right: 0, left: 0, bottom: 0 };
    private legendElementWidth = 200;
    private _svg: d3.Selection<any> = null;

    public withSize(width: number, height: number): this {
        this.size.width = width;
        this.size.height = height;
        return this;
    }

    public withPadding(top: number, right: number, bottom: number, left: number): this {
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;
        this.padding.left = left;
        return this;
    }

    public withLegendWidth(width: number): this {
        this.legendElementWidth = width;
        return this;
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, className: string) {
        if (this._svg == null) return;
        this._svg.append("line")
            .attr("class", className)
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2);
    }

    protected drawLegend(legendData: { className: string, legendName: string }[]) {
        if (this._svg == null) return;
        const legend = this._svg.selectAll(".legend")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${i * this.legendElementWidth}, -40)`);

        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("class", (d) => d.className);

        legend.append("text")
            .attr("transform", "translate(20, 10)")
            .attr("class", (d) => d.className)
            .text((d) => d.legendName);
    }

    protected startDraw(where: Element) {
        empty(where);
        this._svg = d3.select(where).append("svg")
            .attr("width", this.size.width)
            .attr("height", this.size.height)
            .append("g")
            .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`);

        let { width, height } = this.size;
        width -= this.padding.left + this.padding.right;
        height -= this.padding.top + this.padding.bottom;

        return { svg: this._svg, width, height };
    }
}
