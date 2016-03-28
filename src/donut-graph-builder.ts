import d3 from 'd3';

import { ChartBuilder } from './chart-builder';
import empty from './util/empty-element';
import { HasValue } from './util/interfaces';

const colors = d3.scale.category20().range();

//const defaultHover = <T extends HasValue>(d: T) => `d.value

export class DonutGraphBuilder<T extends HasValue> extends ChartBuilder {
  private data: T[] = [];
  private getColorProperty: (T, idx?: number) => string = (a, idx) => colors[idx % colors.length];
  private getClassProperty: (T) => string = (a) => null;
  private donutWidth = 20;
  private mouseInCb: (T) => void = (a) => null;
  private mouseOutCb: (T) => void = (a) => null;

  private showHover = false;
  private hover: (T) => string = (a) => `${a.value}`;
  private _tooltipDiv = null;

  public withDonutWitdh(width: number): this {
    this.donutWidth = width;
    return this;
  }

  public withData(data: T[]): this {
    this.data = data;
    return this;
  }

  public withColor(cb: (a: T) => string): this {
    this.getColorProperty = cb;
    return this;
  }

  public withClass(cb: (a: T) => string): this {
    this.getClassProperty = cb;
    return this;
  }

  public onDataMouseIn(cb: (a: T) => void): this {
    this.mouseInCb = cb;
    return this;
  }

  public onDataMouseOut(cb: (a: T) => void): this {
    this.mouseOutCb = cb;
    return this;
  }

  public withHover(cb: (T) => string): this {
    if (cb != null)
      this.hover = cb;

    this.showHover = true;
    return this;
  }

  private tooltipEnter(d: T) {
    this._tooltipDiv = d3.select("body")
        .append("div")
        .attr("class", `${this.getClassProperty(d)} graph_tooltip`)
        .html(this.hover(d))
        .style("background-color", this.getColorProperty(d))
        .style("left", `${(<any>d3.event).pageX}px`)
        .style("top", `${(<any>d3.event).pageY}px`);

    setTimeout(() => {
      this._tooltipDiv.attr("class", `${this.getClassProperty(d)} graph_tooltip open`);
    }, 1);
  }

  private tooltipLeave() {
    if (this._tooltipDiv) this._tooltipDiv.remove();
  }

  public draw(where: Element) {
    const { svg, width, height } = this.startDraw(where);
    const radius = Math.min(width, height) / 2;

    const donutGroup = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${(height / 2)})`);

    let arc = d3.svg.arc()
                .innerRadius(radius - this.donutWidth)
                .outerRadius(radius);

    let pie = d3.layout.pie<T>()
                .value(d => d.value)
                .sort(null);

    donutGroup.selectAll("path")
       .data(pie(this.data))
       .enter()
       .append("path")
       .on("mouseover", d => {
         this.mouseInCb(d.data);
         if (this.showHover) this.tooltipEnter(d.data);
       })
       .on("mouseout", d => {
         this.mouseOutCb(d.data);
         if (this.showHover) this.tooltipLeave();
       })
       .attr("class", d => this.getClassProperty(d.data))
       .attr("d", <any>arc)
       .attr("fill", (d, idx) => this.getColorProperty(d.data, idx));
  }
}
