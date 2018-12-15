/**
 * Colorpicker control class
 * @class
 * @ignore
 */
declare class Colorpicker {
    _show: any;
    _colorpickerElement: any;
    _toggleDirection: any;
    _color: any;
    picker: any;
    pickerElement: any;
    colorElement: any;
    pickerControl: any;
    fire: any;
    constructor(colorpickerElement: any, defaultColor?: string, toggleDirection?: string);
    /**
     * Get color
     * @returns {Number} color value
     */
    /**
     * Set color
     * @param {string} color color value
     */
    color: any;
    /**
     * Change color element
     * @param {string} color color value
     * #private
     */
    _changeColorElement(color: any): void;
    /**
     * Make picker button element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} defaultColor color value
     * @private
     */
    _makePickerButtonElement(colorpickerElement: any, defaultColor: any): void;
    /**
     * Make picker layer element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} title picker title
     * @private
     */
    _makePickerLayerElement(colorpickerElement: any, title: any): void;
    /**
     * Add event
     * @param {HTMLElement} colorpickerElement color picker element
     * @private
     */
    _addEvent(colorpickerElement: any): void;
    hide(): void;
    /**
     * Set picker control position
     * @private
     */
    _setPickerControlPosition(): void;
}
export default Colorpicker;
