/**
 * Range control class
 * @class
 * @ignore
 */
declare class Range {
    _value: any;
    rangeElement: any;
    rangeWidth: any;
    _min: any;
    _max: any;
    _absMax: any;
    realTimeEvent: any;
    pointer: any;
    subbar: any;
    fire: any;
    bar: any;
    firstPosition: any;
    firstLeft: any;
    dragEventHandler: any;
    constructor(rangeElement: any, options?: {});
    /**
     * Set range max value and re position cursor
     * @param {number} maxValue - max value
     */
    max: any;
    /**
     * Get range value
     * @returns {Number} range value
     */
    /**
     * Set range value
     * @param {Number} value range value
     * @param {Boolean} fire whether fire custom event or not
     */
    value: any;
    /**
     * event tirigger
     * @param {string} type - type
     */
    trigger(type: any): void;
    /**
     * Make range element
     * @private
     */
    _drawRangeElement(): void;
    /**
     * Add Range click event
     * @private
     */
    _addClickEvent(): void;
    /**
     * Add Range drag event
     * @private
     */
    _addDragEvent(): void;
    /**
     * change angle event
     * @param {object} event - change event
     * @private
     */
    _changeAngle(event: any): void;
    /**
     * stop change angle event
     * @private
     */
    _stopChangingAngle(): void;
}
export default Range;
