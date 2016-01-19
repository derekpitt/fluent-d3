export type HasValue = { value: number; };
export type xyData = { x: number | string; y: number };
export type templater = (...args: any[]) => string;
export type SimpleTemplater<T> = (d: T) => string;
export type dataFilter<T> = (d: T) => boolean;
