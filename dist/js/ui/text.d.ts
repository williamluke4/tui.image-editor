import Submenu from './submenuBase';
/**
 * Crop ui class
 * @class
 * @ignore
 */
declare class Text extends Submenu {
    effect: any;
    align: any;
    _els: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for text
     * @param {Object} actions - actions for text
     *   @param {Function} actions.changeTextStyle - change text style
     */
    addEvent(actions: any): void;
    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * Executed when the menu starts.
     */
    changeStartMode(): void;
    /**
     * Get text color
     * @returns {string} - text color
     */
    readonly textColor: any;
    /**
     * Get text size
     * @returns {string} - text size
     */
    /**
     * Set text size
     * @param {Number} value - text size
     */
    fontSize: any;
    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */
    _setTextEffectHandler(event: any): void;
    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */
    _setTextAlignHandler(event: any): void;
    /**
     * text align set handler
     * @param {number} value - range value
     * @private
     */
    _changeTextRnageHandler(value: any): void;
    /**
     * change color handler
     * @param {string} color - change color string
     * @private
     */
    _changeColorHandler(color: any): void;
}
export default Text;
