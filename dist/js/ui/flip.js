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
var tui_code_snippet_1 = require("tui-code-snippet");
var submenuBase_1 = require("./submenuBase");
var flip_1 = require("./template/submenu/flip");
/**
 * Flip ui class
 * @class
 * @ignore
 */
var Flip = /** @class */ (function (_super) {
    __extends(Flip, _super);
    function Flip(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'flip',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: flip_1.default
        }) || this;
        _this.flipStatus = false;
        _this._els = {
            flipButton: _this.selector('#tie-flip-button')
        };
        return _this;
    }
    /**
     * Add event for flip
     * @param {Object} actions - actions for flip
     *   @param {Function} actions.flip - flip action
     */
    Flip.prototype.addEvent = function (actions) {
        this._actions = actions;
        this._els.flipButton.addEventListener('click', this._changeFlip.bind(this));
    };
    /**
     * change Flip status
     * @param {object} event - change event
     * @private
     */
    Flip.prototype._changeFlip = function (event) {
        var _this = this;
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            var flipType = this.getButtonType(button, ['flipX', 'flipY', 'resetFlip']);
            if (!this.flipStatus && flipType === 'resetFlip') {
                return;
            }
            this._actions.flip(flipType).then(function (flipStatus) {
                var flipClassList = _this._els.flipButton.classList;
                _this.flipStatus = false;
                flipClassList.remove('resetFlip');
                tui_code_snippet_1.default.forEach(['flipX', 'flipY'], function (type) {
                    flipClassList.remove(type);
                    if (flipStatus[type]) {
                        flipClassList.add(type);
                        flipClassList.add('resetFlip');
                        _this.flipStatus = true;
                    }
                });
            });
        }
    };
    return Flip;
}(submenuBase_1.default));
exports.default = Flip;
//# sourceMappingURL=flip.js.map