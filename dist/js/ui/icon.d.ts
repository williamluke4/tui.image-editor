import Submenu from './submenuBase';
/**
 * Icon ui class
 * @class
 * @ignore
 */
declare class Icon extends Submenu {
    iconType: any;
    _iconMap: any;
    _els: any;
    actions: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for icon
     * @param {Object} actions - actions for icon
     *   @param {Function} actions.registCustomIcon - register icon
     *   @param {Function} actions.addIcon - add icon
     *   @param {Function} actions.changeColor - change icon color
     */
    addEvent(actions: any): void;
    /**
     * Clear icon type
     */
    clearIconType(): void;
    /**
     * Register default icon
     */
    registDefaultIcon(): void;
    /**
     * Set icon picker color
     * @param {string} iconColor - rgb color string
     */
    setIconPickerColor(iconColor: any): void;
    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * Change icon color
     * @param {string} color - color for change
     * @private
     */
    _changeColorHandler(color: any): void;
    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */
    _addIconHandler(event: any): void;
    /**
     * register icon
     * @param {object} event - file change event object
     * @private
     */
    _registeIconHandler(event: any): void;
}
export default Icon;
