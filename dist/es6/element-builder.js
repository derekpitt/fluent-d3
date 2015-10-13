import nextId from 'util/next-id';
import d3 from 'd3';
function defaultToolTipTemplate(data, legendName) {
    return `${legendName} - ${data.y}`;
}
export class ElementBuilder {
    constructor() {
        this.className = "";
        this.legendName = "";
        this.id = nextId("element");
        this.showHover = false;
        this.hoverTemplate = defaultToolTipTemplate;
        this._tooltipDiv = null;
    }
    withLegendName(name) {
        this.legendName = name;
        return this;
    }
    withClass(cl) {
        this.className = cl;
        return this;
    }
    withHover(template = null) {
        this.showHover = true;
        if (template != null)
            this.hoverTemplate = template;
        return this;
    }
    tooltipEnter(d) {
        this._tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", `${this.className} graph_tooltip`)
            .html(this.hoverTemplate(d, this.legendName))
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        setTimeout(() => {
            this._tooltipDiv.attr("class", `${this.className} graph_tooltip open`);
        }, 1);
    }
    tooltipLeave() {
        if (this._tooltipDiv)
            this._tooltipDiv.remove();
    }
    draw(svg, x, y, width, height) { }
}
