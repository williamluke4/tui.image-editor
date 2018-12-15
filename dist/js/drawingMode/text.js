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
 * @fileoverview TextDrawingMode class
 */
var drawingMode_1 = require("../interface/drawingMode");
var consts = require("../consts");
var drawingModes = consts.drawingModes;
var components = consts.componentNames;
/**
 * TextDrawingMode class
 * @class
 * @ignore
 */
var TextDrawingMode = /** @class */ (function (_super) {
    __extends(TextDrawingMode, _super);
    function TextDrawingMode() {
        return _super.call(this, drawingModes.TEXT) || this;
    }
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    TextDrawingMode.prototype.start = function (graphics) {
        var text = graphics.getComponent(components.TEXT);
        text.start();
    };
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    TextDrawingMode.prototype.end = function (graphics) {
        var text = graphics.getComponent(components.TEXT);
        text.end();
    };
    return TextDrawingMode;
}(drawingMode_1.default));
exports.default = TextDrawingMode;
//# sourceMappingURL=text.js.map