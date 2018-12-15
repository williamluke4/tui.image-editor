"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Add an image object
 */
var command_1 = require("../factory/command");
var promise_1 = require("core-js/library/es6/promise");
var consts = require("../consts");
var commandNames = consts.commandNames;
var command = {
    name: commandNames.ADD_IMAGE_OBJECT,
    /**
     * Add an image object
     * @param {Graphics} graphics - Graphics instance
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise}
     */
    execute: function (graphics, imgUrl) {
        var _this = this;
        return graphics.addImageObject(imgUrl).then(function (objectProps) {
            _this.undoData.object = graphics.getObject(objectProps.id);
            return objectProps;
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        graphics.remove(this.undoData.object);
        return promise_1.default.resolve();
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=addImageObject.js.map