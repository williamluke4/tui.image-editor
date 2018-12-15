"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview ColorFilter extending fabric.Image.filters.BaseFilter
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
/**
 * ColorFilter object
 * @class ColorFilter
 * @extends {fabric.Image.filters.BaseFilter}
 * @ignore
 */
var ColorFilter = fabric_require_1.default.util.createClass(fabric_require_1.default.Image.filters.BaseFilter, /** @lends BaseFilter.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'ColorFilter',
    /**
     * Constructor
     * @member fabric.Image.filters.ColorFilter.prototype
     * @param {Object} [options] Options object
     * @param {Number} [options.color='#FFFFFF'] Value of color (0...255)
     * @param {Number} [options.threshold=45] Value of threshold (0...255)
     * @override
     */
    initialize: function (options) {
        if (!options) {
            options = {};
        }
        this.color = options.color || '#FFFFFF';
        this.threshold = options.threshold || 45;
        this.x = options.x || null;
        this.y = options.y || null;
    },
    /**
     * Applies filter to canvas element
     * @param {Object} canvasEl Canvas element to apply filter to
     */
    applyTo: function (canvasEl) {
        var context = canvasEl.getContext('2d');
        var imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height);
        var data = imageData.data;
        var threshold = this.threshold;
        var filterColor = fabric_require_1.default.Color.sourceFromHex(this.color);
        var i, len;
        if (this.x && this.y) {
            filterColor = this._getColor(imageData, this.x, this.y);
        }
        for (i = 0, len = data.length; i < len; i += 4) {
            if (this._isOutsideThreshold(data[i], filterColor[0], threshold)
                || this._isOutsideThreshold(data[i + 1], filterColor[1], threshold)
                || this._isOutsideThreshold(data[i + 2], filterColor[2], threshold)) {
                continue;
            }
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
        }
        context.putImageData(imageData, 0, 0);
    },
    /**
     * Check color if it is within threshold
     * @param {Number} color1 source color
     * @param {Number} color2 filtering color
     * @param {Number} threshold threshold
     * @returns {boolean} true if within threshold or false
     */
    _isOutsideThreshold: function (color1, color2, threshold) {
        var diff = color1 - color2;
        return Math.abs(diff) > threshold;
    },
    /**
     * Get color at (x, y)
     * @param {Object} imageData of canvas
     * @param {Number} x left position
     * @param {Number} y top position
     * @returns {Array} color array
     */
    _getColor: function (imageData, x, y) {
        var color = [0, 0, 0, 0];
        var data = imageData.data, width = imageData.width;
        var bytes = 4;
        var position = ((width * y) + x) * bytes;
        color[0] = data[position];
        color[1] = data[position + 1];
        color[2] = data[position + 2];
        color[3] = data[position + 3];
        return color;
    }
});
exports.default = ColorFilter;
//# sourceMappingURL=colorFilter.js.map