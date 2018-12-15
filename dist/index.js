"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./js/polyfill");
var imageEditor_1 = require("./js/imageEditor");
require("./css/index.styl");
// commands
require("./js/command/addIcon");
require("./js/command/addImageObject");
require("./js/command/addObject");
require("./js/command/addShape");
require("./js/command/addText");
require("./js/command/applyFilter");
require("./js/command/changeIconColor");
require("./js/command/changeShape");
require("./js/command/changeText");
require("./js/command/changeTextStyle");
require("./js/command/clearObjects");
require("./js/command/flip");
require("./js/command/loadImage");
require("./js/command/removeFilter");
require("./js/command/removeObject");
require("./js/command/resizeCanvasDimension");
require("./js/command/rotate");
require("./js/command/setObjectProperties");
require("./js/command/setObjectPosition");
exports.default = imageEditor_1.default;
//# sourceMappingURL=index.js.map