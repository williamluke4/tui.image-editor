"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Set object properties
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames, rejectMessages = consts.rejectMessages;
var command = {
    name: commandNames.SET_OBJECT_PROPERTIES,
    /**
     * Set object properties
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {Object} props - properties
     *     @param {string} [props.fill] Color
     *     @param {string} [props.fontFamily] Font type for text
     *     @param {number} [props.fontSize] Size
     *     @param {string} [props.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [props.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [props.textAlign] Type of text align (left / center / right)
     *     @param {string} [props.textDecoraiton] Type of line (underline / line-throgh / overline)
     * @returns {Promise}
     */
    execute: function (graphics, id, props) {
        var _this = this;
        var targetObj = graphics.getObject(id);
        if (!targetObj) {
            return promise_1.default.reject(rejectMessages.noObject);
        }
        this.undoData.props = {};
        tui_code_snippet_1.default.forEachOwnProperties(props, function (value, key) {
            _this.undoData.props[key] = targetObj[key];
        });
        graphics.setObjectProperties(id, props);
        return promise_1.default.resolve();
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @returns {Promise}
     */
    undo: function (graphics, id) {
        var props = this.undoData.props;
        graphics.setObjectProperties(id, props);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=setObjectProperties.js.map