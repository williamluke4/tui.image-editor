/**
 * DrawingMode interface
 * @class
 * @param {string} name - drawing mode name
 * @ignore
 */
declare class DrawingMode {
    name: any;
    constructor(name: any);
    /**
     * Get this drawing mode name;
     * @returns {string} drawing mode name
     */
    getName(): any;
    /**
    * start this drawing mode
    * @param {Object} options - drawing mode options
    * @abstract
    */
    start(): void;
    /**
     * stop this drawing mode
     * @abstract
     */
    stop(): void;
}
export default DrawingMode;
