import { xyData } from './util/interfaces';
import { LineBuilder } from './line-builder';
import { ChartWithAxisBuilder } from './chart-with-axis-builder';

export class LineGraphBuilder extends ChartWithAxisBuilder {
  public withLine<T extends xyData>(configurer: (l: LineBuilder<T>) => void): this {
    let newLineBuilder = new LineBuilder<T>();
    configurer(newLineBuilder);
    this.elements.push(newLineBuilder);
    return this;
  }
}
