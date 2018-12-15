"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Graphics module
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var fabric_require_1 = require("fabric/dist/fabric.require");
var imageLoader_1 = require("./component/imageLoader");
var cropper_1 = require("./component/cropper");
var flip_1 = require("./component/flip");
var rotation_1 = require("./component/rotation");
var freeDrawing_1 = require("./component/freeDrawing");
var line_1 = require("./component/line");
var text_1 = require("./component/text");
var icon_1 = require("./component/icon");
var filter_1 = require("./component/filter");
var shape_1 = require("./component/shape");
var cropper_2 = require("./drawingMode/cropper");
var freeDrawing_2 = require("./drawingMode/freeDrawing");
var lineDrawing_1 = require("./drawingMode/lineDrawing");
var shape_2 = require("./drawingMode/shape");
var text_2 = require("./drawingMode/text");
var consts = require("./consts");
var util = require("./util");
var components = consts.componentNames;
var events = consts.eventNames;
var drawingModes = consts.drawingModes, fObjectOptions = consts.fObjectOptions;
var extend = tui_code_snippet_1.default.extend, stamp = tui_code_snippet_1.default.stamp, isArray = tui_code_snippet_1.default.isArray, isString = tui_code_snippet_1.default.isString, forEachArray = tui_code_snippet_1.default.forEachArray, forEachOwnProperties = tui_code_snippet_1.default.forEachOwnProperties, CustomEvents = tui_code_snippet_1.default.CustomEvents;
var DEFAULT_CSS_MAX_WIDTH = 1000;
var DEFAULT_CSS_MAX_HEIGHT = 800;
var cssOnly = {
    cssOnly: true
};
var backstoreOnly = {
    backstoreOnly: true
};
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
var Graphics = /** @class */ (function () {
    function Graphics(element, _a) {
        var _b = _a === void 0 ? {} : _a, cssMaxWidth = _b.cssMaxWidth, cssMaxHeight = _b.cssMaxHeight, _c = _b.useItext, useItext = _c === void 0 ? false : _c, _d = _b.useDragAddIcon, useDragAddIcon = _d === void 0 ? false : _d;
        /**
         * Fabric image instance
         * @type {fabric.Image}
         */
        this.canvasImage = null;
        /**
         * Max width of canvas elements
         * @type {number}
         */
        this.cssMaxWidth = cssMaxWidth || DEFAULT_CSS_MAX_WIDTH;
        /**
         * Max height of canvas elements
         * @type {number}
         */
        this.cssMaxHeight = cssMaxHeight || DEFAULT_CSS_MAX_HEIGHT;
        /**
         * Use Itext mode for text component
         * @type {boolean}
         */
        this.useItext = useItext;
        /**
         * Use add drag icon mode for icon component
         * @type {boolean}
         */
        this.useDragAddIcon = useDragAddIcon;
        /**
         * cropper Selection Style
         * @type {Object}
         */
        this.cropSelectionStyle = {};
        /**
         * Image name
         * @type {string}
         */
        this.imageName = "";
        /**
         * Object Map
         * @type {Object}
         * @private
         */
        this._objects = {};
        /**
         * Fabric-Canvas instance
         * @type {fabric.Canvas}
         * @private
         */
        this._canvas = null;
        /**
         * Drawing mode
         * @type {string}
         * @private
         */
        this._drawingMode = drawingModes.NORMAL;
        /**
         * DrawingMode map
         * @type {Object.<string, DrawingMode>}
         * @private
         */
        this._drawingModeMap = {};
        /**
         * Component map
         * @type {Object.<string, Component>}
         * @private
         */
        this._componentMap = {};
        /**
         * fabric event handlers
         * @type {Object.<string, function>}
         * @private
         */
        this._handler = {
            onMouseDown: this._onMouseDown.bind(this),
            onObjectAdded: this._onObjectAdded.bind(this),
            onObjectRemoved: this._onObjectRemoved.bind(this),
            onObjectMoved: this._onObjectMoved.bind(this),
            onObjectScaled: this._onObjectScaled.bind(this),
            onObjectSelected: this._onObjectSelected.bind(this),
            onPathCreated: this._onPathCreated.bind(this),
            onSelectionCleared: this._onSelectionCleared.bind(this),
            onSelectionCreated: this._onSelectionCreated.bind(this)
        };
        this._setCanvasElement(element);
        this._createDrawingModeInstances();
        this._createComponents();
        this._attachCanvasEvents();
    }
    /**
     * Destroy canvas element
     */
    Graphics.prototype.destroy = function () {
        var wrapperEl = this._canvas.wrapperEl;
        this._canvas.clear();
        wrapperEl.parentNode.removeChild(wrapperEl);
    };
    /**
     * Deactivates all objects on canvas
     * @returns {Graphics} this
     */
    Graphics.prototype.deactivateAll = function () {
        this._canvas.deactivateAll();
        return this;
    };
    /**
     * Renders all objects on canvas
     * @returns {Graphics} this
     */
    Graphics.prototype.renderAll = function () {
        this._canvas.renderAll();
        return this;
    };
    /**
     * Adds objects on canvas
     * @param {Object|Array} objects - objects
     */
    Graphics.prototype.add = function (objects) {
        var theArgs = [];
        if (isArray(objects)) {
            theArgs = objects;
        }
        else {
            theArgs.push(objects);
        }
        (_a = this._canvas).add.apply(_a, theArgs);
        var _a;
    };
    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     * @returns {boolean} true if contains or false
     */
    Graphics.prototype.contains = function (target) {
        return this._canvas.contains(target);
    };
    /**
     * Gets all objects or group
     * @returns {Array} all objects, shallow copy
     */
    Graphics.prototype.getObjects = function () {
        return this._canvas.getObjects().slice();
    };
    /**
     * Get an object by id
     * @param {number} id - object id
     * @returns {fabric.Object} object corresponding id
     */
    Graphics.prototype.getObject = function (id) {
        return this._objects[id];
    };
    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     */
    Graphics.prototype.remove = function (target) {
        this._canvas.remove(target);
    };
    /**
     * Removes all object or group
     * @param {boolean} includesBackground - remove the background image or not
     * @returns {Array} all objects array which is removed
     */
    Graphics.prototype.removeAll = function (includesBackground) {
        var canvas = this._canvas;
        var objects = canvas.getObjects().slice();
        canvas.remove.apply(canvas, this._canvas.getObjects());
        if (includesBackground) {
            canvas.clear();
        }
        return objects;
    };
    /**
     * Removes an object or group by id
     * @param {number} id - object id
     * @returns {Array} removed objects
     */
    Graphics.prototype.removeObjectById = function (id) {
        var objects = [];
        var canvas = this._canvas;
        var target = this.getObject(id);
        var isValidGroup = target && target.isType("group") && !target.isEmpty();
        if (isValidGroup) {
            canvas.discardActiveGroup(); // restore states for each objects
            target.forEachObject(function (obj) {
                objects.push(obj);
                obj.remove();
            });
        }
        else if (canvas.contains(target)) {
            objects.push(target);
            target.remove();
        }
        return objects;
    };
    /**
     * Get an id by object instance
     * @param {fabric.Object} object object
     * @returns {number} object id if it exists or null
     */
    Graphics.prototype.getObjectId = function (object) {
        var key = null;
        for (key in this._objects) {
            if (this._objects.hasOwnProperty(key)) {
                if (object === this._objects[key]) {
                    return key;
                }
            }
        }
        return null;
    };
    /**
     * Gets an active object or group
     * @returns {Object} active object or group instance
     */
    Graphics.prototype.getActiveObject = function () {
        return this._canvas.getActiveObject();
    };
    /**
     * Gets an active group object
     * @returns {Object} active group object instance
     */
    Graphics.prototype.getActiveGroupObject = function () {
        return this._canvas.getActiveGroup();
    };
    /**
     * Activates an object or group
     * @param {Object} target - target object or group
     */
    Graphics.prototype.setActiveObject = function (target) {
        this._canvas.setActiveObject(target);
    };
    /**
     * Set Crop selection style
     * @param {Object} style - Selection styles
     */
    Graphics.prototype.setCropSelectionStyle = function (style) {
        this.cropSelectionStyle = style;
    };
    /**
     * Get component
     * @param {string} name - Component name
     * @returns {Component}
     */
    Graphics.prototype.getComponent = function (name) {
        return this._componentMap[name];
    };
    /**
     * Get current drawing mode
     * @returns {string}
     */
    Graphics.prototype.getDrawingMode = function () {
        return this._drawingMode;
    };
    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param {String} mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE', 'TEXT', 'SHAPE'</I>
     * @param {Object} [option] parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     *  @param {Number} [option.width] brush width
     *  @param {String} [option.color] brush color
     * @returns {boolean} true if success or false
     */
    Graphics.prototype.startDrawingMode = function (mode, option) {
        if (this._isSameDrawingMode(mode)) {
            return true;
        }
        // If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
        this.stopDrawingMode();
        var drawingModeInstance = this._getDrawingModeInstance(mode);
        if (drawingModeInstance && drawingModeInstance.start) {
            drawingModeInstance.start(this, option);
            this._drawingMode = mode;
        }
        return !!drawingModeInstance;
    };
    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     */
    Graphics.prototype.stopDrawingMode = function () {
        if (this._isSameDrawingMode(drawingModes.NORMAL)) {
            return;
        }
        var drawingModeInstance = this._getDrawingModeInstance(this.getDrawingMode());
        if (drawingModeInstance && drawingModeInstance.end) {
            drawingModeInstance.end(this);
        }
        this._drawingMode = drawingModes.NORMAL;
    };
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
    Graphics.prototype.toDataURL = function (options) {
        return this._canvas && this._canvas.toDataURL(options);
    };
    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {?fabric.Image} canvasImage - Fabric image instance
     */
    Graphics.prototype.setCanvasImage = function (name, canvasImage) {
        if (canvasImage) {
            stamp(canvasImage);
        }
        this.imageName = name;
        this.canvasImage = canvasImage;
    };
    /**
     * Set css max dimension
     * @param {{width: number, height: number}} maxDimension - Max width & Max height
     */
    Graphics.prototype.setCssMaxDimension = function (maxDimension) {
        this.cssMaxWidth = maxDimension.width || this.cssMaxWidth;
        this.cssMaxHeight = maxDimension.height || this.cssMaxHeight;
    };
    /**
     * Adjust canvas dimension with scaling image
     */
    Graphics.prototype.adjustCanvasDimension = function () {
        var canvasImage = this.canvasImage.scale(1);
        var _a = canvasImage.getBoundingRect(), width = _a.width, height = _a.height;
        var maxDimension = this._calcMaxDimension(width, height);
        this.setCanvasCssDimension({
            width: "100%",
            height: "100%",
            "max-width": maxDimension.width + "px",
            "max-height": maxDimension.height + "px"
        });
        this.setCanvasBackstoreDimension({
            width: width,
            height: height
        });
        this._canvas.centerObject(canvasImage);
    };
    /**
     * Set canvas dimension - css only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas css dimension
     */
    Graphics.prototype.setCanvasCssDimension = function (dimension) {
        this._canvas.setDimensions(dimension, cssOnly);
    };
    /**
     * Set canvas dimension - backstore only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas backstore dimension
     */
    Graphics.prototype.setCanvasBackstoreDimension = function (dimension) {
        this._canvas.setDimensions(dimension, backstoreOnly);
    };
    /**
     * Set image properties
     * {@link http://fabricjs.com/docs/fabric.Image.html#set}
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */
    Graphics.prototype.setImageProperties = function (setting, withRendering) {
        var canvasImage = this.canvasImage;
        if (!canvasImage) {
            return;
        }
        canvasImage.set(setting).setCoords();
        if (withRendering) {
            this._canvas.renderAll();
        }
    };
    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    Graphics.prototype.getCanvasElement = function () {
        return this._canvas.getElement();
    };
    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     * @private
     */
    Graphics.prototype.getCanvas = function () {
        return this._canvas;
    };
    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */
    Graphics.prototype.getCanvasImage = function () {
        return this.canvasImage;
    };
    /**
     * Get image name
     * @returns {string}
     */
    Graphics.prototype.getImageName = function () {
        return this.imageName;
    };
    /**
     * Add image object on canvas
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise}
     */
    Graphics.prototype.addImageObject = function (imgUrl) {
        var _this = this;
        var callback = this._callbackAfterLoadingImageObject.bind(this);
        return new promise_1.default(function (resolve) {
            fabric_require_1.default.Image.fromURL(imgUrl, function (image) {
                callback(image);
                resolve(_this.createObjectProperties(image));
            }, {
                crossOrigin: "Anonymous"
            });
        });
    };
    /**
     * Get center position of canvas
     * @returns {Object} {left, top}
     */
    Graphics.prototype.getCenter = function () {
        return this._canvas.getCenter();
    };
    /**
     * Get cropped rect
     * @returns {Object} rect
     */
    Graphics.prototype.getCropzoneRect = function () {
        return this.getComponent(components.CROPPER).getCropzoneRect();
    };
    /**
     * Get cropped rect
     * @param {Object} mode cropzone rect mode
     * @returns {Object} rect
     */
    Graphics.prototype.setCropzoneRect = function (mode) {
        return this.getComponent(components.CROPPER).setCropzoneRect(mode);
    };
    /**
     * Get cropped image data
     * @param {Object} cropRect cropzone rect
     *  @param {Number} cropRect.left left position
     *  @param {Number} cropRect.top top position
     *  @param {Number} cropRect.width width
     *  @param {Number} cropRect.height height
     * @returns {?{imageName: string, url: string}} cropped Image data
     */
    Graphics.prototype.getCroppedImageData = function (cropRect) {
        return this.getComponent(components.CROPPER).getCroppedImageData(cropRect);
    };
    /**
     * Set brush option
     * @param {Object} option brush option
     *  @param {Number} option.width width
     *  @param {String} option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */
    Graphics.prototype.setBrush = function (option) {
        var drawingMode = this._drawingMode;
        var compName = components.FREE_DRAWING;
        if (drawingMode === drawingModes.LINE) {
            compName = drawingModes.LINE;
        }
        this.getComponent(compName).setBrush(option);
    };
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
    Graphics.prototype.setDrawingShape = function (type, options) {
        this.getComponent(components.SHAPE).setStates(type, options);
    };
    /**
     * Register icon paths
     * @param {Object} pathInfos - Path infos
     *  @param {string} pathInfos.key - key
     *  @param {string} pathInfos.value - value
     */
    Graphics.prototype.registerPaths = function (pathInfos) {
        this.getComponent(components.ICON).registerPaths(pathInfos);
    };
    /**
     * Change cursor style
     * @param {string} cursorType - cursor type
     */
    Graphics.prototype.changeCursor = function (cursorType) {
        var canvas = this.getCanvas();
        canvas.defaultCursor = cursorType;
        canvas.renderAll();
    };
    /**
     * Whether it has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */
    Graphics.prototype.hasFilter = function (type) {
        return this.getComponent(components.FILTER).hasFilter(type);
    };
    /**
     * Set selection style of fabric object by init option
     * @param {Object} styles - Selection styles
     */
    Graphics.prototype.setSelectionStyle = function (styles) {
        extend(fObjectOptions.SELECTION_STYLE, styles);
    };
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
    Graphics.prototype.setObjectProperties = function (id, props) {
        var object = this.getObject(id);
        var clone = extend({}, props);
        object.set(clone);
        object.setCoords();
        this.getCanvas().renderAll();
        return clone;
    };
    /**
     * Get object properties corresponding key
     * @param {number} id - object id
     * @param {Array<string>|ObjectProps|string} keys - property's key
     * @returns {Object} properties
     */
    Graphics.prototype.getObjectProperties = function (id, keys) {
        var object = this.getObject(id);
        var props = {};
        if (isString(keys)) {
            props[keys] = object[keys];
        }
        else if (isArray(keys)) {
            forEachArray(keys, function (value) {
                props[value] = object[value];
            });
        }
        else {
            forEachOwnProperties(keys, function (value, key) {
                props[key] = object[key];
            });
        }
        return props;
    };
    /**
     * Get object position by originX, originY
     * @param {number} id - object id
     * @param {string} originX - can be 'left', 'center', 'right'
     * @param {string} originY - can be 'top', 'center', 'bottom'
     * @returns {Object} {{x:number, y: number}} position by origin if id is valid, or null
     */
    Graphics.prototype.getObjectPosition = function (id, originX, originY) {
        var targetObj = this.getObject(id);
        if (!targetObj) {
            return null;
        }
        return targetObj.getPointByOrigin(originX, originY);
    };
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
    Graphics.prototype.setObjectPosition = function (id, posInfo) {
        var targetObj = this.getObject(id);
        var x = posInfo.x, y = posInfo.y, originX = posInfo.originX, originY = posInfo.originY;
        if (!targetObj) {
            return false;
        }
        var targetOrigin = targetObj.getPointByOrigin(originX, originY);
        var centerOrigin = targetObj.getPointByOrigin("center", "center");
        var diffX = centerOrigin.x - targetOrigin.x;
        var diffY = centerOrigin.y - targetOrigin.y;
        targetObj.set({
            left: x + diffX,
            top: y + diffY
        });
        targetObj.setCoords();
        return true;
    };
    /**
     * Get the canvas size
     * @returns {Object} {{width: number, height: number}} image size
     */
    Graphics.prototype.getCanvasSize = function () {
        var image = this.getCanvasImage();
        return {
            width: image ? image.width : 0,
            height: image ? image.height : 0
        };
    };
    /**
     * Get a DrawingMode instance
     * @param {string} modeName - DrawingMode Class Name
     * @returns {DrawingMode} DrawingMode instance
     * @private
     */
    Graphics.prototype._getDrawingModeInstance = function (modeName) {
        return this._drawingModeMap[modeName];
    };
    /**
     * Set canvas element to fabric.Canvas
     * @param {jQuery|Element|string} element - Wrapper or canvas element or selector
     * @private
     */
    Graphics.prototype._setCanvasElement = function (element) {
        var selectedElement;
        var canvasElement;
        if (element.jquery) {
            selectedElement = element[0];
        }
        else if (element.nodeType) {
            selectedElement = element;
        }
        else {
            selectedElement = document.querySelector(element);
        }
        if (selectedElement.nodeName.toUpperCase() !== "CANVAS") {
            canvasElement = document.createElement("canvas");
            selectedElement.appendChild(canvasElement);
        }
        this._canvas = new fabric_require_1.default.Canvas(canvasElement, {
            containerClass: "tui-image-editor-canvas-container",
            enableRetinaScaling: false
        });
    };
    /**
     * Creates DrawingMode instances
     * @private
     */
    Graphics.prototype._createDrawingModeInstances = function () {
        this._register(this._drawingModeMap, new cropper_2.default());
        this._register(this._drawingModeMap, new freeDrawing_2.default());
        this._register(this._drawingModeMap, new lineDrawing_1.default());
        this._register(this._drawingModeMap, new shape_2.default());
        this._register(this._drawingModeMap, new text_2.default());
    };
    /**
     * Create components
     * @private
     */
    Graphics.prototype._createComponents = function () {
        this._register(this._componentMap, new imageLoader_1.default(this));
        this._register(this._componentMap, new cropper_1.default(this));
        this._register(this._componentMap, new flip_1.default(this));
        this._register(this._componentMap, new rotation_1.default(this));
        this._register(this._componentMap, new freeDrawing_1.default(this));
        this._register(this._componentMap, new line_1.default(this));
        this._register(this._componentMap, new text_1.default(this));
        this._register(this._componentMap, new icon_1.default(this));
        this._register(this._componentMap, new filter_1.default(this));
        this._register(this._componentMap, new shape_1.default(this));
    };
    /**
     * Register component
     * @param {Object} map - map object
     * @param {Object} module - module which has getName method
     * @private
     */
    Graphics.prototype._register = function (map, module) {
        map[module.getName()] = module;
    };
    /**
     * Get the current drawing mode is same with given mode
     * @param {string} mode drawing mode
     * @returns {boolean} true if same or false
     */
    Graphics.prototype._isSameDrawingMode = function (mode) {
        return this.getDrawingMode() === mode;
    };
    /**
     * Calculate max dimension of canvas
     * The css-max dimension is dynamically decided with maintaining image ratio
     * The css-max dimension is lower than canvas dimension (attribute of canvas, not css)
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @returns {{width: number, height: number}} - Max width & Max height
     * @private
     */
    Graphics.prototype._calcMaxDimension = function (width, height) {
        var wScaleFactor = this.cssMaxWidth / width;
        var hScaleFactor = this.cssMaxHeight / height;
        var cssMaxWidth = Math.min(width, this.cssMaxWidth);
        var cssMaxHeight = Math.min(height, this.cssMaxHeight);
        if (wScaleFactor < 1 && wScaleFactor < hScaleFactor) {
            cssMaxWidth = width * wScaleFactor;
            cssMaxHeight = height * wScaleFactor;
        }
        else if (hScaleFactor < 1 && hScaleFactor < wScaleFactor) {
            cssMaxWidth = width * hScaleFactor;
            cssMaxHeight = height * hScaleFactor;
        }
        return {
            width: Math.floor(cssMaxWidth),
            height: Math.floor(cssMaxHeight)
        };
    };
    /**
     * Callback function after loading image
     * @param {fabric.Image} obj - Fabric image object
     * @private
     */
    Graphics.prototype._callbackAfterLoadingImageObject = function (obj) {
        var centerPos = this.getCanvasImage().getCenterPoint();
        obj.set(consts.fObjectOptions.SELECTION_STYLE);
        obj.set({
            left: centerPos.x,
            top: centerPos.y,
            crossOrigin: "Anonymous"
        });
        this.getCanvas().add(obj).setActiveObject(obj);
    };
    /**
     * Attach canvas's events
     */
    Graphics.prototype._attachCanvasEvents = function () {
        var canvas = this._canvas;
        var handler = this._handler;
        canvas.on({
            "mouse:down": handler.onMouseDown,
            "object:added": handler.onObjectAdded,
            "object:removed": handler.onObjectRemoved,
            "object:moving": handler.onObjectMoved,
            "object:scaling": handler.onObjectScaled,
            "object:selected": handler.onObjectSelected,
            "path:created": handler.onPathCreated,
            "selection:cleared": handler.onSelectionCleared,
            "selection:created": handler.onSelectionCreated
        });
    };
    /**
     * "mouse:down" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onMouseDown = function (fEvent) {
        var originPointer = this._canvas.getPointer(fEvent.e);
        this.fire(events.MOUSE_DOWN, fEvent.e, originPointer);
    };
    /**
     * "object:added" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onObjectAdded = function (fEvent) {
        var obj = fEvent.target;
        if (obj.isType("cropzone")) {
            return;
        }
        this._addFabricObject(obj);
    };
    /**
     * "object:removed" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onObjectRemoved = function (fEvent) {
        var obj = fEvent.target;
        this._removeFabricObject(stamp(obj));
    };
    /**
     * "object:moving" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onObjectMoved = function (fEvent) {
        var target = fEvent.target;
        var params = this.createObjectProperties(target);
        this.fire(events.OBJECT_MOVED, params);
    };
    /**
     * "object:scaling" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onObjectScaled = function (fEvent) {
        var target = fEvent.target;
        var params = this.createObjectProperties(target);
        this.fire(events.OBJECT_SCALED, params);
    };
    /**
     * "object:selected" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onObjectSelected = function (fEvent) {
        var target = fEvent.target;
        var params = this.createObjectProperties(target);
        this.fire(events.OBJECT_ACTIVATED, params);
    };
    /**
     * "path:created" canvas event handler
     * @param {{path: fabric.Path}} obj - Path object
     * @private
     */
    Graphics.prototype._onPathCreated = function (obj) {
        obj.path.set(consts.fObjectOptions.SELECTION_STYLE);
        var params = this.createObjectProperties(obj.path);
        this.fire(events.ADD_OBJECT, params);
    };
    /**
     * "selction:cleared" canvas event handler
     * @private
     */
    Graphics.prototype._onSelectionCleared = function () {
        this.fire(events.SELECTION_CLEARED);
    };
    /**
     * "selction:created" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Graphics.prototype._onSelectionCreated = function (fEvent) {
        this.fire(events.SELECTION_CREATED, fEvent.target);
    };
    /**
     * Canvas discard selection all
     */
    Graphics.prototype.discardSelection = function () {
        this._canvas.discardActiveGroup();
        this._canvas.discardActiveObject();
        this._canvas.renderAll();
    };
    /**
     * Canvas Selectable status change
     * @param {boolean} selectable - expect status
     */
    Graphics.prototype.changeSelectableAll = function (selectable) {
        this._canvas.forEachObject(function (obj) {
            obj.selectable = selectable;
            obj.hoverCursor = selectable ? "move" : "crosshair";
        });
    };
    /**
     * Return object's properties
     * @param {fabric.Object} obj - fabric object
     * @returns {Object} properties object
     */
    Graphics.prototype.createObjectProperties = function (obj) {
        var predefinedKeys = [
            "left",
            "top",
            "width",
            "height",
            "fill",
            "stroke",
            "strokeWidth",
            "opacity"
        ];
        var props = {
            id: stamp(obj),
            type: obj.type
        };
        extend(props, util.getProperties(obj, predefinedKeys));
        if (["i-text", "text"].indexOf(obj.type) > -1) {
            extend(props, this._createTextProperties(obj, props));
        }
        return props;
    };
    /**
     * Get text object's properties
     * @param {fabric.Object} obj - fabric text object
     * @param {Object} props - properties
     * @returns {Object} properties object
     */
    Graphics.prototype._createTextProperties = function (obj) {
        var predefinedKeys = [
            "text",
            "fontFamily",
            "fontSize",
            "fontStyle",
            "textAlign",
            "textDecoration"
        ];
        var props = {};
        extend(props, util.getProperties(obj, predefinedKeys));
        return props;
    };
    /**
     * Add object array by id
     * @param {fabric.Object} obj - fabric object
     * @returns {number} object id
     */
    Graphics.prototype._addFabricObject = function (obj) {
        var id = stamp(obj);
        this._objects[id] = obj;
        return id;
    };
    /**
     * Remove an object in array yb id
     * @param {number} id - object id
     */
    Graphics.prototype._removeFabricObject = function (id) {
        delete this._objects[id];
    };
    return Graphics;
}());
CustomEvents.mixin(Graphics);
exports.default = Graphics;
//# sourceMappingURL=graphics.js.map