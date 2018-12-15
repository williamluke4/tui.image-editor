import Component from '../interface/component';
/**
 * Icon
 * @class Icon
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
declare class Icon extends Component {
    _oColor: any;
    _pathMap: any;
    useDragAddIcon: any;
    constructor(graphics: any);
    /**
     * Add icon
     * @param {string} type - Icon type
     * @param {Object} options - Icon options
     *      @param {string} [options.fill] - Icon foreground color
     *      @param {string} [options.left] - Icon x position
     *      @param {string} [options.top] - Icon y position
     * @returns {Promise}
     */
    add(type: any, options: any): any;
    /**
     * Added icon drag event
     * @param {fabric.Canvas} canvas - Canvas instance
     * @private
     */
    _addWithDragEvent(canvas: any): void;
    /**
     * Register icon paths
     * @param {{key: string, value: string}} pathInfos - Path infos
     */
    registerPaths(pathInfos: any): void;
    /**
     * Set icon object color
     * @param {string} color - Color to set
     * @param {fabric.Path}[obj] - Current activated path object
     */
    setColor(color: any, obj: any): void;
    /**
     * Get icon color
     * @param {fabric.Path}[obj] - Current activated path object
     * @returns {string} color
     */
    getColor(obj: any): any;
    /**
     * Create icon object
     * @param {string} path - Path value to create icon
     * @returns {fabric.Path} Path object
     */
    _createIcon(path: any): any;
}
export default Icon;
