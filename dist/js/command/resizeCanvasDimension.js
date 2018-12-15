"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Resize a canvas
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames;
var command = {
    name: commandNames.RESIZE_CANVAS_DIMENSION,
    /**
     * resize the canvas with given dimension
     * @param {Graphics} graphics - Graphics instance
     * @param {{width: number, height: number}} dimension - Max width & height
     * @returns {Promise}
     */
    execute: function (graphics, dimension) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            _this.undoData.size = {
                width: graphics.cssMaxWidth,
                height: graphics.cssMaxHeight
            };
            graphics.setCssMaxDimension(dimension);
            graphics.adjustCanvasDimension();
            resolve();
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        graphics.setCssMaxDimension(this.undoData.size);
        graphics.adjustCanvasDimension();
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=resizeCanvasDimension.js.map