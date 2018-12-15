"use strict";
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Component interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Component interface
 * @class
 * @param {string} name - component name
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
var Component = /** @class */ (function () {
    function Component(name, graphics) {
        /**
         * Component name
         * @type {string}
         */
        this.name = name;
        /**
         * Graphics instance
         * @type {Graphics}
         */
        this.graphics = graphics;
    }
    /**
     * Fire Graphics event
     * @param {Array} args - arguments
     * @returns {Object} return value
     */
    Component.prototype.fire = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this.graphics;
        return this.graphics.fire.apply(context, args);
    };
    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {fabric.Image} oImage - Fabric image instance
     */
    Component.prototype.setCanvasImage = function (name, oImage) {
        this.graphics.setCanvasImage(name, oImage);
    };
    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    Component.prototype.getCanvasElement = function () {
        return this.graphics.getCanvasElement();
    };
    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */
    Component.prototype.getCanvas = function () {
        return this.graphics.getCanvas();
    };
    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */
    Component.prototype.getCanvasImage = function () {
        return this.graphics.getCanvasImage();
    };
    /**
     * Get image name
     * @returns {string}
     */
    Component.prototype.getImageName = function () {
        return this.graphics.getImageName();
    };
    /**
     * Get image editor
     * @returns {ImageEditor}
     */
    Component.prototype.getEditor = function () {
        return this.graphics.getEditor();
    };
    /**
     * Return component name
     * @returns {string}
     */
    Component.prototype.getName = function () {
        return this.name;
    };
    /**
     * Set image properties
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */
    Component.prototype.setImageProperties = function (setting, withRendering) {
        this.graphics.setImageProperties(setting, withRendering);
    };
    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas css dimension
     */
    Component.prototype.setCanvasCssDimension = function (dimension) {
        this.graphics.setCanvasCssDimension(dimension);
    };
    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas backstore dimension
     */
    Component.prototype.setCanvasBackstoreDimension = function (dimension) {
        this.graphics.setCanvasBackstoreDimension(dimension);
    };
    /**
     * Adjust canvas dimension with scaling image
     */
    Component.prototype.adjustCanvasDimension = function () {
        this.graphics.adjustCanvasDimension();
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=component.js.map