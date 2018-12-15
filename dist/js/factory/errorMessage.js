"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Error-message factory
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var util_1 = require("../util");
var types = util_1.keyMirror('UN_IMPLEMENTATION', 'NO_COMPONENT_NAME');
var messages = {
    UN_IMPLEMENTATION: 'Should implement a method: ',
    NO_COMPONENT_NAME: 'Should set a component name'
};
var map = {
    UN_IMPLEMENTATION: function (methodName) {
        return messages.UN_IMPLEMENTATION + methodName;
    },
    NO_COMPONENT_NAME: function () {
        return messages.NO_COMPONENT_NAME;
    }
};
exports.default = {
    types: tui_code_snippet_1.default.extend({}, types),
    create: function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        type = type.toLowerCase();
        var func = map[type];
        return func.apply(void 0, args);
    }
};
//# sourceMappingURL=errorMessage.js.map