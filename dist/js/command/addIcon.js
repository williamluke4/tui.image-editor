"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Add an icon
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var ICON = componentNames.ICON;
var command = {
    name: commandNames.ADD_ICON,
    /**
     * Add an icon
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Icon type ('arrow', 'cancel', custom icon name)
     * @param {Object} options - Icon options
     *      @param {string} [options.fill] - Icon foreground color
     *      @param {string} [options.left] - Icon x position
     *      @param {string} [options.top] - Icon y position
     * @returns {Promise}
     */
    execute: function (graphics, type, options) {
        var _this = this;
        var iconComp = graphics.getComponent(ICON);
        return iconComp.add(type, options).then(function (objectProps) {
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
//# sourceMappingURL=addIcon.js.map