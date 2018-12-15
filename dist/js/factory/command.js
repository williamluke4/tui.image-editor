"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Command factory
 */
var command_1 = require("../interface/command");
var commands = {};
/**
 * Create a command
 * @param {string} name - Command name
 * @param {...*} args - Arguments for creating command
 * @returns {Command}
 * @ignore
 */
function create(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var actions = commands[name];
    if (actions) {
        return new command_1.default(actions, args);
    }
    return null;
}
/**
 * Register a command with name as a key
 * @param {Object} command - {name:{string}, execute: {function}, undo: {function}}
 * @param {string} command.name - command name
 * @param {function} command.execute - executable function
 * @param {function} command.undo - undo function
 * @ignore
 */
function register(command) {
    commands[command.name] = command;
}
exports.default = {
    create: create,
    register: register
};
//# sourceMappingURL=command.js.map