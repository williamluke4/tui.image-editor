"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tui_code_snippet_1 = require("tui-code-snippet");
var tui_color_picker_1 = require("tui-color-picker");
var PICKER_COLOR = [
    '#000000',
    '#2a2a2a',
    '#545454',
    '#7e7e7e',
    '#a8a8a8',
    '#d2d2d2',
    '#ffffff',
    '',
    '#ff4040',
    '#ff6518',
    '#ffbb3b',
    '#03bd9e',
    '#00a9ff',
    '#515ce6',
    '#9e5fff',
    '#ff5583'
];
/**
 * Colorpicker control class
 * @class
 * @ignore
 */
var Colorpicker = /** @class */ (function () {
    function Colorpicker(colorpickerElement, defaultColor, toggleDirection) {
        if (defaultColor === void 0) { defaultColor = '#7e7e7e'; }
        if (toggleDirection === void 0) { toggleDirection = 'up'; }
        var title = colorpickerElement.getAttribute('title');
        this._show = false;
        this._colorpickerElement = colorpickerElement;
        this._toggleDirection = toggleDirection;
        this._makePickerButtonElement(colorpickerElement, defaultColor);
        this._makePickerLayerElement(colorpickerElement, title);
        this._color = defaultColor;
        this.picker = tui_color_picker_1.default.create({
            container: this.pickerElement,
            preset: PICKER_COLOR,
            color: defaultColor
        });
        this._addEvent(colorpickerElement);
    }
    Object.defineProperty(Colorpicker.prototype, "color", {
        /**
         * Get color
         * @returns {Number} color value
         */
        get: function () {
            return this._color;
        },
        /**
         * Set color
         * @param {string} color color value
         */
        set: function (color) {
            this._color = color;
            this._changeColorElement(color);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Change color element
     * @param {string} color color value
     * #private
     */
    Colorpicker.prototype._changeColorElement = function (color) {
        if (color) {
            this.colorElement.classList.remove('transparent');
            this.colorElement.style.backgroundColor = color;
        }
        else {
            this.colorElement.style.backgroundColor = '#fff';
            this.colorElement.classList.add('transparent');
        }
    };
    /**
     * Make picker button element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} defaultColor color value
     * @private
     */
    Colorpicker.prototype._makePickerButtonElement = function (colorpickerElement, defaultColor) {
        colorpickerElement.classList.add('tui-image-editor-button');
        this.colorElement = document.createElement('div');
        this.colorElement.className = 'color-picker-value';
        if (defaultColor) {
            this.colorElement.style.backgroundColor = defaultColor;
        }
        else {
            this.colorElement.classList.add('transparent');
        }
    };
    /**
     * Make picker layer element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} title picker title
     * @private
     */
    Colorpicker.prototype._makePickerLayerElement = function (colorpickerElement, title) {
        var label = document.createElement('label');
        var triangle = document.createElement('div');
        this.pickerControl = document.createElement('div');
        this.pickerControl.className = 'color-picker-control';
        this.pickerElement = document.createElement('div');
        this.pickerElement.className = 'color-picker';
        label.innerHTML = title;
        triangle.className = 'triangle';
        this.pickerControl.appendChild(this.pickerElement);
        this.pickerControl.appendChild(triangle);
        colorpickerElement.appendChild(this.pickerControl);
        colorpickerElement.appendChild(this.colorElement);
        colorpickerElement.appendChild(label);
    };
    /**
     * Add event
     * @param {HTMLElement} colorpickerElement color picker element
     * @private
     */
    Colorpicker.prototype._addEvent = function (colorpickerElement) {
        var _this = this;
        this.picker.on('selectColor', function (value) {
            _this._changeColorElement(value.color);
            _this._color = value.color;
            _this.fire('change', value.color);
        });
        colorpickerElement.addEventListener('click', function (event) {
            _this._show = !_this._show;
            _this.pickerControl.style.display = _this._show ? 'block' : 'none';
            _this._setPickerControlPosition();
            _this.fire('changeShow', _this);
            event.stopPropagation();
        });
        document.body.addEventListener('click', function () {
            _this.hide();
        });
    };
    Colorpicker.prototype.hide = function () {
        this._show = false;
        this.pickerControl.style.display = 'none';
    };
    /**
     * Set picker control position
     * @private
     */
    Colorpicker.prototype._setPickerControlPosition = function () {
        var controlStyle = this.pickerControl.style;
        var halfPickerWidth = (this._colorpickerElement.clientWidth / 2) + 2;
        var left = (this.pickerControl.offsetWidth / 2) - halfPickerWidth;
        var top = (this.pickerControl.offsetHeight + 10) * -1;
        if (this._toggleDirection === 'down') {
            top = 30;
        }
        controlStyle.top = top + "px";
        controlStyle.left = "-" + left + "px";
    };
    return Colorpicker;
}());
tui_code_snippet_1.default.CustomEvents.mixin(Colorpicker);
exports.default = Colorpicker;
//# sourceMappingURL=colorpicker.js.map