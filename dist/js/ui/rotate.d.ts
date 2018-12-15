import Submenu from './submenuBase';
/**
 * Rotate ui class
 * @class
 * @ignore
 */
declare class Rotate extends Submenu {
    _els: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for rotate
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.rotate - rotate action
     *   @param {Function} actions.setAngle - set angle action
     */
    addEvent(actions: any): void;
    /**
     * Change rotate for range
     * @param {number} value - angle value
     * @private
     */
    _changeRotateForRange(value: any): void;
    /**
     * Change rotate for button
     * @param {object} event - add button event object
     * @private
     */
    _changeRotateForButton(event: any): void;
}
export default Rotate;
