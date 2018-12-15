"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Cropzone extending fabric.Rect
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var fabric_require_1 = require("fabric/dist/fabric.require");
var util_1 = require("../util");
var CORNER_TYPE_TOP_LEFT = 'tl';
var CORNER_TYPE_TOP_RIGHT = 'tr';
var CORNER_TYPE_MIDDLE_TOP = 'mt';
var CORNER_TYPE_MIDDLE_LEFT = 'ml';
var CORNER_TYPE_MIDDLE_RIGHT = 'mr';
var CORNER_TYPE_MIDDLE_BOTTOM = 'mb';
var CORNER_TYPE_BOTTOM_LEFT = 'bl';
var CORNER_TYPE_BOTTOM_RIGHT = 'br';
/**
 * Cropzone object
 * Issue: IE7, 8(with excanvas)
 *  - Cropzone is a black zone without transparency.
 * @class Cropzone
 * @extends {fabric.Rect}
 * @ignore
 */
var Cropzone = fabric_require_1.default.util.createClass(fabric_require_1.default.Rect, /** @lends Cropzone.prototype */ {
    /**
     * Constructor
     * @param {Object} options Options object
     * @override
     */
    initialize: function (options, extendsOptions) {
        options = tui_code_snippet_1.default.extend(options, extendsOptions);
        options.type = 'cropzone';
        this.callSuper('initialize', options);
        this.options = options;
        this.on({
            'moving': this._onMoving,
            'scaling': this._onScaling
        });
    },
    /**
     * Render Crop-zone
     * @param {CanvasRenderingContext2D} ctx - Context
     * @private
     * @override
     */
    _render: function (ctx) {
        var cropzoneDashLineWidth = 7;
        var cropzoneDashLineOffset = 7;
        this.callSuper('_render', ctx);
        // Calc original scale
        var originalFlipX = this.flipX ? -1 : 1;
        var originalFlipY = this.flipY ? -1 : 1;
        var originalScaleX = originalFlipX / this.scaleX;
        var originalScaleY = originalFlipY / this.scaleY;
        // Set original scale
        ctx.scale(originalScaleX, originalScaleY);
        // Render outer rect
        this._fillOuterRect(ctx, 'rgba(0, 0, 0, 0.55)');
        if (this.options.lineWidth) {
            this._fillInnerRect(ctx);
            this._strokeBorder(ctx, 'rgb(255, 255, 255)', {
                lineWidth: this.options.lineWidth
            });
        }
        else {
            // Black dash line
            this._strokeBorder(ctx, 'rgb(0, 0, 0)', {
                lineDashWidth: cropzoneDashLineWidth
            });
            // White dash line
            this._strokeBorder(ctx, 'rgb(255, 255, 255)', {
                lineDashWidth: cropzoneDashLineWidth,
                lineDashOffset: cropzoneDashLineOffset
            });
        }
        // Reset scale
        ctx.scale(1 / originalScaleX, 1 / originalScaleY);
    },
    /**
     * Cropzone-coordinates with outer rectangle
     *
     *     x0     x1         x2      x3
     *  y0 +--------------------------+
     *     |///////|//////////|///////|    // <--- "Outer-rectangle"
     *     |///////|//////////|///////|
     *  y1 +-------+----------+-------+
     *     |///////| Cropzone |///////|    Cropzone is the "Inner-rectangle"
     *     |///////|  (0, 0)  |///////|    Center point (0, 0)
     *  y2 +-------+----------+-------+
     *     |///////|//////////|///////|
     *     |///////|//////////|///////|
     *  y3 +--------------------------+
     *
     * @typedef {{x: Array<number>, y: Array<number>}} cropzoneCoordinates
     * @ignore
     */
    /**
     * Fill outer rectangle
     * @param {CanvasRenderingContext2D} ctx - Context
     * @param {string|CanvasGradient|CanvasPattern} fillStyle - Fill-style
     * @private
     */
    _fillOuterRect: function (ctx, fillStyle) {
        var _a = this._getCoordinates(ctx), x = _a.x, y = _a.y;
        ctx.save();
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        // Outer rectangle
        // Numbers are +/-1 so that overlay edges don't get blurry.
        ctx.moveTo(x[0] - 1, y[0] - 1);
        ctx.lineTo(x[3] + 1, y[0] - 1);
        ctx.lineTo(x[3] + 1, y[3] + 1);
        ctx.lineTo(x[0] - 1, y[3] + 1);
        ctx.lineTo(x[0] - 1, y[0] - 1);
        ctx.closePath();
        // Inner rectangle
        ctx.moveTo(x[1], y[1]);
        ctx.lineTo(x[1], y[2]);
        ctx.lineTo(x[2], y[2]);
        ctx.lineTo(x[2], y[1]);
        ctx.lineTo(x[1], y[1]);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },
    /**
     * Draw Inner grid line
     * @param {CanvasRenderingContext2D} ctx - Context
     * @private
     */
    _fillInnerRect: function (ctx) {
        var _a = this._getCoordinates(ctx), outerX = _a.x, outerY = _a.y;
        var x = this._caculateInnerPosition(outerX, (outerX[2] - outerX[1]) / 3);
        var y = this._caculateInnerPosition(outerY, (outerY[2] - outerY[1]) / 3);
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = this.options.lineWidth;
        ctx.beginPath();
        ctx.moveTo(x[0], y[1]);
        ctx.lineTo(x[3], y[1]);
        ctx.moveTo(x[0], y[2]);
        ctx.lineTo(x[3], y[2]);
        ctx.moveTo(x[1], y[0]);
        ctx.lineTo(x[1], y[3]);
        ctx.moveTo(x[2], y[0]);
        ctx.lineTo(x[2], y[3]);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    },
    /**
     * Calculate Inner Position
     * @param {Array} outer - outer position
     * @param {number} size - interval for calcaulate
     * @returns {Array} - inner position
     * @private
     */
    _caculateInnerPosition: function (outer, size) {
        var position = [];
        position[0] = outer[1];
        position[1] = outer[1] + size;
        position[2] = outer[1] + (size * 2);
        position[3] = outer[2];
        return position;
    },
    /**
     * Get coordinates
     * @param {CanvasRenderingContext2D} ctx - Context
     * @returns {cropzoneCoordinates} - {@link cropzoneCoordinates}
     * @private
     */
    _getCoordinates: function (ctx) {
        var width = this.getWidth(), height = this.getHeight(), halfWidth = width / 2, halfHeight = height / 2, left = this.getLeft(), top = this.getTop(), canvasEl = ctx.canvas; // canvas element, not fabric object
        return {
            x: tui_code_snippet_1.default.map([
                -(halfWidth + left),
                -(halfWidth),
                halfWidth,
                halfWidth + (canvasEl.width - left - width) // x3
            ], Math.ceil),
            y: tui_code_snippet_1.default.map([
                -(halfHeight + top),
                -(halfHeight),
                halfHeight,
                halfHeight + (canvasEl.height - top - height) // y3
            ], Math.ceil)
        };
    },
    /**
     * Stroke border
     * @param {CanvasRenderingContext2D} ctx - Context
     * @param {string|CanvasGradient|CanvasPattern} strokeStyle - Stroke-style
     * @param {number} lineDashWidth - Dash width
     * @param {number} [lineDashOffset] - Dash offset
     * @private
     */
    _strokeBorder: function (ctx, strokeStyle, _a) {
        var lineDashWidth = _a.lineDashWidth, lineDashOffset = _a.lineDashOffset, lineWidth = _a.lineWidth;
        var halfWidth = this.getWidth() / 2, halfHeight = this.getHeight() / 2;
        ctx.save();
        ctx.strokeStyle = strokeStyle;
        if (ctx.setLineDash) {
            ctx.setLineDash([lineDashWidth, lineDashWidth]);
        }
        if (lineDashOffset) {
            ctx.lineDashOffset = lineDashOffset;
        }
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
        }
        ctx.beginPath();
        ctx.moveTo(-halfWidth, -halfHeight);
        ctx.lineTo(halfWidth, -halfHeight);
        ctx.lineTo(halfWidth, halfHeight);
        ctx.lineTo(-halfWidth, halfHeight);
        ctx.lineTo(-halfWidth, -halfHeight);
        ctx.stroke();
        ctx.restore();
    },
    /**
     * onMoving event listener
     * @private
     */
    _onMoving: function () {
        var left = this.getLeft(), top = this.getTop(), width = this.getWidth(), height = this.getHeight(), maxLeft = this.canvas.getWidth() - width, maxTop = this.canvas.getHeight() - height;
        this.setLeft(util_1.clamp(left, 0, maxLeft));
        this.setTop(util_1.clamp(top, 0, maxTop));
    },
    /**
     * onScaling event listener
     * @param {{e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onScaling: function (fEvent) {
        var pointer = this.canvas.getPointer(fEvent.e), settings = this._calcScalingSizeFromPointer(pointer);
        // On scaling cropzone,
        // change real width and height and fix scaleFactor to 1
        this.scale(1).set(settings);
    },
    /**
     * Calc scaled size from mouse pointer with selected corner
     * @param {{x: number, y: number}} pointer - Mouse position
     * @returns {Object} Having left or(and) top or(and) width or(and) height.
     * @private
     */
    _calcScalingSizeFromPointer: function (pointer) {
        var pointerX = pointer.x, pointerY = pointer.y, tlScalingSize = this._calcTopLeftScalingSizeFromPointer(pointerX, pointerY), brScalingSize = this._calcBottomRightScalingSizeFromPointer(pointerX, pointerY);
        /*
         * @todo: 일반 객체에서 shift 조합키를 누르면 free size scaling이 됨 --> 확인해볼것
         *      canvas.class.js // _scaleObject: function(...){...}
         */
        return this._makeScalingSettings(tlScalingSize, brScalingSize);
    },
    /**
     * Calc scaling size(position + dimension) from left-top corner
     * @param {number} x - Mouse position X
     * @param {number} y - Mouse position Y
     * @returns {{top: number, left: number, width: number, height: number}}
     * @private
     */
    _calcTopLeftScalingSizeFromPointer: function (x, y) {
        var bottom = this.getHeight() + this.top, right = this.getWidth() + this.left, top = util_1.clamp(y, 0, bottom - 1), // 0 <= top <= (bottom - 1)
        left = util_1.clamp(x, 0, right - 1); // 0 <= left <= (right - 1)
        // When scaling "Top-Left corner": It fixes right and bottom coordinates
        return {
            top: top,
            left: left,
            width: right - left,
            height: bottom - top
        };
    },
    /**
     * Calc scaling size from right-bottom corner
     * @param {number} x - Mouse position X
     * @param {number} y - Mouse position Y
     * @returns {{width: number, height: number}}
     * @private
     */
    _calcBottomRightScalingSizeFromPointer: function (x, y) {
        var _a = this.canvas, maxX = _a.width, maxY = _a.height;
        var _b = this, left = _b.left, top = _b.top;
        // When scaling "Bottom-Right corner": It fixes left and top coordinates
        return {
            width: util_1.clamp(x, (left + 1), maxX) - left,
            height: util_1.clamp(y, (top + 1), maxY) - top // (height = y - top), (top + 1 <= y <= maxY)
        };
    },
    /* eslint-disable complexity */
    /**
     * Make scaling settings
     * @param {{width: number, height: number, left: number, top: number}} tl - Top-Left setting
     * @param {{width: number, height: number}} br - Bottom-Right setting
     * @returns {{width: ?number, height: ?number, left: ?number, top: ?number}} Position setting
     * @private
     */
    _makeScalingSettings: function (tl, br) {
        var tlWidth = tl.width;
        var tlHeight = tl.height;
        var brHeight = br.height;
        var brWidth = br.width;
        var tlLeft = tl.left;
        var tlTop = tl.top;
        var settings;
        switch (this.__corner) {
            case CORNER_TYPE_TOP_LEFT:
                settings = tl;
                break;
            case CORNER_TYPE_TOP_RIGHT:
                settings = {
                    width: brWidth,
                    height: tlHeight,
                    top: tlTop
                };
                break;
            case CORNER_TYPE_BOTTOM_LEFT:
                settings = {
                    width: tlWidth,
                    height: brHeight,
                    left: tlLeft
                };
                break;
            case CORNER_TYPE_BOTTOM_RIGHT:
                settings = br;
                break;
            case CORNER_TYPE_MIDDLE_LEFT:
                settings = {
                    width: tlWidth,
                    left: tlLeft
                };
                break;
            case CORNER_TYPE_MIDDLE_TOP:
                settings = {
                    height: tlHeight,
                    top: tlTop
                };
                break;
            case CORNER_TYPE_MIDDLE_RIGHT:
                settings = {
                    width: brWidth
                };
                break;
            case CORNER_TYPE_MIDDLE_BOTTOM:
                settings = {
                    height: brHeight
                };
                break;
            default:
                break;
        }
        return settings;
    },
    /**
     * Return the whether this cropzone is valid
     * @returns {boolean}
     */
    isValid: function () {
        return (this.left >= 0 &&
            this.top >= 0 &&
            this.width > 0 &&
            this.height > 0);
    }
});
exports.default = Cropzone;
//# sourceMappingURL=cropzone.js.map