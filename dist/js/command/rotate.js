"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Rotate an image
 */
var command_1 = require("../factory/command");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var ROTATION = componentNames.ROTATION;
var command = {
    name: commandNames.ROTATE_IMAGE,
    /**
     * Rotate an image
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - 'rotate' or 'setAngle'
     * @param {number} angle - angle value (degree)
     * @returns {Promise}
     */
    execute: function (graphics, type, angle) {
        var rotationComp = graphics.getComponent(ROTATION);
        this.undoData.angle = rotationComp.getCurrentAngle();
        return rotationComp[type](angle);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var rotationComp = graphics.getComponent(ROTATION);
        var angle = this.undoData.angle;
        return rotationComp.setAngle(angle);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=rotate.js.map