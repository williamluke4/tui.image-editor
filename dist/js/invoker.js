"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Invoker - invoke commands
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var command_1 = require("./factory/command");
var consts = require("./consts");
var eventNames = consts.eventNames, rejectMessages = consts.rejectMessages;
var isFunction = tui_code_snippet_1.default.isFunction, isString = tui_code_snippet_1.default.isString, CustomEvents = tui_code_snippet_1.default.CustomEvents;
/**
 * Invoker
 * @class
 * @ignore
 */
var Invoker = /** @class */ (function () {
    function Invoker() {
        /**
         * Undo stack
         * @type {Array.<Command>}
         * @private
         */
        this._undoStack = [];
        /**
         * Redo stack
         * @type {Array.<Command>}
         * @private
         */
        this._redoStack = [];
        /**
         * Lock-flag for executing command
         * @type {boolean}
         * @private
         */
        this._isLocked = false;
    }
    /**
     * Invoke command execution
     * @param {Command} command - Command
     * @returns {Promise}
     * @private
     */
    Invoker.prototype._invokeExecution = function (command) {
        var _this = this;
        this.lock();
        var args = command.args;
        if (!args) {
            args = [];
        }
        return command.execute.apply(command, args).then(function (value) {
            _this.pushUndoStack(command);
            _this.unlock();
            if (isFunction(command.executeCallback)) {
                command.executeCallback(value);
            }
            return value;
        })['catch'](function (message) {
            _this.unlock();
            return promise_1.default.reject(message);
        });
    };
    /**
     * Invoke command undo
     * @param {Command} command - Command
     * @returns {Promise}
     * @private
     */
    Invoker.prototype._invokeUndo = function (command) {
        var _this = this;
        this.lock();
        var args = command.args;
        if (!args) {
            args = [];
        }
        return command.undo.apply(command, args).then(function (value) {
            _this.pushRedoStack(command);
            _this.unlock();
            if (isFunction(command.undoCallback)) {
                command.undoCallback(value);
            }
            return value;
        })['catch'](function (message) {
            _this.unlock();
            return promise_1.default.reject(message);
        });
    };
    /**
     * fire REDO_STACK_CHANGED event
     * @private
     */
    Invoker.prototype._fireRedoStackChanged = function () {
        this.fire(eventNames.REDO_STACK_CHANGED, this._redoStack.length);
    };
    /**
     * fire UNDO_STACK_CHANGED event
     * @private
     */
    Invoker.prototype._fireUndoStackChanged = function () {
        this.fire(eventNames.UNDO_STACK_CHANGED, this._undoStack.length);
    };
    /**
     * Lock this invoker
     */
    Invoker.prototype.lock = function () {
        this._isLocked = true;
    };
    /**
     * Unlock this invoker
     */
    Invoker.prototype.unlock = function () {
        this._isLocked = false;
    };
    /**
     * Invoke command
     * Store the command to the undoStack
     * Clear the redoStack
     * @param {String} commandName - Command name
     * @param {...*} args - Arguments for creating command
     * @returns {Promise}
     */
    Invoker.prototype.execute = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._isLocked) {
            return promise_1.default.reject(rejectMessages.isLock);
        }
        var command = args[0];
        if (isString(command)) {
            command = command_1.default.create.apply(command_1.default, args);
        }
        return this._invokeExecution(command)
            .then(function (value) {
            _this.clearRedoStack();
            return value;
        });
    };
    /**
     * Undo command
     * @returns {Promise}
     */
    Invoker.prototype.undo = function () {
        var command = this._undoStack.pop();
        var promise;
        var message = '';
        if (command && this._isLocked) {
            this.pushUndoStack(command, true);
            command = null;
        }
        if (command) {
            if (this.isEmptyUndoStack()) {
                this._fireUndoStackChanged();
            }
            promise = this._invokeUndo(command);
        }
        else {
            message = rejectMessages.undo;
            if (this._isLocked) {
                message = message + " Because " + rejectMessages.isLock;
            }
            promise = promise_1.default.reject(message);
        }
        return promise;
    };
    /**
     * Redo command
     * @returns {Promise}
     */
    Invoker.prototype.redo = function () {
        var command = this._redoStack.pop();
        var promise;
        var message = '';
        if (command && this._isLocked) {
            this.pushRedoStack(command, true);
            command = null;
        }
        if (command) {
            if (this.isEmptyRedoStack()) {
                this._fireRedoStackChanged();
            }
            promise = this._invokeExecution(command);
        }
        else {
            message = rejectMessages.redo;
            if (this._isLocked) {
                message = message + " Because " + rejectMessages.isLock;
            }
            promise = promise_1.default.reject(message);
        }
        return promise;
    };
    /**
     * Push undo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */
    Invoker.prototype.pushUndoStack = function (command, isSilent) {
        this._undoStack.push(command);
        if (!isSilent) {
            this._fireUndoStackChanged();
        }
    };
    /**
     * Push redo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */
    Invoker.prototype.pushRedoStack = function (command, isSilent) {
        this._redoStack.push(command);
        if (!isSilent) {
            this._fireRedoStackChanged();
        }
    };
    /**
     * Return whether the redoStack is empty
     * @returns {boolean}
     */
    Invoker.prototype.isEmptyRedoStack = function () {
        return this._redoStack.length === 0;
    };
    /**
     * Return whether the undoStack is empty
     * @returns {boolean}
     */
    Invoker.prototype.isEmptyUndoStack = function () {
        return this._undoStack.length === 0;
    };
    /**
     * Clear undoStack
     */
    Invoker.prototype.clearUndoStack = function () {
        if (!this.isEmptyUndoStack()) {
            this._undoStack = [];
            this._fireUndoStackChanged();
        }
    };
    /**
     * Clear redoStack
     */
    Invoker.prototype.clearRedoStack = function () {
        if (!this.isEmptyRedoStack()) {
            this._redoStack = [];
            this._fireRedoStackChanged();
        }
    };
    return Invoker;
}());
CustomEvents.mixin(Invoker);
exports.default = Invoker;
//# sourceMappingURL=invoker.js.map