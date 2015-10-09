import { AxisBuilder } from 'axis-builder';
import { ChartBuilder } from 'chart-builder';
import { LineBuilder } from 'line-builder';

export class ChartWithAxisBuilder extends ChartBuilder {
  private axisBuilder = new AxisBuilder();
  protected elements: LineBuilder[] = [];

  public configureAxis(configurer: (builder: AxisBuilder) => void) {
    this.axisBuilder = new AxisBuilder();
    configurer(this.axisBuilder);
    return this;
  }

  protected drawElements(svg, x, y, width, height) {
    this.elements.forEach((e) => {
      e.draw(svg, x, y, width, height);
    });

    let elementsWithLegend = this.elements.filter((e) => e.legendName.length > 0);
    this.drawLegend(elementsWithLegend);
  }

  public draw(where: Element) {
    let { svg, width, height } = this.startDraw(where);

    let { x, y } = this.axisBuilder.getXYScales(width, height);
    this.axisBuilder.draw(svg, x, y, width, height);

    this.drawElements(svg, x, y, width, height);
  }
}
