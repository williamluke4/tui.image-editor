"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Command interface
 */
var errorMessage_1 = require("../factory/errorMessage");
var createMessage = errorMessage_1.default.create;
var errorTypes = errorMessage_1.default.types;
/**
 * Command class
 * @class
 * @param {{name:function, execute: function, undo: function,
 *          executeCallback: function, undoCallback: function}} actions - Command actions
 * @param {Array} args - passing arguments on execute, undo
 * @ignore
 */
var Command = /** @class */ (function () {
    function Command(actions, args) {
        /**
         * command name
         * @type {string}
         */
        this.name = actions.name;
        /**
         * arguments
         * @type {Array}
         */
        this.args = args;
        /**
         * Execute function
         * @type {function}
         */
        this.execute = actions.execute;
        /**
         * Undo function
         * @type {function}
         */
        this.undo = actions.undo;
        /**
         * executeCallback
         * @type {function}
         */
        this.executeCallback = actions.executeCallback || null;
        /**
         * undoCallback
         * @type {function}
         */
        this.undoCallback = actions.undoCallback || null;
        /**
         * data for undo
         * @type {Object}
         */
        this.undoData = {};
    }
    /**
     * Execute action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    Command.prototype.execute = function () {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'execute'));
    };
    /**
     * Undo action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    Command.prototype.undo = function () {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'undo'));
    };
    /**
     * Attach execute callabck
     * @param {function} callback - Callback after execution
     * @returns {Command} this
     */
    Command.prototype.setExecuteCallback = function (callback) {
        this.executeCallback = callback;
        return this;
    };
    /**
     * Attach undo callback
     * @param {function} callback - Callback after undo
     * @returns {Command} this
     */
    Command.prototype.setUndoCallback = function (callback) {
        this.undoCallback = callback;
        return this;
    };
    return Command;
}());
exports.default = Command;
//# sourceMappingURL=command.js.map