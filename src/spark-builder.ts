import { ChartBuilder } from './chart-builder';
import { HasValue, SimpleTemplater } from './util/interfaces';
import d3 from 'd3';

function defaultToolTipTemplate<T extends HasValue>(data: T) {
    return `${data.value}`;
}

export class SparkBuilder<T extends HasValue> extends ChartBuilder {
    private data: T[] = [];
    private className = "";
    private pointSize = 3;
    private _tooltipDiv = null;
    private showPoints = false;
    private showPointHover = false;
    private hoverTemplate: SimpleTemplater<T> = defaultToolTipTemplate;

    public withData(data: T[]): this {
      this.data = data;
      return this;
    }

    public withPoints(): this {
      this.showPoints = true;
      return this;
    }

    public withPointSize(size: number): this {
      this.pointSize = size;
      return this;
    }

    public withPointHover(t: SimpleTemplater<T> = null): this {
      this.showPointHover = true;
      if (t != null) {
        this.hoverTemplate = t;
      }

      return this;
    }

    public withClass(cl: string): this {
      this.className = cl;
      return this;
    }

    public draw(where: Element) {
      const { svg, height, width } = this.startDraw(where);

      const min = d3.min(this.data.map(d => d.value));
      const max = d3.max(this.data.map(d => d.value));

      const x = d3.scale.linear().domain([0, this.data.length - 1]).range([0, width]);
      const y = d3.scale.linear().domain([min, max]).range([height, 0]);

      const line = d3.svg.line<HasValue>()
          .x((_, i) => x(i))
          .y(d => y(d.value));

      svg.selectAll(`.line`)
          .append("g").attr("class", `line`)
          .data([this.data])
          .enter()
          .append("path")
          .attr("class", `spark`)
          .attr("d", (d) => line(d));

      if (this.showPoints) {
        const points = svg.selectAll(`.points`)
            .append("g").attr("class", `points`)
            .data(this.data)
            .enter()
            .append("circle")
            .attr("class", `point`)
            .attr("cx", (_, i) => x(i))
            .attr("cy", (d) => y(d.value))
            .attr("r", this.pointSize);

        if (this.showPointHover) {
          points.on("mouseover", (d) => this.tooltipEnter(d))
                .on("mouseout", () => this.tooltipLeave());
        }
      }
    }

    protected tooltipEnter(d: T) {
      this._tooltipDiv = d3.select("body")
          .append("div")
          .attr("class", `${this.className} spark_tooltip`)
          .html(this.hoverTemplate(d))
          .style("left", `${(<any>d3.event).pageX}px`)
          .style("top", `${(<any>d3.event).pageY}px`);

      setTimeout(() => {
          this._tooltipDiv.attr("class", `${this.className} spark_tooltip open`);
      }, 1);
    }

    protected tooltipLeave() {
      if (this._tooltipDiv) this._tooltipDiv.remove();
    }
}
