import Submenu from './submenuBase';
/**
 * Shape ui class
 * @class
 * @ignore
 */
declare class Shape extends Submenu {
    type: any;
    options: any;
    _els: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for shape
     * @param {Object} actions - actions for shape
     *   @param {Function} actions.changeShape - change shape mode
     *   @param {Function} actions.setDrawingShape - set dreawing shape
     */
    addEvent(actions: any): void;
    /**
     * Set Shape status
     * @param {Object} options - options of shape status
     *   @param {string} strokeWidth - stroke width
     *   @param {string} strokeColor - stroke color
     *   @param {string} fillColor - fill color
     */
    setShapeStatus({strokeWidth, strokeColor, fillColor}: {
        strokeWidth: any;
        strokeColor: any;
        fillColor: any;
    }): void;
    /**
     * Executed when the menu starts.
     */
    changeStartMode(): void;
    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * set range stroke max value
     * @param {number} maxValue - expect max value for change
     */
    setMaxStrokeValue(maxValue: any): void;
    /**
     * Set stroke value
     * @param {number} value - expect value for strokeRange change
     */
    setStrokeValue(value: any): void;
    /**
     * Get stroke value
     * @returns {number} - stroke range value
     */
    getStrokeValue(): any;
    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */
    _changeShapeHandler(event: any): void;
    /**
     * Change stroke range
     * @param {number} value - stroke range value
     * @private
     */
    _changeStrokeRangeHandler(value: any): void;
    /**
     * Change shape color
     * @param {string} color - fill color
     * @private
     */
    _changeFillColorHandler(color: any): void;
    /**
     * Change shape stroke color
     * @param {string} color - fill color
     * @private
     */
    _changeStrokeColorHandler(color: any): void;
}
export default Shape;
