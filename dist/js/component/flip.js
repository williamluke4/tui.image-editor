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
 * @fileoverview Image flip module
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages;
/**
 * Flip
 * @class Flip
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Flip = /** @class */ (function (_super) {
    __extends(Flip, _super);
    function Flip(graphics) {
        return _super.call(this, componentNames.FLIP, graphics) || this;
    }
    /**
     * Get current flip settings
     * @returns {{flipX: Boolean, flipY: Boolean}}
     */
    Flip.prototype.getCurrentSetting = function () {
        var canvasImage = this.getCanvasImage();
        return {
            flipX: canvasImage.flipX,
            flipY: canvasImage.flipY
        };
    };
    /**
     * Set flipX, flipY
     * @param {{flipX: Boolean, flipY: Boolean}} newSetting - Flip setting
     * @returns {jQuery.Deferred}
     */
    Flip.prototype.set = function (newSetting) {
        var setting = this.getCurrentSetting();
        var isChangingFlipX = (setting.flipX !== newSetting.flipX);
        var isChangingFlipY = (setting.flipY !== newSetting.flipY);
        if (!isChangingFlipX && !isChangingFlipY) {
            return promise_1.default.reject(rejectMessages.flip);
        }
        tui_code_snippet_1.default.extend(setting, newSetting);
        this.setImageProperties(setting, true);
        this._invertAngle(isChangingFlipX, isChangingFlipY);
        this._flipObjects(isChangingFlipX, isChangingFlipY);
        return promise_1.default.resolve({
            flipX: setting.flipX,
            flipY: setting.flipY,
            angle: this.getCanvasImage().angle
        });
    };
    /**
     * Invert image angle for flip
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     */
    Flip.prototype._invertAngle = function (isChangingFlipX, isChangingFlipY) {
        var canvasImage = this.getCanvasImage();
        var angle = canvasImage.angle;
        if (isChangingFlipX) {
            angle *= -1;
        }
        if (isChangingFlipY) {
            angle *= -1;
        }
        canvasImage.setAngle(parseFloat(angle)).setCoords(); // parseFloat for -0 to 0
    };
    /**
     * Flip objects
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     * @private
     */
    Flip.prototype._flipObjects = function (isChangingFlipX, isChangingFlipY) {
        var canvas = this.getCanvas();
        if (isChangingFlipX) {
            canvas.forEachObject(function (obj) {
                obj.set({
                    angle: parseFloat(obj.angle * -1),
                    flipX: !obj.flipX,
                    left: canvas.width - obj.left
                }).setCoords();
            });
        }
        if (isChangingFlipY) {
            canvas.forEachObject(function (obj) {
                obj.set({
                    angle: parseFloat(obj.angle * -1),
                    flipY: !obj.flipY,
                    top: canvas.height - obj.top
                }).setCoords();
            });
        }
        canvas.renderAll();
    };
    /**
     * Reset flip settings
     * @returns {jQuery.Deferred}
     */
    Flip.prototype.reset = function () {
        return this.set({
            flipX: false,
            flipY: false
        });
    };
    /**
     * Flip x
     * @returns {jQuery.Deferred}
     */
    Flip.prototype.flipX = function () {
        var current = this.getCurrentSetting();
        return this.set({
            flipX: !current.flipX,
            flipY: current.flipY
        });
    };
    /**
     * Flip y
     * @returns {jQuery.Deferred}
     */
    Flip.prototype.flipY = function () {
        var current = this.getCurrentSetting();
        return this.set({
            flipX: current.flipX,
            flipY: !current.flipY
        });
    };
    return Flip;
}(component_1.default));
exports.default = Flip;
//# sourceMappingURL=flip.js.map