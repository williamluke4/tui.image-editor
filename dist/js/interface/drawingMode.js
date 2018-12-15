"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview DrawingMode interface
 */
var errorMessage_1 = require("../factory/errorMessage");
var createMessage = errorMessage_1.default.create;
var errorTypes = errorMessage_1.default.types;
/**
 * DrawingMode interface
 * @class
 * @param {string} name - drawing mode name
 * @ignore
 */
var DrawingMode = /** @class */ (function () {
    function DrawingMode(name) {
        /**
         * the name of drawing mode
         * @type {string}
         */
        this.name = name;
    }
    /**
     * Get this drawing mode name;
     * @returns {string} drawing mode name
     */
    DrawingMode.prototype.getName = function () {
        return this.name;
    };
    /**
    * start this drawing mode
    * @param {Object} options - drawing mode options
    * @abstract
    */
    DrawingMode.prototype.start = function () {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'start'));
    };
    /**
     * stop this drawing mode
     * @abstract
     */
    DrawingMode.prototype.stop = function () {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'stop'));
    };
    return DrawingMode;
}());
exports.default = DrawingMode;
//# sourceMappingURL=drawingMode.js.map