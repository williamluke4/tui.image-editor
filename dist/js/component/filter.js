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
 * @fileoverview Add filter module
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var fabric_require_1 = require("fabric/dist/fabric.require");
var component_1 = require("../interface/component");
var mask_1 = require("../extension/mask");
var consts = require("../consts");
var blur_1 = require("../extension/blur");
var sharpen_1 = require("../extension/sharpen");
var emboss_1 = require("../extension/emboss");
var colorFilter_1 = require("../extension/colorFilter");
var rejectMessages = consts.rejectMessages;
var filters = fabric_require_1.default.Image.filters;
filters.Mask = mask_1.default;
filters.Blur = blur_1.default;
filters.Sharpen = sharpen_1.default;
filters.Emboss = emboss_1.default;
filters.ColorFilter = colorFilter_1.default;
/**
 * Filter
 * @class Filter
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(graphics) {
        return _super.call(this, consts.componentNames.FILTER, graphics) || this;
    }
    /**
     * Add filter to source image (a specific filter is added on fabric.js)
     * @param {string} type - Filter type
     * @param {Object} [options] - Options of filter
     * @returns {Promise}
     */
    Filter.prototype.add = function (type, options) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            var sourceImg = _this._getSourceImage();
            var canvas = _this.getCanvas();
            var imgFilter = _this._getFilter(sourceImg, type);
            if (!imgFilter) {
                imgFilter = _this._createFilter(sourceImg, type, options);
            }
            if (!imgFilter) {
                reject(rejectMessages.invalidParameters);
            }
            _this._changeFilterValues(imgFilter, options);
            _this._apply(sourceImg, function () {
                canvas.renderAll();
                resolve({
                    type: type,
                    action: 'add'
                });
            });
        });
    };
    /**
     * Remove filter to source image
     * @param {string} type - Filter type
     * @returns {Promise}
     */
    Filter.prototype.remove = function (type) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            var sourceImg = _this._getSourceImage();
            var canvas = _this.getCanvas();
            if (!sourceImg.filters.length) {
                reject(rejectMessages.unsupportedOperation);
            }
            _this._removeFilter(sourceImg, type);
            _this._apply(sourceImg, function () {
                canvas.renderAll();
                resolve({
                    type: type,
                    action: 'remove'
                });
            });
        });
    };
    /**
     * Whether this has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */
    Filter.prototype.hasFilter = function (type) {
        return !!this._getFilter(this._getSourceImage(), type);
    };
    /**
     * Get a filter options
     * @param {string} type - Filter type
     * @returns {Object} filter options or null if there is no that filter
     */
    Filter.prototype.getOptions = function (type) {
        var sourceImg = this._getSourceImage();
        var imgFilter = this._getFilter(sourceImg, type);
        if (!imgFilter) {
            return null;
        }
        return tui_code_snippet_1.extend({}, imgFilter.options);
    };
    /**
     * Change filter values
     * @param {Object} imgFilter object of filter
     * @param {Object} options object
     * @private
     */
    Filter.prototype._changeFilterValues = function (imgFilter, options) {
        tui_code_snippet_1.forEach(options, function (value, key) {
            if (!tui_code_snippet_1.isUndefined(imgFilter[key])) {
                imgFilter[key] = value;
            }
        });
        tui_code_snippet_1.forEach(imgFilter.options, function (value, key) {
            if (!tui_code_snippet_1.isUndefined(options[key])) {
                imgFilter.options[key] = options[key];
            }
        });
    };
    /**
     * Apply filter
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {function} callback - Executed function after applying filter
     * @private
     */
    Filter.prototype._apply = function (sourceImg, callback) {
        sourceImg.applyFilters(callback);
    };
    /**
     * Get source image on canvas
     * @returns {fabric.Image} Current source image on canvas
     * @private
     */
    Filter.prototype._getSourceImage = function () {
        return this.getCanvasImage();
    };
    /**
     * Create filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @param {Object} [options] - Options of filter
     * @returns {Object} Fabric object of filter
     * @private
     */
    Filter.prototype._createFilter = function (sourceImg, type, options) {
        var filterObj;
        // capitalize first letter for matching with fabric image filter name
        var fabricType = this._getFabricFilterType(type);
        var ImageFilter = fabric_require_1.default.Image.filters[fabricType];
        if (ImageFilter) {
            filterObj = new ImageFilter(options);
            filterObj.options = options;
            sourceImg.filters.push(filterObj);
        }
        return filterObj;
    };
    /**
     * Get applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @returns {Object} Fabric object of filter
     * @private
     */
    Filter.prototype._getFilter = function (sourceImg, type) {
        var imgFilter = null;
        if (sourceImg) {
            var fabricType = this._getFabricFilterType(type);
            var length_1 = sourceImg.filters.length;
            var item = void 0, i = void 0;
            for (i = 0; i < length_1; i += 1) {
                item = sourceImg.filters[i];
                if (item.type === fabricType) {
                    imgFilter = item;
                    break;
                }
            }
        }
        return imgFilter;
    };
    /**
     * Remove applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @private
     */
    Filter.prototype._removeFilter = function (sourceImg, type) {
        var fabricType = this._getFabricFilterType(type);
        sourceImg.filters = tui_code_snippet_1.filter(sourceImg.filters, function (value) { return value.type !== fabricType; });
    };
    /**
     * Change filter class name to fabric's, especially capitalizing first letter
     * @param {string} type - Filter type
     * @example
     * 'grayscale' -> 'Grayscale'
     * @returns {string} Fabric filter class name
     */
    Filter.prototype._getFabricFilterType = function (type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };
    return Filter;
}(component_1.default));
exports.default = Filter;
//# sourceMappingURL=filter.js.map