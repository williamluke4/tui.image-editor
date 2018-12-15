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
 * @fileoverview Image crop module (start cropping, end cropping)
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var fabric_require_1 = require("fabric/dist/fabric.require");
var component_1 = require("../interface/component");
var cropzone_1 = require("../extension/cropzone");
var consts_1 = require("../consts");
var util_1 = require("../util");
var MOUSE_MOVE_THRESHOLD = 10;
var DEFAULT_OPTION = {
    top: -10,
    left: -10,
    height: 1,
    width: 1
};
/**
 * Cropper components
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @class Cropper
 * @ignore
 */
var Cropper = /** @class */ (function (_super) {
    __extends(Cropper, _super);
    function Cropper(graphics) {
        var _this = _super.call(this, consts_1.componentNames.CROPPER, graphics) || this;
        /**
         * Cropzone
         * @type {Cropzone}
         * @private
         */
        _this._cropzone = null;
        /**
         * StartX of Cropzone
         * @type {number}
         * @private
         */
        _this._startX = null;
        /**
         * StartY of Cropzone
         * @type {number}
         * @private
         */
        _this._startY = null;
        /**
         * State whether shortcut key is pressed or not
         * @type {boolean}
         * @private
         */
        _this._withShiftKey = false;
        /**
         * Listeners
         * @type {object.<string, function>}
         * @private
         */
        _this._listeners = {
            keydown: _this._onKeyDown.bind(_this),
            keyup: _this._onKeyUp.bind(_this),
            mousedown: _this._onFabricMouseDown.bind(_this),
            mousemove: _this._onFabricMouseMove.bind(_this),
            mouseup: _this._onFabricMouseUp.bind(_this)
        };
        return _this;
    }
    /**
     * Start cropping
     */
    Cropper.prototype.start = function () {
        if (this._cropzone) {
            return;
        }
        var canvas = this.getCanvas();
        canvas.forEachObject(function (obj) {
            obj.evented = false;
        });
        this._cropzone = new cropzone_1.default({
            left: -10,
            top: -10,
            width: 1,
            height: 1,
            strokeWidth: 0,
            cornerSize: 10,
            cornerColor: 'black',
            fill: 'transparent',
            hasRotatingPoint: false,
            hasBorders: false,
            lockScalingFlip: true,
            lockRotation: true
        }, this.graphics.cropSelectionStyle);
        canvas.deactivateAll();
        canvas.add(this._cropzone);
        canvas.on('mouse:down', this._listeners.mousedown);
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        fabric_require_1.default.util.addListener(document, 'keydown', this._listeners.keydown);
        fabric_require_1.default.util.addListener(document, 'keyup', this._listeners.keyup);
    };
    /**
     * End cropping
     */
    Cropper.prototype.end = function () {
        var canvas = this.getCanvas();
        var cropzone = this._cropzone;
        if (!cropzone) {
            return;
        }
        cropzone.remove();
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        canvas.off('mouse:down', this._listeners.mousedown);
        canvas.forEachObject(function (obj) {
            obj.evented = true;
        });
        this._cropzone = null;
        fabric_require_1.default.util.removeListener(document, 'keydown', this._listeners.keydown);
        fabric_require_1.default.util.removeListener(document, 'keyup', this._listeners.keyup);
    };
    /**
     * onMousedown handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Cropper.prototype._onFabricMouseDown = function (fEvent) {
        var canvas = this.getCanvas();
        if (fEvent.target) {
            return;
        }
        canvas.selection = false;
        var coord = canvas.getPointer(fEvent.e);
        this._startX = coord.x;
        this._startY = coord.y;
        canvas.on({
            'mouse:move': this._listeners.mousemove,
            'mouse:up': this._listeners.mouseup
        });
    };
    /**
     * onMousemove handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Cropper.prototype._onFabricMouseMove = function (fEvent) {
        var canvas = this.getCanvas();
        var pointer = canvas.getPointer(fEvent.e);
        var x = pointer.x, y = pointer.y;
        var cropzone = this._cropzone;
        if (Math.abs(x - this._startX) + Math.abs(y - this._startY) > MOUSE_MOVE_THRESHOLD) {
            cropzone.remove();
            cropzone.set(this._calcRectDimensionFromPoint(x, y));
            canvas.add(cropzone);
        }
    };
    /**
     * Get rect dimension setting from Canvas-Mouse-Position(x, y)
     * @param {number} x - Canvas-Mouse-Position x
     * @param {number} y - Canvas-Mouse-Position Y
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */
    Cropper.prototype._calcRectDimensionFromPoint = function (x, y) {
        var canvas = this.getCanvas();
        var canvasWidth = canvas.getWidth();
        var canvasHeight = canvas.getHeight();
        var startX = this._startX;
        var startY = this._startY;
        var left = util_1.clamp(x, 0, startX);
        var top = util_1.clamp(y, 0, startY);
        var width = util_1.clamp(x, startX, canvasWidth) - left; // (startX <= x(mouse) <= canvasWidth) - left
        var height = util_1.clamp(y, startY, canvasHeight) - top; // (startY <= y(mouse) <= canvasHeight) - top
        if (this._withShiftKey) { // make fixed ratio cropzone
            if (width > height) {
                height = width;
            }
            else if (height > width) {
                width = height;
            }
            if (startX >= x) {
                left = startX - width;
            }
            if (startY >= y) {
                top = startY - height;
            }
        }
        return {
            left: left,
            top: top,
            width: width,
            height: height
        };
    };
    /**
     * onMouseup handler in fabric canvas
     * @private
     */
    Cropper.prototype._onFabricMouseUp = function () {
        var cropzone = this._cropzone;
        var listeners = this._listeners;
        var canvas = this.getCanvas();
        canvas.setActiveObject(cropzone);
        canvas.off({
            'mouse:move': listeners.mousemove,
            'mouse:up': listeners.mouseup
        });
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
    Cropper.prototype.getCroppedImageData = function (cropRect) {
        var canvas = this.getCanvas();
        var containsCropzone = canvas.contains(this._cropzone);
        if (!cropRect) {
            return null;
        }
        if (containsCropzone) {
            this._cropzone.remove();
        }
        var imageData = {
            imageName: this.getImageName(),
            url: canvas.toDataURL(cropRect)
        };
        if (containsCropzone) {
            canvas.add(this._cropzone);
        }
        return imageData;
    };
    /**
     * Get cropped rect
     * @returns {Object} rect
     */
    Cropper.prototype.getCropzoneRect = function () {
        var cropzone = this._cropzone;
        if (!cropzone.isValid()) {
            return null;
        }
        return {
            left: cropzone.getLeft(),
            top: cropzone.getTop(),
            width: cropzone.getWidth(),
            height: cropzone.getHeight()
        };
    };
    /**
     * Set a cropzone square
     * @param {number} [presetRatio] - preset ratio
     */
    Cropper.prototype.setCropzoneRect = function (presetRatio) {
        var canvas = this.getCanvas();
        var cropzone = this._cropzone;
        canvas.deactivateAll();
        canvas.selection = false;
        cropzone.remove();
        cropzone.set(presetRatio ? this._getPresetCropSizePosition(presetRatio) : DEFAULT_OPTION);
        canvas.add(cropzone);
        canvas.selection = true;
        if (presetRatio) {
            canvas.setActiveObject(cropzone);
        }
    };
    /**
     * Set a cropzone square
     * @param {number} presetRatio - preset ratio
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */
    Cropper.prototype._getPresetCropSizePosition = function (presetRatio) {
        var canvas = this.getCanvas();
        var originalWidth = canvas.getWidth();
        var originalHeight = canvas.getHeight();
        var standardSize = (originalWidth >= originalHeight) ? originalWidth : originalHeight;
        var getScale = function (value, orignalValue) { return (value > orignalValue) ? orignalValue / value : 1; };
        var width = standardSize * presetRatio;
        var height = standardSize;
        var scaleWidth = getScale(width, originalWidth);
        _a = tui_code_snippet_1.default.map([width, height], function (sizeValue) { return sizeValue * scaleWidth; }), width = _a[0], height = _a[1];
        var scaleHeight = getScale(height, originalHeight);
        _b = tui_code_snippet_1.default.map([width, height], function (sizeValue) { return sizeValue * scaleHeight; }), width = _b[0], height = _b[1];
        return {
            top: (originalHeight - height) / 2,
            left: (originalWidth - width) / 2,
            width: width,
            height: height
        };
        var _a, _b;
    };
    /**
     * Keydown event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    Cropper.prototype._onKeyDown = function (e) {
        if (e.keyCode === consts_1.keyCodes.SHIFT) {
            this._withShiftKey = true;
        }
    };
    /**
     * Keyup event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    Cropper.prototype._onKeyUp = function (e) {
        if (e.keyCode === consts_1.keyCodes.SHIFT) {
            this._withShiftKey = false;
        }
    };
    return Cropper;
}(component_1.default));
exports.default = Cropper;
//# sourceMappingURL=cropper.js.map