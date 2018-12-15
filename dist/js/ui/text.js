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
var colorpicker_1 = require("./tools/colorpicker");
var submenuBase_1 = require("./submenuBase");
var text_1 = require("./template/submenu/text");
var util_1 = require("../util");
var consts_1 = require("../consts");
/**
 * Crop ui class
 * @class
 * @ignore
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'text',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: text_1.default
        }) || this;
        _this.effect = {
            bold: false,
            italic: false,
            underline: false
        };
        _this.align = 'left';
        _this._els = {
            textEffectButton: _this.selector('#tie-text-effect-button'),
            textAlignButton: _this.selector('#tie-text-align-button'),
            textColorpicker: new colorpicker_1.default(_this.selector('#tie-text-color'), '#ffbb3b', _this.toggleDirection),
            textRange: new range_1.default(_this.selector('#tie-text-range'), consts_1.defaultTextRangeValus),
            textRangeValue: _this.selector('#tie-text-range-value')
        };
        return _this;
    }
    /**
     * Add event for text
     * @param {Object} actions - actions for text
     *   @param {Function} actions.changeTextStyle - change text style
     */
    Text.prototype.addEvent = function (actions) {
        this.actions = actions;
        this._els.textEffectButton.addEventListener('click', this._setTextEffectHandler.bind(this));
        this._els.textAlignButton.addEventListener('click', this._setTextAlignHandler.bind(this));
        this._els.textRange.on('change', this._changeTextRnageHandler.bind(this));
        this._els.textRangeValue.value = this._els.textRange.value;
        this._els.textRangeValue.setAttribute('readonly', true);
        this._els.textColorpicker.on('change', this._changeColorHandler.bind(this));
    };
    /**
     * Returns the menu to its default state.
     */
    Text.prototype.changeStandbyMode = function () {
        this.actions.stopDrawingMode();
    };
    /**
     * Executed when the menu starts.
     */
    Text.prototype.changeStartMode = function () {
        this.actions.modeChange('text');
    };
    Object.defineProperty(Text.prototype, "textColor", {
        /**
         * Get text color
         * @returns {string} - text color
         */
        get: function () {
            return this._els.textColorpicker.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Text.prototype, "fontSize", {
        /**
         * Get text size
         * @returns {string} - text size
         */
        get: function () {
            return this._els.textRange.value;
        },
        /**
         * Set text size
         * @param {Number} value - text size
         */
        set: function (value) {
            this._els.textRange.value = value;
            this._els.textRangeValue.value = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */
    Text.prototype._setTextEffectHandler = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        var styleType = button.className.match(/(bold|italic|underline)/)[0];
        var styleObj = {
            'bold': { fontWeight: 'bold' },
            'italic': { fontStyle: 'italic' },
            'underline': { textDecoration: 'underline' }
        }[styleType];
        this.effect[styleType] = !this.effect[styleType];
        button.classList.toggle('active');
        this.actions.changeTextStyle(styleObj);
    };
    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */
    Text.prototype._setTextAlignHandler = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            var styleType = this.getButtonType(button, ['left', 'center', 'right']);
            event.currentTarget.classList.remove(this.align);
            if (this.align !== styleType) {
                event.currentTarget.classList.add(styleType);
            }
            this.actions.changeTextStyle({ textAlign: styleType });
            this.align = styleType;
        }
    };
    /**
     * text align set handler
     * @param {number} value - range value
     * @private
     */
    Text.prototype._changeTextRnageHandler = function (value) {
        value = util_1.toInteger(value);
        if (util_1.toInteger(this._els.textRangeValue.value) !== value) {
            this.actions.changeTextStyle({
                fontSize: value
            });
            this._els.textRangeValue.value = value;
        }
    };
    /**
     * change color handler
     * @param {string} color - change color string
     * @private
     */
    Text.prototype._changeColorHandler = function (color) {
        color = color || 'transparent';
        this.actions.changeTextStyle({
            'fill': color
        });
    };
    return Text;
}(submenuBase_1.default));
exports.default = Text;
//# sourceMappingURL=text.js.map