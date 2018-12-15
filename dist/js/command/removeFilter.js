"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Remove a filter from an image
 */
var command_1 = require("../factory/command");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var FILTER = componentNames.FILTER;
var command = {
    name: commandNames.REMOVE_FILTER,
    /**
     * Remove a filter from an image
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Filter type
     * @returns {Promise}
     */
    execute: function (graphics, type) {
        var filterComp = graphics.getComponent(FILTER);
        this.undoData.options = filterComp.getOptions(type);
        return filterComp.remove(type);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Filter type
     * @returns {Promise}
     */
    undo: function (graphics, type) {
        var filterComp = graphics.getComponent(FILTER);
        var options = this.undoData.options;
        return filterComp.add(type, options);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=removeFilter.js.map