import { LineBuilder } from './line-builder';
import { ChartWithAxisBuilder } from './chart-with-axis-builder';

export class LineGraphBuilder extends ChartWithAxisBuilder {
  public withLine(configurer: (l: LineBuilder) => void): this {
    let newLineBuilder = new LineBuilder();
    configurer(newLineBuilder);
    this.elements.push(newLineBuilder);
    return this;
  }
}
