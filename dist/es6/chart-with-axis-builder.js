import { AxisBuilder } from './axis-builder';
import { ChartBuilder } from './chart-builder';
export class ChartWithAxisBuilder extends ChartBuilder {
    constructor(...args) {
        super(...args);
        this.axisBuilder = new AxisBuilder();
        this.elements = [];
    }
    configureAxis(configurer) {
        this.axisBuilder = new AxisBuilder();
        configurer(this.axisBuilder);
        return this;
    }
    drawElements(svg, x, y, width, height) {
        this.elements.forEach((e) => {
            e.draw(svg, x, y, width, height);
        });
        const elementsWithLegend = this.elements.filter((e) => e.legendName.length > 0);
        this.drawLegend(elementsWithLegend);
    }
    draw(where) {
        const { svg, width, height } = this.startDraw(where);
        const { x, y } = this.axisBuilder.getXYScales(width, height);
        this.axisBuilder.draw(svg, x, y, width, height);
        this.drawElements(svg, x, y, width, height);
    }
}
