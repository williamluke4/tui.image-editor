import Submenu from './submenuBase';
/**
 * Crop ui class
 * @class
 * @ignore
 */
declare class Crop extends Submenu {
    status: any;
    _els: any;
    defaultPresetButton: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for crop
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.crop - crop action
     *   @param {Function} actions.cancel - cancel action
     *   @param {Function} actions.preset - draw rectzone at a predefined ratio
     */
    addEvent(actions: any): void;
    /**
     * Executed when the menu starts.
     */
    changeStartMode(): void;
    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * Change apply button status
     * @param {Boolean} enableStatus - apply button status
     */
    changeApplyButtonStatus(enableStatus: any): void;
    /**
     * Set preset button to active status
     * @param {HTMLElement} button - event target element
     * @private
     */
    _setPresetButtonActive(button?: any): void;
}
export default Crop;
