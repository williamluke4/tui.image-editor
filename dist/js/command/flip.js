"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Flip an image
 */
var command_1 = require("../factory/command");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var FLIP = componentNames.FLIP;
var command = {
    name: commandNames.FLIP_IMAGE,
    /**
     * flip an image
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - 'flipX' or 'flipY' or 'reset'
     * @returns {Promise}
     */
    execute: function (graphics, type) {
        var flipComp = graphics.getComponent(FLIP);
        this.undoData.setting = flipComp.getCurrentSetting();
        return flipComp[type]();
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var flipComp = graphics.getComponent(FLIP);
        return flipComp.set(this.undoData.setting);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=flip.js.map