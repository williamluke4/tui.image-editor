"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Sharpen extending fabric.Image.filters.Convolute
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
/**
 * Sharpen object
 * @class Sharpen
 * @extends {fabric.Image.filters.Convolute}
 * @ignore
 */
var Sharpen = fabric_require_1.default.util.createClass(fabric_require_1.default.Image.filters.Convolute, /** @lends Convolute.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'Sharpen',
    /**
     * constructor
     * @override
     */
    initialize: function () {
        var matrix = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ];
        this.matrix = matrix;
    }
});
exports.default = Sharpen;
//# sourceMappingURL=sharpen.js.map