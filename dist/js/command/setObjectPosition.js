"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Set object properties
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames, rejectMessages = consts.rejectMessages;
var command = {
    name: commandNames.SET_OBJECT_POSITION,
    /**
     * Set object properties
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @param {Object} posInfo - position object
     *  @param {number} posInfo.x - x position
     *  @param {number} posInfo.y - y position
     *  @param {string} posInfo.originX - can be 'left', 'center', 'right'
     *  @param {string} posInfo.originY - can be 'top', 'center', 'bottom'
     * @returns {Promise}
     */
    execute: function (graphics, id, posInfo) {
        var targetObj = graphics.getObject(id);
        if (!targetObj) {
            return promise_1.default.reject(rejectMessages.noObject);
        }
        this.undoData.objectId = id;
        this.undoData.props = graphics.getObjectProperties(id, ['left', 'top']);
        graphics.setObjectPosition(id, posInfo);
        graphics.renderAll();
        return promise_1.default.resolve();
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var _a = this.undoData, objectId = _a.objectId, props = _a.props;
        graphics.setObjectProperties(objectId, props);
        graphics.renderAll();
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=setObjectPosition.js.map