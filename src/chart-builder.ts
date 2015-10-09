import empty from 'util/empty-element';
import d3 from 'd3';

export class ChartBuilder {
    private size = { width: 0, height: 0 };
    private margin = { top: 0, right: 0, left: 0, bottom: 0 };
    private legendElementWidth = 200;
    private _svg: d3.Selection<any> = null;

    public withSize(width: number, height: number) {
        this.size.width = width;
        this.size.height = height;
        return this;
    }

    public withMargins(top: number, right: number, bottom: number, left: number) {
        this.margin.top = top;
        this.margin.right = right;
        this.margin.bottom = bottom;
        this.margin.left = left;
        return this;
    }

    public withLegendWidth(width: number) {
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

    public drawLegend(legendData: { className: string, legendName: string }[]) {
        if (this._svg == null) return;
        let legend = this._svg.selectAll(".legend")
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
            .attr("transform", (d, i) => "translate(20, 10)")
            .attr("class", (d) => d.className)
            .text((d) => d.legendName);
    }

    protected startDraw(where: Element) {
        empty(where);
        this._svg = d3.select(where).append("svg")
            .attr("width", this.size.width + this.margin.left + this.margin.right)
            .attr("height", this.size.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, #{this.margin.top})`);

        let width = this.size.width;
        let height = this.size.height;

        return { svg: this._svg, width: width, height: height };
    }
}
