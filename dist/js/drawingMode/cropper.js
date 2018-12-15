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
 * @fileoverview CropperDrawingMode class
 */
var drawingMode_1 = require("../interface/drawingMode");
var consts = require("../consts");
var drawingModes = consts.drawingModes;
var components = consts.componentNames;
/**
 * CropperDrawingMode class
 * @class
 * @ignore
 */
var CropperDrawingMode = /** @class */ (function (_super) {
    __extends(CropperDrawingMode, _super);
    function CropperDrawingMode() {
        return _super.call(this, drawingModes.CROPPER) || this;
    }
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    CropperDrawingMode.prototype.start = function (graphics) {
        var cropper = graphics.getComponent(components.CROPPER);
        cropper.start();
    };
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    CropperDrawingMode.prototype.end = function (graphics) {
        var cropper = graphics.getComponent(components.CROPPER);
        cropper.end();
    };
    return CropperDrawingMode;
}(drawingMode_1.default));
exports.default = CropperDrawingMode;
//# sourceMappingURL=cropper.js.map