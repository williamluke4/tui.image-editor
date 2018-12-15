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
var util = require("../util");
var colorpicker_1 = require("./tools/colorpicker");
var range_1 = require("./tools/range");
var submenuBase_1 = require("./submenuBase");
var draw_1 = require("./template/submenu/draw");
var consts_1 = require("../consts");
var DRAW_OPACITY = 0.7;
/**
 * Draw ui class
 * @class
 * @ignore
 */
var Draw = /** @class */ (function (_super) {
    __extends(Draw, _super);
    function Draw(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'draw',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: draw_1.default
        }) || this;
        _this._els = {
            lineSelectButton: _this.selector('#tie-draw-line-select-button'),
            drawColorpicker: new colorpicker_1.default(_this.selector('#tie-draw-color'), '#00a9ff', _this.toggleDirection),
            drawRange: new range_1.default(_this.selector('#tie-draw-range'), consts_1.defaultDrawRangeValus),
            drawRangeValue: _this.selector('#tie-draw-range-value')
        };
        _this.type = null;
        _this.color = _this._els.drawColorpicker.color;
        _this.width = _this._els.drawRange.value;
        return _this;
    }
    /**
     * Add event for draw
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.setDrawMode - set draw mode
     */
    Draw.prototype.addEvent = function (actions) {
        this.actions = actions;
        this._els.lineSelectButton.addEventListener('click', this._changeDrawType.bind(this));
        this._els.drawColorpicker.on('change', this._changeDrawColor.bind(this));
        this._els.drawRange.on('change', this._changeDrawRange.bind(this));
        this._els.drawRangeValue.value = this._els.drawRange.value;
        this._els.drawRangeValue.setAttribute('readonly', true);
    };
    /**
     * set draw mode - action runner
     */
    Draw.prototype.setDrawMode = function () {
        this.actions.setDrawMode(this.type, {
            width: this.width,
            color: util.getRgb(this.color, DRAW_OPACITY)
        });
    };
    /**
     * Returns the menu to its default state.
     */
    Draw.prototype.changeStandbyMode = function () {
        this.type = null;
        this.actions.stopDrawingMode();
        this.actions.changeSelectableAll(true);
        this._els.lineSelectButton.classList.remove('free');
        this._els.lineSelectButton.classList.remove('line');
    };
    /**
     * Executed when the menu starts.
     */
    Draw.prototype.changeStartMode = function () {
        this.type = 'free';
        this._els.lineSelectButton.classList.add('free');
        this.setDrawMode();
    };
    /**
     * Change draw type event
     * @param {object} event - line select event
     * @private
     */
    Draw.prototype._changeDrawType = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            var lineType = this.getButtonType(button, ['free', 'line']);
            this.actions.discardSelection();
            if (this.type === lineType) {
                this.changeStandbyMode();
                return;
            }
            this.changeStandbyMode();
            this.type = lineType;
            this._els.lineSelectButton.classList.add(lineType);
            this.setDrawMode();
        }
    };
    /**
     * Change drawing color
     * @param {string} color - select drawing color
     * @private
     */
    Draw.prototype._changeDrawColor = function (color) {
        this.color = color || 'transparent';
        if (!this.type) {
            this.changeStartMode();
        }
        else {
            this.setDrawMode();
        }
    };
    /**
     * Change drawing Range
     * @param {number} value - select drawing range
     * @private
     */
    Draw.prototype._changeDrawRange = function (value) {
        value = util.toInteger(value);
        this._els.drawRangeValue.value = value;
        this.width = value;
        if (!this.type) {
            this.changeStartMode();
        }
        else {
            this.setDrawMode();
        }
    };
    return Draw;
}(submenuBase_1.default));
exports.default = Draw;
//# sourceMappingURL=draw.js.map