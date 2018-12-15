/**
 * Invoker
 * @class
 * @ignore
 */
declare class Invoker {
    _undoStack: any;
    _redoStack: any;
    _isLocked: any;
    fire: any;
    args: any;
    constructor();
    /**
     * Invoke command execution
     * @param {Command} command - Command
     * @returns {Promise}
     * @private
     */
    _invokeExecution(command: any): any;
    /**
     * Invoke command undo
     * @param {Command} command - Command
     * @returns {Promise}
     * @private
     */
    _invokeUndo(command: any): any;
    /**
     * fire REDO_STACK_CHANGED event
     * @private
     */
    _fireRedoStackChanged(): void;
    /**
     * fire UNDO_STACK_CHANGED event
     * @private
     */
    _fireUndoStackChanged(): void;
    /**
     * Lock this invoker
     */
    lock(): void;
    /**
     * Unlock this invoker
     */
    unlock(): void;
    /**
     * Invoke command
     * Store the command to the undoStack
     * Clear the redoStack
     * @param {String} commandName - Command name
     * @param {...*} args - Arguments for creating command
     * @returns {Promise}
     */
    execute(...args: any[]): any;
    /**
     * Undo command
     * @returns {Promise}
     */
    undo(): any;
    /**
     * Redo command
     * @returns {Promise}
     */
    redo(): any;
    /**
     * Push undo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */
    pushUndoStack(command: any, isSilent?: any): void;
    /**
     * Push redo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */
    pushRedoStack(command: any, isSilent?: any): void;
    /**
     * Return whether the redoStack is empty
     * @returns {boolean}
     */
    isEmptyRedoStack(): boolean;
    /**
     * Return whether the undoStack is empty
     * @returns {boolean}
     */
    isEmptyUndoStack(): boolean;
    /**
     * Clear undoStack
     */
    clearUndoStack(): void;
    /**
     * Clear redoStack
     */
    clearRedoStack(): void;
}
export default Invoker;
