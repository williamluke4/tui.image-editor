"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Remove an object
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames, rejectMessages = consts.rejectMessages;
var command = {
    name: commandNames.REMOVE_OBJECT,
    /**
     * Remove an object
     * @param {Graphics} graphics - Graphics instance
     * @param {number} id - object id
     * @returns {Promise}
     */
    execute: function (graphics, id) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            _this.undoData.objects = graphics.removeObjectById(id);
            if (_this.undoData.objects.length) {
                resolve();
            }
            else {
                reject(rejectMessages.noObject);
            }
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        graphics.add(this.undoData.objects);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=removeObject.js.map