/**
 * Submenu Base Class
 * @class
 * @ignore
 */
declare class Submenu {
    selector: any;
    menuBarPosition: any;
    toggleDirection: any;
    colorPickerControls: any;
    constructor(subMenuElement: any, {name, iconStyle, menuBarPosition, templateHtml}: {
        name: any;
        iconStyle: any;
        menuBarPosition: any;
        templateHtml: any;
    });
    colorPickerChangeShow(occurredControl: any): void;
    /**
     * Get butten type
     * @param {HTMLElement} button - event target element
     * @param {array} buttonNames - Array of button names
     * @returns {string} - button type
     */
    getButtonType(button: any, buttonNames: any): any;
    /**
     * Get butten type
     * @param {HTMLElement} target - event target element
     * @param {string} removeClass - remove class name
     * @param {string} addClass - add class name
     */
    changeClass(target: any, removeClass: any, addClass: any): void;
    /**
     * Interface method whose implementation is optional.
     * Returns the menu to its default state.
     */
    changeStandbyMode(): void;
    /**
     * Interface method whose implementation is optional.
     * Executed when the menu starts.
     */
    changeStartMode(): void;
    /**
     * Make submenu dom element
     * @param {HTMLElement} subMenuElement - subment dom element
     * @param {Object} iconStyle -  icon style
     * @private
     */
    _makeSubMenuElement(subMenuElement: any, {name, iconStyle, templateHtml}: {
        name: any;
        iconStyle: any;
        templateHtml: any;
    }): void;
}
export default Submenu;
