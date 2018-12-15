"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = require("./tools/range");
var submenuBase_1 = require("./submenuBase");
var rotate_1 = require("./template/submenu/rotate");
var util_1 = require("../util");
var consts_1 = require("../consts");
var CLOCKWISE = 30;
var COUNTERCLOCKWISE = -30;
/**
 * Rotate ui class
 * @class
 * @ignore
 */
var Rotate = /** @class */ (function (_super) {
    __extends(Rotate, _super);
    function Rotate(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'rotate',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: rotate_1.default
        }) || this;
        _this._els = {
            rotateButton: _this.selector('#tie-retate-button'),
            rotateRange: new range_1.default(_this.selector('#tie-rotate-range'), consts_1.defaultRotateRangeValus),
            rotateRangeValue: _this.selector('#tie-ratate-range-value')
        };
        return _this;
    }
    /**
     * Add event for rotate
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.rotate - rotate action
     *   @param {Function} actions.setAngle - set angle action
     */
    Rotate.prototype.addEvent = function (actions) {
        // {rotate, setAngle}
        this.actions = actions;
        this._els.rotateButton.addEventListener('click', this._changeRotateForButton.bind(this));
        this._els.rotateRange.on('change', this._changeRotateForRange.bind(this));
        this._els.rotateRangeValue.setAttribute('readonly', true);
    };
    /**
     * Change rotate for range
     * @param {number} value - angle value
     * @private
     */
    Rotate.prototype._changeRotateForRange = function (value) {
        var angle = util_1.toInteger(value);
        this._els.rotateRangeValue.value = angle;
        this.actions.setAngle(angle);
    };
    /**
     * Change rotate for button
     * @param {object} event - add button event object
     * @private
     */
    Rotate.prototype._changeRotateForButton = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            var rotateType = this.getButtonType(button, ['counterclockwise', 'clockwise']);
            var rotateAngle = {
                clockwise: CLOCKWISE,
                counterclockwise: COUNTERCLOCKWISE
            }[rotateType];
            this.actions.rotate(rotateAngle);
        }
    };
    return Rotate;
}(submenuBase_1.default));
exports.default = Rotate;
//# sourceMappingURL=rotate.js.map