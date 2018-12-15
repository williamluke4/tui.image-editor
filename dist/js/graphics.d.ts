/**
 * Graphics class
 * @class
 * @param {string|jQuery|HTMLElement} wrapper - Wrapper's element or selector
 * @param {Object} [option] - Canvas max width & height of css
 *  @param {number} option.cssMaxWidth - Canvas css-max-width
 *  @param {number} option.cssMaxHeight - Canvas css-max-height
 *  @param {boolean} option.useItext - Use IText in text mode
 *  @param {boolean} option.useDragAddIcon - Use dragable add in icon mode
 * @ignore
 */
declare class Graphics {
    canvasImage: any;
    cssMaxWidth: any;
    cssMaxHeight: any;
    useItext: any;
    useDragAddIcon: any;
    cropSelectionStyle: any;
    imageName: any;
    _objects: any;
    _canvas: any;
    _drawingMode: any;
    _drawingModeMap: any;
    _componentMap: any;
    _handler: any;
    fire: any;
    wrapperEl: any;
    width: any;
    height: any;
    x: any;
    y: any;
    originX: any;
    originY: any;
    target: any;
    constructor(element: any, {cssMaxWidth, cssMaxHeight, useItext, useDragAddIcon}?: {
        cssMaxWidth: any;
        cssMaxHeight: any;
        useItext?: boolean;
        useDragAddIcon?: boolean;
    });
    /**
     * Destroy canvas element
     */
    destroy(): void;
    /**
     * Deactivates all objects on canvas
     * @returns {Graphics} this
     */
    deactivateAll(): this;
    /**
     * Renders all objects on canvas
     * @returns {Graphics} this
     */
    renderAll(): this;
    /**
     * Adds objects on canvas
     * @param {Object|Array} objects - objects
     */
    add(objects: any): void;
    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     * @returns {boolean} true if contains or false
     */
    contains(target: any): any;
    /**
     * Gets all objects or group
     * @returns {Array} all objects, shallow copy
     */
    getObjects(): any;
    /**
     * Get an object by id
     * @param {number} id - object id
     * @returns {fabric.Object} object corresponding id
     */
    getObject(id: any): any;
    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     */
    remove(target: any): void;
    /**
     * Removes all object or group
     * @param {boolean} includesBackground - remove the background image or not
     * @returns {Array} all objects array which is removed
     */
    removeAll(includesBackground: any): any;
    /**
     * Removes an object or group by id
     * @param {number} id - object id
     * @returns {Array} removed objects
     */
    removeObjectById(id: any): any[];
    /**
     * Get an id by object instance
     * @param {fabric.Object} object object
     * @returns {number} object id if it exists or null
     */
    getObjectId(object: any): string;
    /**
     * Gets an active object or group
     * @returns {Object} active object or group instance
     */
    getActiveObject(): any;
    /**
     * Gets an active group object
     * @returns {Object} active group object instance
     */
    getActiveGroupObject(): any;
    /**
     * Activates an object or group
     * @param {Object} target - target object or group
     */
    setActiveObject(target: any): void;
    /**
     * Set Crop selection style
     * @param {Object} style - Selection styles
     */
    setCropSelectionStyle(style: any): void;
    /**
     * Get component
     * @param {string} name - Component name
     * @returns {Component}
     */
    getComponent(name: any): any;
    /**
     * Get current drawing mode
     * @returns {string}
     */
    getDrawingMode(): any;
    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param {String} mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE', 'TEXT', 'SHAPE'</I>
     * @param {Object} [option] parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     *  @param {Number} [option.width] brush width
     *  @param {String} [option.color] brush color
     * @returns {boolean} true if success or false
     */
    startDrawingMode(mode: any, option: any): boolean;
    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     */
    stopDrawingMode(): void;
    /**
     * To data url from canvas
     * @param {Object} options - options for toDataURL
     *   @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
     *   @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
     *   @param {Number} [options.multiplier=1] Multiplier to scale by
     *   @param {Number} [options.left] Cropping left offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.top] Cropping top offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.width] Cropping width. Introduced in fabric v1.2.14
     *   @param {Number} [options.height] Cropping height. Introduced in fabric v1.2.14
     * @returns {string} A DOMString containing the requested data URI.
     */
    toDataURL(options: any): any;
    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {?fabric.Image} canvasImage - Fabric image instance
     */
    setCanvasImage(name: any, canvasImage: any): void;
    /**
     * Set css max dimension
     * @param {{width: number, height: number}} maxDimension - Max width & Max height
     */
    setCssMaxDimension(maxDimension: any): void;
    /**
     * Adjust canvas dimension with scaling image
     */
    adjustCanvasDimension(): void;
    /**
     * Set canvas dimension - css only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas css dimension
     */
    setCanvasCssDimension(dimension: any): void;
    /**
     * Set canvas dimension - backstore only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas backstore dimension
     */
    setCanvasBackstoreDimension(dimension: any): void;
    /**
     * Set image properties
     * {@link http://fabricjs.com/docs/fabric.Image.html#set}
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */
    setImageProperties(setting: any, withRendering: any): void;
    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    getCanvasElement(): any;
    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     * @private
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
     * Add image object on canvas
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise}
     */
    addImageObject(imgUrl: any): any;
    /**
     * Get center position of canvas
     * @returns {Object} {left, top}
     */
    getCenter(): any;
    /**
     * Get cropped rect
     * @returns {Object} rect
     */
    getCropzoneRect(): any;
    /**
     * Get cropped rect
     * @param {Object} mode cropzone rect mode
     * @returns {Object} rect
     */
    setCropzoneRect(mode: any): any;
    /**
     * Get cropped image data
     * @param {Object} cropRect cropzone rect
     *  @param {Number} cropRect.left left position
     *  @param {Number} cropRect.top top position
     *  @param {Number} cropRect.width width
     *  @param {Number} cropRect.height height
     * @returns {?{imageName: string, url: string}} cropped Image data
     */
    getCroppedImageData(cropRect: any): any;
    /**
     * Set brush option
     * @param {Object} option brush option
     *  @param {Number} option.width width
     *  @param {String} option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */
    setBrush(option: any): void;
    /**
     * Set states of current drawing shape
     * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param {Object} [options] - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stoke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     */
    setDrawingShape(type: any, options: any): void;
    /**
     * Register icon paths
     * @param {Object} pathInfos - Path infos
     *  @param {string} pathInfos.key - key
     *  @param {string} pathInfos.value - value
     */
    registerPaths(pathInfos: any): void;
    /**
     * Change cursor style
     * @param {string} cursorType - cursor type
     */
    changeCursor(cursorType: any): void;
    /**
     * Whether it has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */
    hasFilter(type: any): any;
    /**
     * Set selection style of fabric object by init option
     * @param {Object} styles - Selection styles
     */
    setSelectionStyle(styles: any): void;
    /**
     * Set object properties
     * @param {number} id - object id
     * @param {Object} props - props
     *     @param {string} [props.fill] Color
     *     @param {string} [props.fontFamily] Font type for text
     *     @param {number} [props.fontSize] Size
     *     @param {string} [props.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [props.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [props.textAlign] Type of text align (left / center / right)
     *     @param {string} [props.textDecoraiton] Type of line (underline / line-throgh / overline)
     * @returns {Object} applied properties
     */
    setObjectProperties(id: any, props: any): any;
    /**
     * Get object properties corresponding key
     * @param {number} id - object id
     * @param {Array<string>|ObjectProps|string} keys - property's key
     * @returns {Object} properties
     */
    getObjectProperties(id: any, keys: any): {};
    /**
     * Get object position by originX, originY
     * @param {number} id - object id
     * @param {string} originX - can be 'left', 'center', 'right'
     * @param {string} originY - can be 'top', 'center', 'bottom'
     * @returns {Object} {{x:number, y: number}} position by origin if id is valid, or null
     */
    getObjectPosition(id: any, originX: any, originY: any): any;
    /**
     * Set object position  by originX, originY
     * @param {number} id - object id
     * @param {Object} posInfo - position object
     *  @param {number} posInfo.x - x position
     *  @param {number} posInfo.y - y position
     *  @param {string} posInfo.originX - can be 'left', 'center', 'right'
     *  @param {string} posInfo.originY - can be 'top', 'center', 'bottom'
     * @returns {boolean} true if target id is valid or false
     */
    setObjectPosition(id: any, posInfo: any): boolean;
    /**
     * Get the canvas size
     * @returns {Object} {{width: number, height: number}} image size
     */
    getCanvasSize(): {
        width: any;
        height: any;
    };
    /**
     * Get a DrawingMode instance
     * @param {string} modeName - DrawingMode Class Name
     * @returns {DrawingMode} DrawingMode instance
     * @private
     */
    _getDrawingModeInstance(modeName: any): any;
    /**
     * Set canvas element to fabric.Canvas
     * @param {jQuery|Element|string} element - Wrapper or canvas element or selector
     * @private
     */
    _setCanvasElement(element: any): void;
    /**
     * Creates DrawingMode instances
     * @private
     */
    _createDrawingModeInstances(): void;
    /**
     * Create components
     * @private
     */
    _createComponents(): void;
    /**
     * Register component
     * @param {Object} map - map object
     * @param {Object} module - module which has getName method
     * @private
     */
    _register(map: any, module: any): void;
    /**
     * Get the current drawing mode is same with given mode
     * @param {string} mode drawing mode
     * @returns {boolean} true if same or false
     */
    _isSameDrawingMode(mode: any): boolean;
    /**
     * Calculate max dimension of canvas
     * The css-max dimension is dynamically decided with maintaining image ratio
     * The css-max dimension is lower than canvas dimension (attribute of canvas, not css)
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @returns {{width: number, height: number}} - Max width & Max height
     * @private
     */
    _calcMaxDimension(width: any, height: any): {
        width: number;
        height: number;
    };
    /**
     * Callback function after loading image
     * @param {fabric.Image} obj - Fabric image object
     * @private
     */
    _callbackAfterLoadingImageObject(obj: any): void;
    /**
     * Attach canvas's events
     */
    _attachCanvasEvents(): void;
    /**
     * "mouse:down" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onMouseDown(fEvent: any): void;
    /**
     * "object:added" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onObjectAdded(fEvent: any): void;
    /**
     * "object:removed" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onObjectRemoved(fEvent: any): void;
    /**
     * "object:moving" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onObjectMoved(fEvent: any): void;
    /**
     * "object:scaling" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onObjectScaled(fEvent: any): void;
    /**
     * "object:selected" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onObjectSelected(fEvent: any): void;
    /**
     * "path:created" canvas event handler
     * @param {{path: fabric.Path}} obj - Path object
     * @private
     */
    _onPathCreated(obj: any): void;
    /**
     * "selction:cleared" canvas event handler
     * @private
     */
    _onSelectionCleared(): void;
    /**
     * "selction:created" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onSelectionCreated(fEvent: any): void;
    /**
     * Canvas discard selection all
     */
    discardSelection(): void;
    /**
     * Canvas Selectable status change
     * @param {boolean} selectable - expect status
     */
    changeSelectableAll(selectable: any): void;
    /**
     * Return object's properties
     * @param {fabric.Object} obj - fabric object
     * @returns {Object} properties object
     */
    createObjectProperties(obj: any): {
        id: any;
        type: any;
    };
    /**
     * Get text object's properties
     * @param {fabric.Object} obj - fabric text object
     * @param {Object} props - properties
     * @returns {Object} properties object
     */
    _createTextProperties(obj: any): {};
    /**
     * Add object array by id
     * @param {fabric.Object} obj - fabric object
     * @returns {number} object id
     */
    _addFabricObject(obj: any): any;
    /**
     * Remove an object in array yb id
     * @param {number} id - object id
     */
    _removeFabricObject(id: any): void;
}
export default Graphics;
