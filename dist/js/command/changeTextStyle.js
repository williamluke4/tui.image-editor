"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Change text styles
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages, commandNames = consts.commandNames;
var TEXT = componentNames.TEXT;
var command = {
    name: commandNames.CHANGE_TEXT_STYLE,
    /**
     * Change text styles
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {Object} styles - text styles
     *     @param {string} [styles.fill] Color
     *     @param {string} [styles.fontFamily] Font type for text
     *     @param {number} [styles.fontSize] Size
     *     @param {string} [styles.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [styles.textAlign] Type of text align (left / center / right)
     *     @param {string} [styles.textDecoraiton] Type of line (underline / line-throgh / overline)
     * @returns {Promise}
     */
    execute: function (graphics, id, styles) {
        var _this = this;
        var textComp = graphics.getComponent(TEXT);
        var targetObj = graphics.getObject(id);
        if (!targetObj) {
            return promise_1.default.reject(rejectMessages.noObject);
        }
        this.undoData.object = targetObj;
        this.undoData.styles = {};
        tui_code_snippet_1.default.forEachOwnProperties(styles, function (value, key) {
            _this.undoData.styles[key] = targetObj[key];
        });
        return textComp.setStyle(targetObj, styles);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var textComp = graphics.getComponent(TEXT);
        var _a = this.undoData, textObj = _a.object, styles = _a.styles;
        return textComp.setStyle(textObj, styles);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=changeTextStyle.js.map