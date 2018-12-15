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
var colorpicker_1 = require("./tools/colorpicker");
var range_1 = require("./tools/range");
var submenuBase_1 = require("./submenuBase");
var filter_1 = require("./template/submenu/filter");
var util_1 = require("../util");
var consts_1 = require("../consts");
var PICKER_CONTROL_HEIGHT = '130px';
var BLEND_OPTIONS = ['add', 'diff', 'subtract', 'multiply', 'screen', 'lighten', 'darken'];
var FILTER_OPTIONS = [
    'grayscale',
    'invert',
    'sepia',
    'sepia2',
    'blur',
    'sharpen',
    'emboss',
    'remove-white',
    'gradient-transparency',
    'brightness',
    'noise',
    'pixelate',
    'color-filter',
    'tint',
    'multiply',
    'blend'
];
/**
 * Filter ui class
 * @class
 * @ignore
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'filter',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: filter_1.default
        }) || this;
        _this.selectBoxShow = false;
        _this.checkedMap = {};
        _this._makeControlElement();
        return _this;
    }
    /**
     * Add event for filter
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.applyFilter - apply filter option
     */
    Filter.prototype.addEvent = function (_a) {
        var _this = this;
        var applyFilter = _a.applyFilter;
        var changeRangeValue = this._changeRangeValue.bind(this, applyFilter);
        tui_code_snippet_1.default.forEach(FILTER_OPTIONS, function (filterName) {
            var filterCheckElement = _this.selector("#tie-" + filterName);
            var filterNameCamelCase = util_1.toCamelCase(filterName);
            _this.checkedMap[filterNameCamelCase] = filterCheckElement;
            filterCheckElement.addEventListener('change', function () { return changeRangeValue(filterNameCamelCase); });
        });
        this._els.removewhiteThresholdRange.on('change', function () { return changeRangeValue('removeWhite'); });
        this._els.removewhiteDistanceRange.on('change', function () { return changeRangeValue('removeWhite'); });
        this._els.gradientTransparencyRange.on('change', function () { return changeRangeValue('gradientTransparency'); });
        this._els.colorfilterThresholeRange.on('change', function () { return changeRangeValue('colorFilter'); });
        this._els.pixelateRange.on('change', function () { return changeRangeValue('pixelate'); });
        this._els.noiseRange.on('change', function () { return changeRangeValue('noise'); });
        this._els.brightnessRange.on('change', function () { return changeRangeValue('brightness'); });
        this._els.blendType.addEventListener('change', function () { return changeRangeValue('blend'); });
        this._els.filterBlendColor.on('change', function () { return changeRangeValue('blend'); });
        this._els.filterMultiplyColor.on('change', function () { return changeRangeValue('multiply'); });
        this._els.tintOpacity.on('change', function () { return changeRangeValue('tint'); });
        this._els.filterTintColor.on('change', function () { return changeRangeValue('tint'); });
        this._els.blendType.addEventListener('click', function (event) { return event.stopPropagation(); });
        this._els.filterMultiplyColor.on('changeShow', this.colorPickerChangeShow.bind(this));
        this._els.filterTintColor.on('changeShow', this.colorPickerChangeShow.bind(this));
        this._els.filterBlendColor.on('changeShow', this.colorPickerChangeShow.bind(this));
    };
    /**
     * Add event for filter
     * @param {Function} applyFilter - actions for firter
     * @param {string} filterName - filter name
     */
    Filter.prototype._changeRangeValue = function (applyFilter, filterName) {
        var apply = this.checkedMap[filterName].checked;
        var type = filterName;
        var checkboxGroup = this.checkedMap[filterName].closest('.tui-image-editor-checkbox-group');
        if (checkboxGroup) {
            if (apply) {
                checkboxGroup.classList.remove('tui-image-editor-disabled');
            }
            else {
                checkboxGroup.classList.add('tui-image-editor-disabled');
            }
        }
        applyFilter(apply, type, this._getFilterOption(type));
    };
    /**
     * Get filter option
     * @param {String} type - filter type
     * @returns {Object} filter option object
     * @private
     */
    Filter.prototype._getFilterOption = function (type) {
        var option = {};
        switch (type) {
            case 'removeWhite':
                option.threshold = util_1.toInteger(this._els.removewhiteThresholdRange.value);
                option.distance = util_1.toInteger(this._els.removewhiteDistanceRange.value);
                break;
            case 'gradientTransparency':
                option.threshold = util_1.toInteger(this._els.gradientTransparencyRange.value);
                break;
            case 'colorFilter':
                option.color = '#FFFFFF';
                option.threshold = this._els.colorfilterThresholeRange.value;
                break;
            case 'pixelate':
                option.blocksize = util_1.toInteger(this._els.pixelateRange.value);
                break;
            case 'noise':
                option.noise = util_1.toInteger(this._els.noiseRange.value);
                break;
            case 'brightness':
                option.brightness = util_1.toInteger(this._els.brightnessRange.value);
                break;
            case 'blend':
                option.color = this._els.filterBlendColor.color;
                option.mode = this._els.blendType.value;
                break;
            case 'multiply':
                option.color = this._els.filterMultiplyColor.color;
                break;
            case 'tint':
                option.color = this._els.filterTintColor.color;
                option.opacity = this._els.tintOpacity.value;
                break;
            default:
                break;
        }
        return option;
    };
    /**
     * Make submenu range and colorpicker control
     * @private
     */
    Filter.prototype._makeControlElement = function () {
        var selector = this.selector;
        this._els = {
            removewhiteThresholdRange: new range_1.default(selector('#tie-removewhite-threshold-range'), consts_1.defaultFilterRangeValus.removewhiteThresholdRange),
            removewhiteDistanceRange: new range_1.default(selector('#tie-removewhite-distance-range'), consts_1.defaultFilterRangeValus.removewhiteDistanceRange),
            gradientTransparencyRange: new range_1.default(selector('#tie-gradient-transparency-range'), consts_1.defaultFilterRangeValus.gradientTransparencyRange),
            brightnessRange: new range_1.default(selector('#tie-brightness-range'), consts_1.defaultFilterRangeValus.brightnessRange),
            noiseRange: new range_1.default(selector('#tie-noise-range'), consts_1.defaultFilterRangeValus.noiseRange),
            pixelateRange: new range_1.default(selector('#tie-pixelate-range'), consts_1.defaultFilterRangeValus.pixelateRange),
            colorfilterThresholeRange: new range_1.default(selector('#tie-colorfilter-threshole-range'), consts_1.defaultFilterRangeValus.colorfilterThresholeRange),
            filterTintColor: new colorpicker_1.default(selector('#tie-filter-tint-color'), '#03bd9e', this.toggleDirection),
            filterMultiplyColor: new colorpicker_1.default(selector('#tie-filter-multiply-color'), '#515ce6', this.toggleDirection),
            filterBlendColor: new colorpicker_1.default(selector('#tie-filter-blend-color'), '#ffbb3b', this.toggleDirection)
        };
        this._els.tintOpacity = this._pickerWithRange(this._els.filterTintColor.pickerControl);
        this._els.blendType = this._pickerWithSelectbox(this._els.filterBlendColor.pickerControl);
        this.colorPickerControls.push(this._els.filterTintColor);
        this.colorPickerControls.push(this._els.filterMultiplyColor);
        this.colorPickerControls.push(this._els.filterBlendColor);
    };
    /**
     * Make submenu control for picker & range mixin
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {Range}
     * @private
     */
    Filter.prototype._pickerWithRange = function (pickerControl) {
        var rangeWrap = document.createElement('div');
        var rangelabel = document.createElement('label');
        var range = document.createElement('div');
        range.id = 'tie-filter-tint-opacity';
        rangelabel.innerHTML = 'Opacity';
        rangeWrap.appendChild(rangelabel);
        rangeWrap.appendChild(range);
        pickerControl.appendChild(rangeWrap);
        pickerControl.style.height = PICKER_CONTROL_HEIGHT;
        return new range_1.default(range, consts_1.defaultFilterRangeValus.tintOpacityRange);
    };
    /**
     * Make submenu control for picker & selectbox
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {HTMLElement}
     * @private
     */
    Filter.prototype._pickerWithSelectbox = function (pickerControl) {
        var selectlistWrap = document.createElement('div');
        var selectlist = document.createElement('select');
        var optionlist = document.createElement('ul');
        selectlistWrap.className = 'tui-image-editor-selectlist-wrap';
        optionlist.className = 'tui-image-editor-selectlist';
        selectlistWrap.appendChild(selectlist);
        selectlistWrap.appendChild(optionlist);
        this._makeSelectOptionList(selectlist);
        pickerControl.appendChild(selectlistWrap);
        pickerControl.style.height = PICKER_CONTROL_HEIGHT;
        this._drawSelectOptionList(selectlist, optionlist);
        this._pickerWithSelectboxForAddEvent(selectlist, optionlist);
        return selectlist;
    };
    /**
     * Make selectbox option list custom style
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */
    Filter.prototype._drawSelectOptionList = function (selectlist, optionlist) {
        var options = selectlist.querySelectorAll('option');
        tui_code_snippet_1.default.forEach(options, function (option) {
            var optionElement = document.createElement('li');
            optionElement.innerHTML = option.innerHTML;
            optionElement.setAttribute('data-item', option.value);
            optionlist.appendChild(optionElement);
        });
    };
    /**
     * custome selectbox custom event
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */
    Filter.prototype._pickerWithSelectboxForAddEvent = function (selectlist, optionlist) {
        var _this = this;
        optionlist.addEventListener('click', function (event) {
            var optionValue = event.target.getAttribute('data-item');
            var fireEvent = document.createEvent('HTMLEvents');
            selectlist.querySelector("[value=\"" + optionValue + "\"]").selected = true;
            fireEvent.initEvent('change', true, true);
            selectlist.dispatchEvent(fireEvent);
            _this.selectBoxShow = false;
            optionlist.style.display = 'none';
        });
        selectlist.addEventListener('mousedown', function (event) {
            event.preventDefault();
            _this.selectBoxShow = !_this.selectBoxShow;
            optionlist.style.display = _this.selectBoxShow ? 'block' : 'none';
            optionlist.setAttribute('data-selectitem', selectlist.value);
            optionlist.querySelector("[data-item='" + selectlist.value + "']").classList.add('active');
        });
    };
    /**
     * Make option list for select control
     * @param {HTMLElement} selectlist - blend option select list element
     * @private
     */
    Filter.prototype._makeSelectOptionList = function (selectlist) {
        tui_code_snippet_1.default.forEach(BLEND_OPTIONS, function (option) {
            var selectOption = document.createElement('option');
            selectOption.setAttribute('value', option);
            selectOption.innerHTML = option.replace(/^[a-z]/, function ($0) { return $0.toUpperCase(); });
            selectlist.appendChild(selectOption);
        });
    };
    return Filter;
}(submenuBase_1.default));
exports.default = Filter;
//# sourceMappingURL=filter.js.map