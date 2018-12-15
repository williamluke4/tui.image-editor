import Submenu from './submenuBase';
/**
 * Mask ui class
 * @class
 * @ignore
 */
declare class Mask extends Submenu {
    _els: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for mask
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.loadImageFromURL - load image action
     *   @param {Function} actions.applyFilter - apply filter action
     */
    addEvent(actions: any): void;
    /**
     * Apply mask
     * @private
     */
    _applyMask(): void;
    /**
     * Load mask file
     * @param {object} event - File change event object
     * @private
     */
    _loadMaskFile(event: any): void;
}
export default Mask;
