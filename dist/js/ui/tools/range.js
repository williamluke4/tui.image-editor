"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tui_code_snippet_1 = require("tui-code-snippet");
var util_1 = require("../../util");
/**
 * Range control class
 * @class
 * @ignore
 */
var Range = /** @class */ (function () {
    function Range(rangeElement, options) {
        if (options === void 0) { options = {}; }
        this._value = options.value || 0;
        this.rangeElement = rangeElement;
        this._drawRangeElement();
        this.rangeWidth = util_1.toInteger(window.getComputedStyle(rangeElement, null).width) - 12;
        this._min = options.min || 0;
        this._max = options.max || 100;
        this._absMax = (this._min * -1) + this._max;
        this.realTimeEvent = options.realTimeEvent || false;
        this._addClickEvent();
        this._addDragEvent();
        this.value = options.value;
        this.trigger('change');
    }
    Object.defineProperty(Range.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Set range max value and re position cursor
         * @param {number} maxValue - max value
         */
        set: function (maxValue) {
            this._max = maxValue;
            this._absMax = (this._min * -1) + this._max;
            this.value = this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "value", {
        /**
         * Get range value
         * @returns {Number} range value
         */
        get: function () {
            return this._value;
        },
        /**
         * Set range value
         * @param {Number} value range value
         * @param {Boolean} fire whether fire custom event or not
         */
        set: function (value) {
            var absValue = value - this._min;
            var leftPosition = (absValue * this.rangeWidth) / this._absMax;
            if (this.rangeWidth < leftPosition) {
                leftPosition = this.rangeWidth;
            }
            this.pointer.style.left = leftPosition + "px";
            this.subbar.style.right = this.rangeWidth - leftPosition + "px";
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * event tirigger
     * @param {string} type - type
     */
    Range.prototype.trigger = function (type) {
        this.fire(type, this._value);
    };
    /**
     * Make range element
     * @private
     */
    Range.prototype._drawRangeElement = function () {
        this.rangeElement.classList.add('tui-image-editor-range');
        this.bar = document.createElement('div');
        this.bar.className = 'tui-image-editor-virtual-range-bar';
        this.subbar = document.createElement('div');
        this.subbar.className = 'tui-image-editor-virtual-range-subbar';
        this.pointer = document.createElement('div');
        this.pointer.className = 'tui-image-editor-virtual-range-pointer';
        this.bar.appendChild(this.subbar);
        this.bar.appendChild(this.pointer);
        this.rangeElement.appendChild(this.bar);
    };
    /**
     * Add Range click event
     * @private
     */
    Range.prototype._addClickEvent = function () {
        var _this = this;
        this.rangeElement.addEventListener('click', function (event) {
            event.stopPropagation();
            if (event.target.className !== 'tui-image-editor-range') {
                return;
            }
            var touchPx = event.offsetX;
            var ratio = touchPx / _this.rangeWidth;
            var value = (_this._absMax * ratio) + _this._min;
            _this.pointer.style.left = ratio * _this.rangeWidth + "px";
            _this.subbar.style.right = (1 - ratio) * _this.rangeWidth + "px";
            _this._value = value;
            _this.fire('change', value);
        });
    };
    /**
     * Add Range drag event
     * @private
     */
    Range.prototype._addDragEvent = function () {
        var _this = this;
        this.pointer.addEventListener('mousedown', function (event) {
            _this.firstPosition = event.screenX;
            _this.firstLeft = util_1.toInteger(_this.pointer.style.left) || 0;
            _this.dragEventHandler = {
                changeAngle: _this._changeAngle.bind(_this),
                stopChangingAngle: _this._stopChangingAngle.bind(_this)
            };
            document.addEventListener('mousemove', _this.dragEventHandler.changeAngle);
            document.addEventListener('mouseup', _this.dragEventHandler.stopChangingAngle);
        });
    };
    /**
     * change angle event
     * @param {object} event - change event
     * @private
     */
    Range.prototype._changeAngle = function (event) {
        var changePosition = event.screenX;
        var diffPosition = changePosition - this.firstPosition;
        var touchPx = this.firstLeft + diffPosition;
        touchPx = touchPx > this.rangeWidth ? this.rangeWidth : touchPx;
        touchPx = touchPx < 0 ? 0 : touchPx;
        this.pointer.style.left = touchPx + "px";
        this.subbar.style.right = this.rangeWidth - touchPx + "px";
        var ratio = touchPx / this.rangeWidth;
        var value = (this._absMax * ratio) + this._min;
        this._value = value;
        if (this.realTimeEvent) {
            this.fire('change', value);
        }
    };
    /**
     * stop change angle event
     * @private
     */
    Range.prototype._stopChangingAngle = function () {
        this.fire('change', this._value);
        document.removeEventListener('mousemove', this.dragEventHandler.changeAngle);
        document.removeEventListener('mouseup', this.dragEventHandler.stopChangingAngle);
    };
    return Range;
}());
tui_code_snippet_1.default.CustomEvents.mixin(Range);
exports.default = Range;
//# sourceMappingURL=range.js.map