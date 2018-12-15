"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Clear all objects
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames;
var command = {
    name: commandNames.CLEAR_OBJECTS,
    /**
     * Clear all objects without background (main) image
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    execute: function (graphics) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            _this.undoData.objects = graphics.removeAll();
            resolve();
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     * @ignore
     */
    undo: function (graphics) {
        graphics.add(this.undoData.objects);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=clearObjects.js.map