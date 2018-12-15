import Submenu from './submenuBase';
/**
 * Draw ui class
 * @class
 * @ignore
 */
declare class Draw extends Submenu {
    _els: any;
    type: any;
    color: any;
    width: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for draw
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.setDrawMode - set draw mode
     */
    addEvent(actions: any): void;
    /**
     * set draw mode - action runner
     */
    setDrawMode(): void;
    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * Executed when the menu starts.
     */
    changeStartMode(): void;
    /**
     * Change draw type event
     * @param {object} event - line select event
     * @private
     */
    _changeDrawType(event: any): void;
    /**
     * Change drawing color
     * @param {string} color - select drawing color
     * @private
     */
    _changeDrawColor(color: any): void;
    /**
     * Change drawing Range
     * @param {number} value - select drawing range
     * @private
     */
    _changeDrawRange(value: any): void;
}
export default Draw;
