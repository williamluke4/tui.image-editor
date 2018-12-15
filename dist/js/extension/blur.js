"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Blur extending fabric.Image.filters.Convolute
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
/**
 * Blur object
 * @class Blur
 * @extends {fabric.Image.filters.Convolute}
 * @ignore
 */
var Blur = fabric_require_1.default.util.createClass(fabric_require_1.default.Image.filters.Convolute, /** @lends Convolute.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'Blur',
    /**
     * constructor
     * @override
     */
    initialize: function () {
        var matrix = [
            1 / 9, 1 / 9, 1 / 9,
            1 / 9, 1 / 9, 1 / 9,
            1 / 9, 1 / 9, 1 / 9
        ];
        this.matrix = matrix;
    }
});
exports.default = Blur;
//# sourceMappingURL=blur.js.map