import Submenu from './submenuBase';
/**
 * Flip ui class
 * @class
 * @ignore
 */
declare class Flip extends Submenu {
    flipStatus: any;
    _els: any;
    _actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for flip
     * @param {Object} actions - actions for flip
     *   @param {Function} actions.flip - flip action
     */
    addEvent(actions: any): void;
    /**
     * change Flip status
     * @param {object} event - change event
     * @private
     */
    _changeFlip(event: any): void;
}
export default Flip;
