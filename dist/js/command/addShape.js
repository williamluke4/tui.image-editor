"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Add a shape
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var SHAPE = componentNames.SHAPE;
var command = {
    name: commandNames.ADD_SHAPE,
    /**
     * Add a shape
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
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
    execute: function (graphics, type, options) {
        var _this = this;
        var shapeComp = graphics.getComponent(SHAPE);
        return shapeComp.add(type, options).then(function (objectProps) {
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
//# sourceMappingURL=addShape.js.map