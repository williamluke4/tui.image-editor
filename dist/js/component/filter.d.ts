import Component from '../interface/component';
/**
 * Filter
 * @class Filter
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
declare class Filter extends Component {
    length: any;
    constructor(graphics: any);
    /**
     * Add filter to source image (a specific filter is added on fabric.js)
     * @param {string} type - Filter type
     * @param {Object} [options] - Options of filter
     * @returns {Promise}
     */
    add(type: any, options: any): any;
    /**
     * Remove filter to source image
     * @param {string} type - Filter type
     * @returns {Promise}
     */
    remove(type: any): any;
    /**
     * Whether this has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */
    hasFilter(type: any): boolean;
    /**
     * Get a filter options
     * @param {string} type - Filter type
     * @returns {Object} filter options or null if there is no that filter
     */
    getOptions(type: any): any;
    /**
     * Change filter values
     * @param {Object} imgFilter object of filter
     * @param {Object} options object
     * @private
     */
    _changeFilterValues(imgFilter: any, options: any): void;
    /**
     * Apply filter
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {function} callback - Executed function after applying filter
     * @private
     */
    _apply(sourceImg: any, callback: any): void;
    /**
     * Get source image on canvas
     * @returns {fabric.Image} Current source image on canvas
     * @private
     */
    _getSourceImage(): any;
    /**
     * Create filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @param {Object} [options] - Options of filter
     * @returns {Object} Fabric object of filter
     * @private
     */
    _createFilter(sourceImg: any, type: any, options: any): any;
    /**
     * Get applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @returns {Object} Fabric object of filter
     * @private
     */
    _getFilter(sourceImg: any, type: any): any;
    /**
     * Remove applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @private
     */
    _removeFilter(sourceImg: any, type: any): void;
    /**
     * Change filter class name to fabric's, especially capitalizing first letter
     * @param {string} type - Filter type
     * @example
     * 'grayscale' -> 'Grayscale'
     * @returns {string} Fabric filter class name
     */
    _getFabricFilterType(type: any): any;
}
export default Filter;
