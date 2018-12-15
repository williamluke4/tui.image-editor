/**
 * Command class
 * @class
 * @param {{name:function, execute: function, undo: function,
 *          executeCallback: function, undoCallback: function}} actions - Command actions
 * @param {Array} args - passing arguments on execute, undo
 * @ignore
 */
declare class Command {
    name: any;
    args: any;
    executeCallback: any;
    undoCallback: any;
    undoData: any;
    constructor(actions: any, args: any);
    /**
     * Execute action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    execute(): void;
    /**
     * Undo action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    undo(): void;
    /**
     * Attach execute callabck
     * @param {function} callback - Callback after execution
     * @returns {Command} this
     */
    setExecuteCallback(callback: any): this;
    /**
     * Attach undo callback
     * @param {function} callback - Callback after undo
     * @returns {Command} this
     */
    setUndoCallback(callback: any): this;
}
export default Command;
