import Range from './tools/range';
import Submenu from './submenuBase';
/**
 * Filter ui class
 * @class
 * @ignore
 */
declare class Filter extends Submenu {
    selectBoxShow: any;
    checkedMap: any;
    _els: any;
    constructor(subMenuElement: any, {iconStyle, menuBarPosition}: {
        iconStyle: any;
        menuBarPosition: any;
    });
    /**
     * Add event for filter
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.applyFilter - apply filter option
     */
    addEvent({applyFilter}: {
        applyFilter: any;
    }): void;
    /**
     * Add event for filter
     * @param {Function} applyFilter - actions for firter
     * @param {string} filterName - filter name
     */
    _changeRangeValue(applyFilter: any, filterName: any): void;
    /**
     * Get filter option
     * @param {String} type - filter type
     * @returns {Object} filter option object
     * @private
     */
    _getFilterOption(type: any): {};
    /**
     * Make submenu range and colorpicker control
     * @private
     */
    _makeControlElement(): void;
    /**
     * Make submenu control for picker & range mixin
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {Range}
     * @private
     */
    _pickerWithRange(pickerControl: any): Range;
    /**
     * Make submenu control for picker & selectbox
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {HTMLElement}
     * @private
     */
    _pickerWithSelectbox(pickerControl: any): HTMLSelectElement;
    /**
     * Make selectbox option list custom style
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */
    _drawSelectOptionList(selectlist: any, optionlist: any): void;
    /**
     * custome selectbox custom event
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */
    _pickerWithSelectboxForAddEvent(selectlist: any, optionlist: any): void;
    /**
     * Make option list for select control
     * @param {HTMLElement} selectlist - blend option select list element
     * @private
     */
    _makeSelectOptionList(selectlist: any): void;
}
export default Filter;
