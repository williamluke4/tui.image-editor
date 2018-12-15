/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Component interface
 */
/**
 * Component interface
 * @class
 * @param {string} name - component name
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
declare class Component {
    name: any;
    graphics: any;
    constructor(name: any, graphics: any);
    /**
     * Fire Graphics event
     * @param {Array} args - arguments
     * @returns {Object} return value
     */
    fire(...args: any[]): any;
    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {fabric.Image} oImage - Fabric image instance
     */
    setCanvasImage(name: any, oImage: any): void;
    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    getCanvasElement(): any;
    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */
    getCanvas(): any;
    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */
    getCanvasImage(): any;
    /**
     * Get image name
     * @returns {string}
     */
    getImageName(): any;
    /**
     * Get image editor
     * @returns {ImageEditor}
     */
    getEditor(): any;
    /**
     * Return component name
     * @returns {string}
     */
    getName(): any;
    /**
     * Set image properties
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */
    setImageProperties(setting: any, withRendering: any): void;
    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas css dimension
     */
    setCanvasCssDimension(dimension: any): void;
    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas backstore dimension
     */
    setCanvasBackstoreDimension(dimension: any): void;
    /**
     * Adjust canvas dimension with scaling image
     */
    adjustCanvasDimension(): void;
}
export default Component;
