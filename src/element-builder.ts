import nextId from './util/next-id';
import d3 from 'd3';

// these need a new home..
export type xyData = { x: number | string; y: number };
export type templater = (...args: any[]) => string;

function defaultToolTipTemplate(data: xyData, legendName: string) {
    return `${legendName} - ${data.y}`;
}

export class ElementBuilder<T> {
    public className = "";
    public legendName = "";
    private id = nextId("element");
    protected showHover = false;
    private hoverTemplate = defaultToolTipTemplate;
    private _tooltipDiv = null;

    public withLegendName(name: string): T {
        this.legendName = name;
        return <any>this as T;
    }

    public withClass(cl: string): T {
        this.className = cl;
        return <any>this as T;
    }

    public withHover(template: templater = null): T {
        this.showHover = true;
        if (template != null)
            this.hoverTemplate = template;

        return <any>this as T;
    }

    protected tooltipEnter(d: xyData) {
        this._tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", `${this.className} graph_tooltip`)
            .html(this.hoverTemplate(d, this.legendName))
            .style("left", `${(<any>d3.event).pageX}px`)
            .style("top", `${(<any>d3.event).pageY}px`);

        setTimeout(() => {
          this._tooltipDiv.attr("class", `${this.className} graph_tooltip open`);
        }, 1);
    }

    protected tooltipLeave() {
        if (this._tooltipDiv) this._tooltipDiv.remove();
    }

    public draw(svg: d3.Selection<any>, x: any, y: any, width: number, height: number) {}
}
