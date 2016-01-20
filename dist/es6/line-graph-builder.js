import { LineBuilder } from './line-builder';
import { ChartWithAxisBuilder } from './chart-with-axis-builder';
export class LineGraphBuilder extends ChartWithAxisBuilder {
    withLine(configurer) {
        const newLineBuilder = new LineBuilder();
        configurer(newLineBuilder);
        this.elements.push(newLineBuilder);
        return this;
    }
}
