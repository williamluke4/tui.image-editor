"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Mask extending fabric.Image.filters.Mask
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
/**
 * Mask object
 * @class Mask
 * @extends {fabric.Image.filters.Mask}
 * @ignore
 */
var Mask = fabric_require_1.default.util.createClass(fabric_require_1.default.Image.filters.Mask, /** @lends Mask.prototype */ {
    /**
     * Apply filter to canvas element
     * @param {Object} canvasEl - Canvas element to apply filter
     * @override
     */
    applyTo: function (canvasEl) {
        if (!this.mask) {
            return;
        }
        var width = canvasEl.width, height = canvasEl.height;
        var maskCanvasEl = this._createCanvasOfMask(width, height);
        var ctx = canvasEl.getContext('2d');
        var maskCtx = maskCanvasEl.getContext('2d');
        var imageData = ctx.getImageData(0, 0, width, height);
        this._drawMask(maskCtx, canvasEl, ctx);
        this._mapData(maskCtx, imageData, width, height);
        ctx.putImageData(imageData, 0, 0);
    },
    /**
     * Create canvas of mask image
     * @param {number} width - Width of main canvas
     * @param {number} height - Height of main canvas
     * @returns {HTMLElement} Canvas element
     * @private
     */
    _createCanvasOfMask: function (width, height) {
        var maskCanvasEl = fabric_require_1.default.util.createCanvasElement();
        maskCanvasEl.width = width;
        maskCanvasEl.height = height;
        return maskCanvasEl;
    },
    /**
     * Draw mask image on canvas element
     * @param {Object} maskCtx - Context of mask canvas
     * @private
     */
    _drawMask: function (maskCtx) {
        var mask = this.mask;
        var maskImg = mask.getElement();
        var left = mask.getLeft();
        var top = mask.getTop();
        var angle = mask.getAngle();
        maskCtx.save();
        maskCtx.translate(left, top);
        maskCtx.rotate(angle * Math.PI / 180);
        maskCtx.scale(mask.scaleX, mask.scaleY);
        maskCtx.drawImage(maskImg, -maskImg.width / 2, -maskImg.height / 2);
        maskCtx.restore();
    },
    /**
     * Map mask image data to source image data
     * @param {Object} maskCtx - Context of mask canvas
     * @param {Object} imageData - Data of source image
     * @param {number} width - Width of main canvas
     * @param {number} height - Height of main canvas
     * @private
     */
    _mapData: function (maskCtx, imageData, width, height) {
        var sourceData = imageData.data;
        var maskData = maskCtx.getImageData(0, 0, width, height).data;
        var channel = this.channel;
        var len = imageData.width * imageData.height * 4;
        for (var i = 0; i < len; i += 4) {
            sourceData[i + 3] = maskData[i + channel]; // adjust value of alpha data
        }
    }
});
exports.default = Mask;
//# sourceMappingURL=mask.js.map