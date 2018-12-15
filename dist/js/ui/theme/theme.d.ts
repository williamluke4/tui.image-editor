/**
 * Theme manager
 * @class
 * @param {Object} customTheme - custom theme
 * @ignore
 */
declare class Theme {
    styles: any;
    constructor(customTheme: any);
    /**
     * Get a Style cssText or StyleObject
     * @param {string} type - style type
     * @returns {string|object} - cssText or StyleObject
     */
    getStyle(type: any): any;
    /**
     * Make css resource
     * @returns {string} - serialized css text
     * @private
     */
    _styleMaker(): string;
    /**
     * Change to low dimensional object.
     * @param {object} styleOptions - style object of user interface
     * @returns {object} low level object for style apply
     * @private
     */
    _changeToObject(styleOptions: any): {};
    /**
     * Style object to Csstext serialize
     * @param {object} styleObject - style object
     * @returns {string} - css text string
     * @private
     */
    _makeCssText(styleObject: any): string;
    /**
     * Camel key string to Underscore string
     * @param {string} targetString - change target
     * @returns {string}
     * @private
     */
    _toUnderScore(targetString: any): any;
}
export default Theme;
