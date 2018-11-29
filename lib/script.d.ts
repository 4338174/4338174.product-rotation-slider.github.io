import { Promise } from 'es6-promise';
/**
 * A 360 degree slider element
 */
declare class Slider {
    private imagePaths;
    private activeImage;
    private dragOffset;
    private lastPosition;
    private mouseDownId;
    private preloadedImgElements;
    private sliderElement;
    constructor(id: string, imagePaths: string[], loadingImagePath: string);
    mouseDown: (event: Event) => void;
    mouseMove: (event: Event) => void;
    mouseUp: () => void;
    onDrag(currentPosition: number): void;
    preloadImages(srcs: string[]): Promise<HTMLImageElement[]>;
    replaceImgElement(newImgElement: Element): void;
    touchEnd: (_event: Event) => void;
    touchMove: (event: Event) => void;
    touchStart: (event: Event) => void;
}
export declare const slider: Slider;
export {};
