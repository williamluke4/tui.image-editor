"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Emboss extending fabric.Image.filters.Convolute
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
/**
 * Emboss object
 * @class Emboss
 * @extends {fabric.Image.filters.Convolute}
 * @ignore
 */
var Emboss = fabric_require_1.default.util.createClass(fabric_require_1.default.Image.filters.Convolute, /** @lends Convolute.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'Emboss',
    /**
     * constructor
     * @override
     */
    initialize: function () {
        var matrix = [
            1, 1, 1,
            1, 0.7, -1,
            -1, -1, -1
        ];
        this.matrix = matrix;
    }
});
exports.default = Emboss;
//# sourceMappingURL=emboss.js.map