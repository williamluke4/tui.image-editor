"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Shape component
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var shapeResizeHelper_1 = require("../helper/shapeResizeHelper");
var tui_code_snippet_1 = require("tui-code-snippet");
var rejectMessages = consts.rejectMessages, eventNames = consts.eventNames;
var KEY_CODES = consts.keyCodes;
var DEFAULT_TYPE = 'rect';
var DEFAULT_OPTIONS = {
    strokeWidth: 1,
    stroke: '#000000',
    fill: '#ffffff',
    width: 1,
    height: 1,
    rx: 0,
    ry: 0,
    lockSkewingX: true,
    lockSkewingY: true,
    lockUniScaling: false,
    bringForward: true,
    isRegular: false
};
var shapeType = ['rect', 'circle', 'triangle'];
/**
 * Shape
 * @class Shape
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(graphics) {
        var _this = _super.call(this, consts.componentNames.SHAPE, graphics) || this;
        /**
         * Object of The drawing shape
         * @type {fabric.Object}
         * @private
         */
        _this._shapeObj = null;
        /**
         * Type of the drawing shape
         * @type {string}
         * @private
         */
        _this._type = DEFAULT_TYPE;
        /**
         * Options to draw the shape
         * @type {Object}
         * @private
         */
        _this._options = tui_code_snippet_1.extend({}, DEFAULT_OPTIONS);
        /**
         * Whether the shape object is selected or not
         * @type {boolean}
         * @private
         */
        _this._isSelected = false;
        /**
         * Pointer for drawing shape (x, y)
         * @type {Object}
         * @private
         */
        _this._startPoint = {};
        /**
         * Using shortcut on drawing shape
         * @type {boolean}
         * @private
         */
        _this._withShiftKey = false;
        /**
         * Event handler list
         * @type {Object}
         * @private
         */
        _this._handlers = {
            mousedown: _this._onFabricMouseDown.bind(_this),
            mousemove: _this._onFabricMouseMove.bind(_this),
            mouseup: _this._onFabricMouseUp.bind(_this),
            keydown: _this._onKeyDown.bind(_this),
            keyup: _this._onKeyUp.bind(_this)
        };
        return _this;
    }
    /**
     * Start to draw the shape on canvas
     * @ignore
     */
    Shape.prototype.start = function () {
        var canvas = this.getCanvas();
        this._isSelected = false;
        canvas.defaultCursor = 'crosshair';
        canvas.selection = false;
        canvas.uniScaleTransform = true;
        canvas.on({
            'mouse:down': this._handlers.mousedown
        });
        fabric_require_1.default.util.addListener(document, 'keydown', this._handlers.keydown);
        fabric_require_1.default.util.addListener(document, 'keyup', this._handlers.keyup);
    };
    /**
     * End to draw the shape on canvas
     * @ignore
     */
    Shape.prototype.end = function () {
        var canvas = this.getCanvas();
        this._isSelected = false;
        canvas.defaultCursor = 'default';
        canvas.selection = true;
        canvas.uniScaleTransform = false;
        canvas.off({
            'mouse:down': this._handlers.mousedown
        });
        fabric_require_1.default.util.removeListener(document, 'keydown', this._handlers.keydown);
        fabric_require_1.default.util.removeListener(document, 'keyup', this._handlers.keyup);
    };
    /**
     * Set states of the current drawing shape
     * @ignore
     * @param {string} type - Shape type (ex: 'rect', 'circle')
     * @param {Object} [options] - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stoke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     */
    Shape.prototype.setStates = function (type, options) {
        this._type = type;
        if (options) {
            this._options = tui_code_snippet_1.extend(this._options, options);
        }
    };
    /**
     * Add the shape
     * @ignore
     * @param {string} type - Shape type (ex: 'rect', 'circle')
     * @param {Object} options - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether scaling shape has 1:1 ratio or not
     * @returns {Promise}
     */
    Shape.prototype.add = function (type, options) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            var canvas = _this.getCanvas();
            options = _this._createOptions(options);
            var shapeObj = _this._createInstance(type, options);
            _this._bindEventOnShape(shapeObj);
            canvas.add(shapeObj).setActiveObject(shapeObj);
            resolve(_this.graphics.createObjectProperties(shapeObj));
        });
    };
    /**
     * Change the shape
     * @ignore
     * @param {fabric.Object} shapeObj - Selected shape object on canvas
     * @param {Object} options - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether scaling shape has 1:1 ratio or not
     * @returns {Promise}
     */
    Shape.prototype.change = function (shapeObj, options) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            if (tui_code_snippet_1.inArray(shapeObj.get('type'), shapeType) < 0) {
                reject(rejectMessages.unsupportedType);
            }
            shapeObj.set(options);
            _this.getCanvas().renderAll();
            resolve();
        });
    };
    /**
     * Create the instance of shape
     * @param {string} type - Shape type
     * @param {Object} options - Options to creat the shape
     * @returns {fabric.Object} Shape instance
     * @private
     */
    Shape.prototype._createInstance = function (type, options) {
        var instance;
        switch (type) {
            case 'rect':
                instance = new fabric_require_1.default.Rect(options);
                break;
            case 'circle':
                instance = new fabric_require_1.default.Ellipse(tui_code_snippet_1.extend({
                    type: 'circle'
                }, options));
                break;
            case 'triangle':
                instance = new fabric_require_1.default.Triangle(options);
                break;
            default:
                instance = {};
        }
        return instance;
    };
    /**
     * Get the options to create the shape
     * @param {Object} options - Options to creat the shape
     * @returns {Object} Shape options
     * @private
     */
    Shape.prototype._createOptions = function (options) {
        var selectionStyles = consts.fObjectOptions.SELECTION_STYLE;
        options = tui_code_snippet_1.extend({}, DEFAULT_OPTIONS, this._options, selectionStyles, options);
        if (options.isRegular) {
            options.lockUniScaling = true;
        }
        return options;
    };
    /**
     * Bind fabric events on the creating shape object
     * @param {fabric.Object} shapeObj - Shape object
     * @private
     */
    Shape.prototype._bindEventOnShape = function (shapeObj) {
        var self = this;
        var canvas = this.getCanvas();
        shapeObj.on({
            added: function () {
                self._shapeObj = this;
                shapeResizeHelper_1.default.setOrigins(self._shapeObj);
            },
            selected: function () {
                self._isSelected = true;
                self._shapeObj = this;
                canvas.uniScaleTransform = true;
                canvas.defaultCursor = 'default';
                shapeResizeHelper_1.default.setOrigins(self._shapeObj);
            },
            deselected: function () {
                self._isSelected = false;
                self._shapeObj = null;
                canvas.defaultCursor = 'crosshair';
                canvas.uniScaleTransform = false;
            },
            modified: function () {
                var currentObj = self._shapeObj;
                shapeResizeHelper_1.default.adjustOriginToCenter(currentObj);
                shapeResizeHelper_1.default.setOrigins(currentObj);
            },
            scaling: function (fEvent) {
                var pointer = canvas.getPointer(fEvent.e);
                var currentObj = self._shapeObj;
                canvas.setCursor('crosshair');
                shapeResizeHelper_1.default.resize(currentObj, pointer, true);
            }
        });
    };
    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    Shape.prototype._onFabricMouseDown = function (fEvent) {
        if (!fEvent.target) {
            this._isSelected = false;
            this._shapeObj = false;
        }
        if (!this._isSelected && !this._shapeObj) {
            var canvas = this.getCanvas();
            this._startPoint = canvas.getPointer(fEvent.e);
            canvas.on({
                'mouse:move': this._handlers.mousemove,
                'mouse:up': this._handlers.mouseup
            });
        }
    };
    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    Shape.prototype._onFabricMouseMove = function (fEvent) {
        var _this = this;
        var canvas = this.getCanvas();
        var pointer = canvas.getPointer(fEvent.e);
        var startPointX = this._startPoint.x;
        var startPointY = this._startPoint.y;
        var width = startPointX - pointer.x;
        var height = startPointY - pointer.y;
        var shape = this._shapeObj;
        if (!shape) {
            this.add(this._type, {
                left: startPointX,
                top: startPointY,
                width: width,
                height: height
            }).then(function (objectProps) {
                _this.fire(eventNames.ADD_OBJECT, objectProps);
            });
        }
        else {
            this._shapeObj.set({
                isRegular: this._withShiftKey
            });
            shapeResizeHelper_1.default.resize(shape, pointer);
            canvas.renderAll();
        }
    };
    /**
     * MouseUp event handler on canvas
     * @private
     */
    Shape.prototype._onFabricMouseUp = function () {
        var canvas = this.getCanvas();
        var shape = this._shapeObj;
        if (shape) {
            shapeResizeHelper_1.default.adjustOriginToCenter(shape);
        }
        this.fire(eventNames.ADD_OBJECT_AFTER, this.graphics.createObjectProperties(shape));
        canvas.off({
            'mouse:move': this._handlers.mousemove,
            'mouse:up': this._handlers.mouseup
        });
    };
    /**
     * Keydown event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    Shape.prototype._onKeyDown = function (e) {
        if (e.keyCode === KEY_CODES.SHIFT) {
            this._withShiftKey = true;
            if (this._shapeObj) {
                this._shapeObj.isRegular = true;
            }
        }
    };
    /**
     * Keyup event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    Shape.prototype._onKeyUp = function (e) {
        if (e.keyCode === KEY_CODES.SHIFT) {
            this._withShiftKey = false;
            if (this._shapeObj) {
                this._shapeObj.isRegular = false;
            }
        }
    };
    return Shape;
}(component_1.default));
exports.default = Shape;
//# sourceMappingURL=shape.js.map