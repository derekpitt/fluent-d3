import nextId from 'util/next-id';
import d3 from 'd3';

// these need a new home..
export type xyData = { x: number | string; y: number };
export type templater = (...args: any[]) => string;

function defaultToolTipTemplate(data: xyData, legendName: string) {
    return `${legendName} ${data.y}`;
}

export class ElementBuilder {
    public className = "";
    public legendName = "";
    private id = nextId("element");
    protected showHover = false;
    private hoverTemplate = defaultToolTipTemplate;
    private _tooltipDiv = null;

    public withLegendName(name: string) {
        this.legendName = name;
        return this;
    }

    public withClass(cl: string) {
        this.className = cl;
        return this;
    }

    public withHover(template: templater = null) {
        this.showHover = true;
        if (template != null)
            this.hoverTemplate = template;
        return this;
    }

    protected tooltipEnter(d: xyData) {
        this._tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", "#{this.class} graph_tooltip")
            .html(this.hoverTemplate(d, this.legendName))
            .style("left", "#{d3.event.pageX}px")
            .style("top", "#{d3.event.pageY}px")

        setTimeout(() => {
          this._tooltipDiv.attr("class", "#{this.class} graph_tooltip open");
        }, 1);
    }

    protected tooltipLeave() {
        if (this._tooltipDiv) this._tooltipDiv.remove();
    }
}
