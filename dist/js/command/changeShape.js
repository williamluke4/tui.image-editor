"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview change a shape
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages, commandNames = consts.commandNames;
var SHAPE = componentNames.SHAPE;
var command = {
    name: commandNames.CHANGE_SHAPE,
    /**
     * Change a shape
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {Object} options - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.left] - Shape x position
     *      @param {number} [options.top] - Shape y position
     *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     * @returns {Promise}
     */
    execute: function (graphics, id, options) {
        var _this = this;
        var shapeComp = graphics.getComponent(SHAPE);
        var targetObj = graphics.getObject(id);
        if (!targetObj) {
            return promise_1.default.reject(rejectMessages.noObject);
        }
        this.undoData.object = targetObj;
        this.undoData.options = {};
        tui_code_snippet_1.default.forEachOwnProperties(options, function (value, key) {
            _this.undoData.options[key] = targetObj[key];
        });
        return shapeComp.change(targetObj, options);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var shapeComp = graphics.getComponent(SHAPE);
        var _a = this.undoData, shape = _a.object, options = _a.options;
        return shapeComp.change(shape, options);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=changeShape.js.map