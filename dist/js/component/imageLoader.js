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
 * @fileoverview Image loader
 */
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages;
var imageOption = {
    padding: 0,
    crossOrigin: 'Anonymous'
};
/**
 * ImageLoader components
 * @extends {Component}
 * @class ImageLoader
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
var ImageLoader = /** @class */ (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(graphics) {
        return _super.call(this, componentNames.IMAGE_LOADER, graphics) || this;
    }
    /**
     * Load image from url
     * @param {?string} imageName - File name
     * @param {?(fabric.Image|string)} img - fabric.Image instance or URL of an image
     * @returns {jQuery.Deferred} deferred
     */
    ImageLoader.prototype.load = function (imageName, img) {
        var _this = this;
        var promise;
        if (!imageName && !img) { // Back to the initial state, not error.
            var canvas = this.getCanvas();
            canvas.backgroundImage = null;
            canvas.renderAll();
            promise = new promise_1.default(function (resolve) {
                _this.setCanvasImage('', null);
                resolve();
            });
        }
        else {
            promise = this._setBackgroundImage(img).then(function (oImage) {
                _this.setCanvasImage(imageName, oImage);
                _this.adjustCanvasDimension();
                return oImage;
            });
        }
        return promise;
    };
    /**
     * Set background image
     * @param {?(fabric.Image|String)} img fabric.Image instance or URL of an image to set background to
     * @returns {$.Deferred} deferred
     * @private
     */
    ImageLoader.prototype._setBackgroundImage = function (img) {
        var _this = this;
        if (!img) {
            return promise_1.default.reject(rejectMessages.loadImage);
        }
        return new promise_1.default(function (resolve, reject) {
            var canvas = _this.getCanvas();
            canvas.setBackgroundImage(img, function () {
                var oImage = canvas.backgroundImage;
                if (oImage.getElement()) {
                    resolve(oImage);
                }
                else {
                    reject(rejectMessages.loadingImageFailed);
                }
            }, imageOption);
        });
    };
    return ImageLoader;
}(component_1.default));
exports.default = ImageLoader;
//# sourceMappingURL=imageLoader.js.map