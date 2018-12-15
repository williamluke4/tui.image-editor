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
 * @fileoverview ShapeDrawingMode class
 */
var drawingMode_1 = require("../interface/drawingMode");
var consts = require("../consts");
var drawingModes = consts.drawingModes;
var components = consts.componentNames;
/**
 * ShapeDrawingMode class
 * @class
 * @ignore
 */
var ShapeDrawingMode = /** @class */ (function (_super) {
    __extends(ShapeDrawingMode, _super);
    function ShapeDrawingMode() {
        return _super.call(this, drawingModes.SHAPE) || this;
    }
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    ShapeDrawingMode.prototype.start = function (graphics) {
        var shape = graphics.getComponent(components.SHAPE);
        shape.start();
    };
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    ShapeDrawingMode.prototype.end = function (graphics) {
        var shape = graphics.getComponent(components.SHAPE);
        shape.end();
    };
    return ShapeDrawingMode;
}(drawingMode_1.default));
exports.default = ShapeDrawingMode;
//# sourceMappingURL=shape.js.map