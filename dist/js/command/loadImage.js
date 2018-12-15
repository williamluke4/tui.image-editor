"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Load a background (main) image
 */
var command_1 = require("../factory/command");
var consts = require("../consts");
var componentNames = consts.componentNames, commandNames = consts.commandNames;
var IMAGE_LOADER = componentNames.IMAGE_LOADER;
var command = {
    name: commandNames.LOAD_IMAGE,
    /**
     * Load a background (main) image
     * @param {Graphics} graphics - Graphics instance
     * @param {string} imageName - Image name
     * @param {string} imgUrl - Image Url
     * @returns {Promise}
     */
    execute: function (graphics, imageName, imgUrl) {
        var loader = graphics.getComponent(IMAGE_LOADER);
        var prevImage = loader.getCanvasImage();
        var prevImageWidth = prevImage ? prevImage.width : 0;
        var prevImageHeight = prevImage ? prevImage.height : 0;
        var objects = graphics.removeAll(true).filter(function (objectItem) { return objectItem.type !== 'cropzone'; });
        objects.forEach(function (objectItem) {
            objectItem.evented = true;
        });
        this.undoData = {
            name: loader.getImageName(),
            image: prevImage,
            objects: objects
        };
        return loader.load(imageName, imgUrl).then(function (newImage) { return ({
            oldWidth: prevImageWidth,
            oldHeight: prevImageHeight,
            newWidth: newImage.width,
            newHeight: newImage.height
        }); });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo: function (graphics) {
        var loader = graphics.getComponent(IMAGE_LOADER);
        var _a = this.undoData, objects = _a.objects, name = _a.name, image = _a.image;
        graphics.removeAll(true);
        graphics.add(objects);
        return loader.load(name, image);
    }
};
command_1.default.register(command);
exports.default = command;
//# sourceMappingURL=loadImage.js.map