import d3 from 'd3';

import { ChartBuilder } from './chart-builder';
import empty from './util/empty-element';
import { HasValue } from './util/interfaces';

const colors = d3.scale.category20().range();

export class DonutGraphBuilder<T extends HasValue> extends ChartBuilder {
  private data: T[] = [];
  private getColorProperty: (T, idx?: number) => string = (a, idx) => colors[idx % colors.length];
  private getClassProperty: (T) => string = (a) => null;
  private donutWidth = 20;
  private mouseInCb: (T) => void = (a) => null;
  private mouseOutCb: (T) => void = (a) => null;

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
       .on("mouseover", d => this.mouseInCb(d.data))
       .on("mouseout", d => this.mouseOutCb(d.data))
       .attr("class", d => this.getClassProperty(d.data))
       .attr("d", <any>arc)
       .attr("fill", (d, idx) => this.getColorProperty(d.data, idx));
  }
}
