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
 * @fileoverview Free drawing module, Set brush
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var component_1 = require("../interface/component");
var consts = require("../consts");
/**
 * FreeDrawing
 * @class FreeDrawing
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var FreeDrawing = /** @class */ (function (_super) {
    __extends(FreeDrawing, _super);
    function FreeDrawing(graphics) {
        var _this = _super.call(this, consts.componentNames.FREE_DRAWING, graphics) || this;
        /**
         * Brush width
         * @type {number}
         */
        _this.width = 12;
        /**
         * fabric.Color instance for brush color
         * @type {fabric.Color}
         */
        _this.oColor = new fabric_require_1.default.Color('rgba(0, 0, 0, 0.5)');
        return _this;
    }
    /**
     * Start free drawing mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    FreeDrawing.prototype.start = function (setting) {
        var canvas = this.getCanvas();
        canvas.isDrawingMode = true;
        this.setBrush(setting);
    };
    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    FreeDrawing.prototype.setBrush = function (setting) {
        var brush = this.getCanvas().freeDrawingBrush;
        setting = setting || {};
        this.width = setting.width || this.width;
        if (setting.color) {
            this.oColor = new fabric_require_1.default.Color(setting.color);
        }
        brush.width = this.width;
        brush.color = this.oColor.toRgba();
    };
    /**
     * End free drawing mode
     */
    FreeDrawing.prototype.end = function () {
        var canvas = this.getCanvas();
        canvas.isDrawingMode = false;
    };
    return FreeDrawing;
}(component_1.default));
exports.default = FreeDrawing;
//# sourceMappingURL=freeDrawing.js.map