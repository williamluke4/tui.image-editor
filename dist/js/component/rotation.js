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
 * @fileoverview Image rotation module
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var componentNames = consts.componentNames;
/**
 * Image Rotation component
 * @class Rotation
 * @extends {Component}
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
var Rotation = /** @class */ (function (_super) {
    __extends(Rotation, _super);
    function Rotation(graphics) {
        return _super.call(this, componentNames.ROTATION, graphics) || this;
    }
    /**
     * Get current angle
     * @returns {Number}
     */
    Rotation.prototype.getCurrentAngle = function () {
        return this.getCanvasImage().angle;
    };
    /**
     * Set angle of the image
     *
     *  Do not call "this.setImageProperties" for setting angle directly.
     *  Before setting angle, The originX,Y of image should be set to center.
     *      See "http://fabricjs.com/docs/fabric.Object.html#setAngle"
     *
     * @param {number} angle - Angle value
     * @returns {jQuery.Deferred}
     */
    Rotation.prototype.setAngle = function (angle) {
        var oldAngle = this.getCurrentAngle() % 360; // The angle is lower than 2*PI(===360 degrees)
        angle %= 360;
        var canvasImage = this.getCanvasImage();
        var oldImageCenter = canvasImage.getCenterPoint();
        canvasImage.setAngle(angle).setCoords();
        this.adjustCanvasDimension();
        var newImageCenter = canvasImage.getCenterPoint();
        this._rotateForEachObject(oldImageCenter, newImageCenter, angle - oldAngle);
        return promise_1.default.resolve(angle);
    };
    /**
     * Rotate for each object
     * @param {fabric.Point} oldImageCenter - Image center point before rotation
     * @param {fabric.Point} newImageCenter - Image center point after rotation
     * @param {number} angleDiff - Image angle difference after rotation
     * @private
     */
    Rotation.prototype._rotateForEachObject = function (oldImageCenter, newImageCenter, angleDiff) {
        var canvas = this.getCanvas();
        var centerDiff = {
            x: oldImageCenter.x - newImageCenter.x,
            y: oldImageCenter.y - newImageCenter.y
        };
        canvas.forEachObject(function (obj) {
            var objCenter = obj.getCenterPoint();
            var radian = fabric_require_1.default.util.degreesToRadians(angleDiff);
            var newObjCenter = fabric_require_1.default.util.rotatePoint(objCenter, oldImageCenter, radian);
            obj.set({
                left: newObjCenter.x - centerDiff.x,
                top: newObjCenter.y - centerDiff.y,
                angle: (obj.angle + angleDiff) % 360
            });
            obj.setCoords();
        });
        canvas.renderAll();
    };
    /**
     * Rotate the image
     * @param {number} additionalAngle - Additional angle
     * @returns {jQuery.Deferred}
     */
    Rotation.prototype.rotate = function (additionalAngle) {
        var current = this.getCurrentAngle();
        return this.setAngle(current + additionalAngle);
    };
    return Rotation;
}(component_1.default));
exports.default = Rotation;
//# sourceMappingURL=rotation.js.map