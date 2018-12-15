"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Add an object
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames, rejectMessages = consts.rejectMessages;
var command = {
    name: commandNames.ADD_OBJECT,
    /**
     * Add an object
     * @param {Graphics} graphics - Graphics instance
     * @param {Object} object - Fabric object
     * @returns {Promise}
     */
    execute: function (graphics, object) {
        return new promise_1.default(function (resolve, reject) {
            if (!graphics.contains(object)) {
                graphics.add(object);
                resolve(object);
            }
            else {
                reject(rejectMessages.addedObject);
            }
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @param {Object} object - Fabric object
     * @returns {Promise}
     */
    undo: function (graphics, object) {
        return new promise_1.default(function (resolve, reject) {
            if (graphics.contains(object)) {
                graphics.remove(object);
                resolve(object);
            }
            else {
                reject(rejectMessages.noObject);
            }
        });
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=addObject.js.map