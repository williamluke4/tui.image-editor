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
var colorpicker_1 = require("./tools/colorpicker");
var range_1 = require("./tools/range");
var submenuBase_1 = require("./submenuBase");
var shape_1 = require("./template/submenu/shape");
var util_1 = require("../util");
var consts_1 = require("../consts");
var SHAPE_DEFAULT_OPTION = {
    stroke: '#ffbb3b',
    fill: '',
    strokeWidth: 3
};
/**
 * Shape ui class
 * @class
 * @ignore
 */
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'shape',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: shape_1.default
        }) || this;
        _this.type = null;
        _this.options = SHAPE_DEFAULT_OPTION;
        _this._els = {
            shapeSelectButton: _this.selector('#tie-shape-button'),
            shapeColorButton: _this.selector('#tie-shape-color-button'),
            strokeRange: new range_1.default(_this.selector('#tie-stroke-range'), consts_1.defaultShapeStrokeValus),
            strokeRangeValue: _this.selector('#tie-stroke-range-value'),
            fillColorpicker: new colorpicker_1.default(_this.selector('#tie-color-fill'), '', _this.toggleDirection),
            strokeColorpicker: new colorpicker_1.default(_this.selector('#tie-color-stroke'), '#ffbb3b', _this.toggleDirection)
        };
        _this.colorPickerControls.push(_this._els.fillColorpicker);
        _this.colorPickerControls.push(_this._els.strokeColorpicker);
        return _this;
    }
    /**
     * Add event for shape
     * @param {Object} actions - actions for shape
     *   @param {Function} actions.changeShape - change shape mode
     *   @param {Function} actions.setDrawingShape - set dreawing shape
     */
    Shape.prototype.addEvent = function (actions) {
        this.actions = actions;
        this._els.shapeSelectButton.addEventListener('click', this._changeShapeHandler.bind(this));
        this._els.strokeRange.on('change', this._changeStrokeRangeHandler.bind(this));
        this._els.fillColorpicker.on('change', this._changeFillColorHandler.bind(this));
        this._els.strokeColorpicker.on('change', this._changeStrokeColorHandler.bind(this));
        this._els.fillColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));
        this._els.strokeColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));
        this._els.strokeRangeValue.value = this._els.strokeRange.value;
        this._els.strokeRangeValue.setAttribute('readonly', true);
    };
    /**
     * Set Shape status
     * @param {Object} options - options of shape status
     *   @param {string} strokeWidth - stroke width
     *   @param {string} strokeColor - stroke color
     *   @param {string} fillColor - fill color
     */
    Shape.prototype.setShapeStatus = function (_a) {
        var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, fillColor = _a.fillColor;
        this._els.strokeRange.value = strokeWidth;
        this._els.strokeRange.trigger('change');
        this._els.strokeColorpicker.color = strokeColor;
        this._els.fillColorpicker.color = fillColor;
        this.options.stroke = strokeColor;
        this.options.fill = fillColor;
        this.options.strokeWidth = strokeWidth;
    };
    /**
     * Executed when the menu starts.
     */
    Shape.prototype.changeStartMode = function () {
        this.actions.stopDrawingMode();
    };
    /**
     * Returns the menu to its default state.
     */
    Shape.prototype.changeStandbyMode = function () {
        this.type = null;
        this.actions.changeSelectableAll(true);
        this._els.shapeSelectButton.classList.remove('circle');
        this._els.shapeSelectButton.classList.remove('triangle');
        this._els.shapeSelectButton.classList.remove('rect');
    };
    /**
     * set range stroke max value
     * @param {number} maxValue - expect max value for change
     */
    Shape.prototype.setMaxStrokeValue = function (maxValue) {
        var strokeMaxValue = maxValue;
        if (strokeMaxValue <= 0) {
            strokeMaxValue = consts_1.defaultShapeStrokeValus.max;
        }
        this._els.strokeRange.max = strokeMaxValue;
    };
    /**
     * Set stroke value
     * @param {number} value - expect value for strokeRange change
     */
    Shape.prototype.setStrokeValue = function (value) {
        this._els.strokeRange.value = value;
        this._els.strokeRange.trigger('change');
    };
    /**
     * Get stroke value
     * @returns {number} - stroke range value
     */
    Shape.prototype.getStrokeValue = function () {
        return this._els.strokeRange.value;
    };
    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */
    Shape.prototype._changeShapeHandler = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            this.actions.stopDrawingMode();
            this.actions.discardSelection();
            var shapeType = this.getButtonType(button, ['circle', 'triangle', 'rect']);
            if (this.type === shapeType) {
                this.changeStandbyMode();
                return;
            }
            this.changeStandbyMode();
            this.type = shapeType;
            event.currentTarget.classList.add(shapeType);
            this.actions.changeSelectableAll(false);
            this.actions.modeChange('shape');
        }
    };
    /**
     * Change stroke range
     * @param {number} value - stroke range value
     * @private
     */
    Shape.prototype._changeStrokeRangeHandler = function (value) {
        this.options.strokeWidth = util_1.toInteger(value);
        this._els.strokeRangeValue.value = util_1.toInteger(value);
        this.actions.changeShape({
            strokeWidth: value
        });
        this.actions.setDrawingShape(this.type, this.options);
    };
    /**
     * Change shape color
     * @param {string} color - fill color
     * @private
     */
    Shape.prototype._changeFillColorHandler = function (color) {
        color = color || 'transparent';
        this.options.fill = color;
        this.actions.changeShape({
            fill: color
        });
    };
    /**
     * Change shape stroke color
     * @param {string} color - fill color
     * @private
     */
    Shape.prototype._changeStrokeColorHandler = function (color) {
        color = color || 'transparent';
        this.options.stroke = color;
        this.actions.changeShape({
            stroke: color
        });
    };
    return Shape;
}(submenuBase_1.default));
exports.default = Shape;
//# sourceMappingURL=shape.js.map