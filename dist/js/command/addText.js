"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Add a text object
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var TEXT = componentNames.TEXT;
var command = {
    name: commandNames.ADD_TEXT,
    /**
     * Add a text object
     * @param {Graphics} graphics - Graphics instance
     * @param {string} text - Initial input text
     * @param {Object} [options] Options for text styles
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoraiton] Type of line (underline / line-throgh / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     * @returns {Promise}
     */
    execute: function (graphics, text, options) {
        var _this = this;
        var textComp = graphics.getComponent(TEXT);
        return textComp.add(text, options).then(function (objectProps) {
            _this.undoData.object = graphics.getObject(objectProps.id);
            return objectProps;
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        graphics.remove(this.undoData.object);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=addText.js.map