"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Apply a filter into an image
 */
var command_1 = require("../factory/command");
var consts = require("../consts");
var componentNames = consts.componentNames, rejectMessages = consts.rejectMessages, commandNames = consts.commandNames;
var FILTER = componentNames.FILTER;
var command = {
    name: commandNames.APPLY_FILTER,
    /**
     * Apply a filter into an image
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Filter type
     * @param {Object} options - Filter options
     *  @param {number} options.maskObjId - masking image object id
     * @returns {Promise}
     */
    execute: function (graphics, type, options) {
        var filterComp = graphics.getComponent(FILTER);
        if (type === 'mask') {
            var maskObj = graphics.getObject(options.maskObjId);
            if (!(maskObj && maskObj.isType('image'))) {
                return Promise.reject(rejectMessages.invalidParameters);
            }
            options = {
                mask: maskObj
            };
        }
        if (type === 'mask') {
            this.undoData.object = options.mask;
            graphics.remove(options.mask);
        }
        else {
            this.undoData.options = filterComp.getOptions(type);
        }
        return filterComp.add(type, options);
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Filter type
     * @returns {Promise}
     */
    undo: function (graphics, type) {
        var filterComp = graphics.getComponent(FILTER);
        if (type === 'mask') {
            var mask = this.undoData.object;
            graphics.add(mask);
            graphics.setActiveObject(mask);
            return filterComp.remove(type);
        }
        // options changed case
        if (this.undoData.options) {
            return filterComp.add(type, this.undoData.options);
        }
        // filter added case
        return filterComp.remove(type);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=applyFilter.js.map