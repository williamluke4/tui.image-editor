"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Change icon color
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages, commandNames = consts.commandNames;
var ICON = componentNames.ICON;
var command = {
    name: commandNames.CHANGE_ICON_COLOR,
    /**
     * Change icon color
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {string} color - Color for icon
     * @returns {Promise}
     */
    execute: function (graphics, id, color) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            var iconComp = graphics.getComponent(ICON);
            var targetObj = graphics.getObject(id);
            if (!targetObj) {
                reject(rejectMessages.noObject);
            }
            _this.undoData.object = targetObj;
            _this.undoData.color = iconComp.getColor(targetObj);
            iconComp.setColor(color, targetObj);
            resolve();
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var iconComp = graphics.getComponent(ICON);
        var _a = this.undoData.object, icon = _a.object, color = _a.color;
        iconComp.setColor(color, icon);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=changeIconColor.js.map