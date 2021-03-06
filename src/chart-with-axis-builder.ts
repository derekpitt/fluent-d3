import { AxisBuilder } from './axis-builder';
import { ChartBuilder } from './chart-builder';
import { LineBuilder } from './line-builder';
import { ElementBuilder } from './element-builder';

export class ChartWithAxisBuilder extends ChartBuilder {
  private axisBuilder = new AxisBuilder();
  protected elements: ElementBuilder[] = [];

  public configureAxis(configurer: (builder: AxisBuilder) => void): this {
    this.axisBuilder = new AxisBuilder();
    configurer(this.axisBuilder);
    return this;
  }

  protected drawElements(svg, x, y, width, height) {
    this.elements.forEach((e) => {
      e.draw(svg, x, y, width, height);
    });

    const elementsWithLegend = this.elements.filter((e) => e.legendName.length > 0);
    this.drawLegend(elementsWithLegend);
  }

  public draw(where: Element) {
    const { svg, width, height } = this.startDraw(where);

    const { x, y } = this.axisBuilder.getXYScales(width, height);
    this.axisBuilder.draw(svg, x, y, width, height);

    this.drawElements(svg, x, y, width, height);
  }
}
