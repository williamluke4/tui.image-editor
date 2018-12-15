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
 * @fileoverview LineDrawingMode class
 */
var drawingMode_1 = require("../interface/drawingMode");
var consts = require("../consts");
var drawingModes = consts.drawingModes;
var components = consts.componentNames;
/**
 * LineDrawingMode class
 * @class
 * @ignore
 */
var LineDrawingMode = /** @class */ (function (_super) {
    __extends(LineDrawingMode, _super);
    function LineDrawingMode() {
        return _super.call(this, drawingModes.LINE_DRAWING) || this;
    }
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @param {{width: ?number, color: ?string}} [options] - Brush width & color
    * @override
    */
    LineDrawingMode.prototype.start = function (graphics, options) {
        var lineDrawing = graphics.getComponent(components.LINE);
        lineDrawing.start(options);
    };
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    LineDrawingMode.prototype.end = function (graphics) {
        var lineDrawing = graphics.getComponent(components.LINE);
        lineDrawing.end();
    };
    return LineDrawingMode;
}(drawingMode_1.default));
exports.default = LineDrawingMode;
//# sourceMappingURL=lineDrawing.js.map