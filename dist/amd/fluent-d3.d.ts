declare module 'fluent-d3/util/interfaces' {
	export type HasValue = {
	    value: number;
	};
	export type xyData = {
	    x: number | string;
	    y: number;
	};
	export type templater = (...args: any[]) => string;
	export type SimpleTemplater<T> = (d: T) => string;
	export type dataFilter<T> = (d: T) => boolean;

}
declare module 'fluent-d3/util/next-id' {
	export default function nextId(name?: string): string;

}
declare module 'fluent-d3/element-builder' {
	import d3 from 'd3';
	import { xyData, templater } from 'fluent-d3/util/interfaces';
	export class ElementBuilder {
	    className: string;
	    legendName: string;
	    private id;
	    protected showHover: boolean;
	    private hoverTemplate;
	    private _tooltipDiv;
	    withLegendName(name: string): this;
	    withClass(cl: string): this;
	    withHover(template?: templater): this;
	    protected tooltipEnter(d: xyData): void;
	    protected tooltipLeave(): void;
	    draw(svg: d3.Selection<any>, x: any, y: any, width: number, height: number): void;
	}

}
declare module 'fluent-d3/axis-builder' {
	import d3 from 'd3';
	export type Scale = d3.scale.Ordinal<string, number> | d3.scale.Linear<number, number>;
	export interface Drawer {
	    draw(selection: d3.Selection<any>, x: Scale, y: Scale, width: number, height: number): void;
	}
	export class AxisBuilder {
	    private xHasTicks;
	    private yHasTicks;
	    private xTicks;
	    private yTicks;
	    private xMode;
	    private xRange;
	    private xLabels;
	    private yMode;
	    private yRange;
	    private yLabels;
	    private hidden;
	    withXLabels(labels: string[]): this;
	    withYRange(start: number, end: number): this;
	    withXTicks(howMany?: number): this;
	    withYTicks(howMany?: number): this;
	    hide(hide?: boolean): this;
	    getXYScales(width: number, height: number): {
	        x: any;
	        y: any;
	    };
	    draw(svg: d3.Selection<any>, x: Scale, y: Scale, width: number, height: number): void;
	}

}
declare module 'fluent-d3/line-builder' {
	import { xyData, dataFilter } from 'fluent-d3/util/interfaces';
	import { ElementBuilder } from 'fluent-d3/element-builder';
	import d3 from 'd3';
	export class LineBuilder<T extends xyData> extends ElementBuilder {
	    private data;
	    private hasPoints;
	    private pointsFilter;
	    private fillBelow;
	    private smooth;
	    constructor();
	    withData(data: T[]): this;
	    withPoints(filter?: dataFilter<T>): this;
	    withFill(): this;
	    withSmoothLine(val?: boolean): this;
	    draw(svg: d3.Selection<any>, x: any, y: any, width: number, height: number): void;
	}

}
declare module 'fluent-d3/util/empty-element' {
	export default function empty(node: Element): void;

}
declare module 'fluent-d3/chart-builder' {
	export class ChartBuilder {
	    private size;
	    private padding;
	    private legendElementWidth;
	    private _svg;
	    withSize(width: number, height: number): this;
	    withPadding(top: number, right: number, bottom: number, left: number): this;
	    withLegendWidth(width: number): this;
	    drawLine(x1: number, y1: number, x2: number, y2: number, className: string): void;
	    protected drawLegend(legendData: {
	        className: string;
	        legendName: string;
	    }[]): void;
	    protected startDraw(where: Element): {
	        svg: any;
	        width: number;
	        height: number;
	    };
	}

}
declare module 'fluent-d3/chart-with-axis-builder' {
	import { AxisBuilder } from 'fluent-d3/axis-builder';
	import { ChartBuilder } from 'fluent-d3/chart-builder';
	import { ElementBuilder } from 'fluent-d3/element-builder';
	export class ChartWithAxisBuilder extends ChartBuilder {
	    private axisBuilder;
	    protected elements: ElementBuilder[];
	    configureAxis(configurer: (builder: AxisBuilder) => void): this;
	    protected drawElements(svg: any, x: any, y: any, width: any, height: any): void;
	    draw(where: Element): void;
	}

}
declare module 'fluent-d3/line-graph-builder' {
	import { xyData } from 'fluent-d3/util/interfaces';
	import { LineBuilder } from 'fluent-d3/line-builder';
	import { ChartWithAxisBuilder } from 'fluent-d3/chart-with-axis-builder';
	export class LineGraphBuilder extends ChartWithAxisBuilder {
	    withLine<T extends xyData>(configurer: (l: LineBuilder<T>) => void): this;
	}

}
declare module 'fluent-d3/donut-graph-builder' {
	import { ChartBuilder } from 'fluent-d3/chart-builder';
	import { HasValue } from 'fluent-d3/util/interfaces';
	export class DonutGraphBuilder<T extends HasValue> extends ChartBuilder {
	    private data;
	    private getColorProperty;
	    private getClassProperty;
	    private donutWidth;
	    private mouseInCb;
	    private mouseOutCb;
	    withDonutWitdh(width: number): this;
	    withData(data: T[]): this;
	    withColor(cb: (a: T) => string): this;
	    withClass(cb: (a: T) => string): this;
	    onDataMouseIn(cb: (a: T) => void): this;
	    onDataMouseOut(cb: (a: T) => void): this;
	    draw(where: Element): void;
	}

}
declare module 'fluent-d3/spark-builder' {
	import { ChartBuilder } from 'fluent-d3/chart-builder';
	import { HasValue, SimpleTemplater } from 'fluent-d3/util/interfaces';
	export class SparkBuilder<T extends HasValue> extends ChartBuilder {
	    private data;
	    private className;
	    private pointSize;
	    private _tooltipDiv;
	    private showPoints;
	    private showPointHover;
	    private hoverTemplate;
	    withData(data: T[]): this;
	    withPoints(): this;
	    withPointSize(size: number): this;
	    withPointHover(t?: SimpleTemplater<T>): this;
	    withClass(cl: string): this;
	    draw(where: Element): void;
	    protected tooltipEnter(d: T): void;
	    protected tooltipLeave(): void;
	}

}
declare module 'fluent-d3' {
	export * from 'fluent-d3/line-graph-builder';
	export * from 'fluent-d3/donut-graph-builder';
	export * from 'fluent-d3/spark-builder';

}
