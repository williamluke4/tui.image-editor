"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Change a text
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages, commandNames = consts.commandNames;
var TEXT = componentNames.TEXT;
var command = {
    name: commandNames.CHANGE_TEXT,
    /**
     * Change a text
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {string} text - Changing text
     * @returns {Promise}
     */
    execute: function (graphics, id, text) {
        var textComp = graphics.getComponent(TEXT);
        var targetObj = graphics.getObject(id);
        if (!targetObj) {
            return promise_1.default.reject(rejectMessages.noObject);
        }
        this.undoData.object = targetObj;
        this.undoData.text = textComp.getText(targetObj);
        return textComp.change(targetObj, text);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var textComp = graphics.getComponent(TEXT);
        var _a = this.undoData, textObj = _a.object, text = _a.text;
        return textComp.change(textObj, text);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=changeText.js.map