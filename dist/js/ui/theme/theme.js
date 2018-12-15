"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tui_code_snippet_1 = require("tui-code-snippet");
var util_1 = require("../../util");
var style_1 = require("../template/style");
var standard_1 = require("./standard");
/**
 * Theme manager
 * @class
 * @param {Object} customTheme - custom theme
 * @ignore
 */
var Theme = /** @class */ (function () {
    function Theme(customTheme) {
        this.styles = this._changeToObject(tui_code_snippet_1.extend(standard_1.default, customTheme));
        util_1.styleLoad(this._styleMaker());
    }
    /**
     * Get a Style cssText or StyleObject
     * @param {string} type - style type
     * @returns {string|object} - cssText or StyleObject
     */
    Theme.prototype.getStyle = function (type) {
        var result = null;
        var firstProperty = type.replace(/\..+$/, '');
        var option = this.styles[type];
        switch (type) {
            case 'common.bi':
                result = this.styles[type].image;
                break;
            case 'menu.icon':
            case 'submenu.icon':
                result = {
                    active: this.styles[firstProperty + ".activeIcon"],
                    normal: this.styles[firstProperty + ".normalIcon"],
                    hover: this.styles[firstProperty + ".hoverIcon"],
                    disabled: this.styles[firstProperty + ".disabledIcon"]
                };
                break;
            case 'submenu.label':
                result = {
                    active: this._makeCssText(this.styles[firstProperty + ".activeLabel"]),
                    normal: this._makeCssText(this.styles[firstProperty + ".normalLabel"])
                };
                break;
            case 'submenu.partition':
                result = {
                    vertical: this._makeCssText(tui_code_snippet_1.extend({}, option, { borderLeft: "1px solid " + option.color })),
                    horizontal: this._makeCssText(tui_code_snippet_1.extend({}, option, { borderBottom: "1px solid " + option.color }))
                };
                break;
            case 'range.disabledPointer':
            case 'range.disabledBar':
            case 'range.disabledSubbar':
            case 'range.pointer':
            case 'range.bar':
            case 'range.subbar':
                option.backgroundColor = option.color;
                result = this._makeCssText(option);
                break;
            default:
                result = this._makeCssText(option);
                break;
        }
        return result;
    };
    /**
     * Make css resource
     * @returns {string} - serialized css text
     * @private
     */
    Theme.prototype._styleMaker = function () {
        var submenuLabelStyle = this.getStyle('submenu.label');
        var submenuPartitionStyle = this.getStyle('submenu.partition');
        return style_1.default({
            subMenuLabelActive: submenuLabelStyle.active,
            subMenuLabelNormal: submenuLabelStyle.normal,
            submenuPartitionVertical: submenuPartitionStyle.vertical,
            submenuPartitionHorizontal: submenuPartitionStyle.horizontal,
            biSize: this.getStyle('common.bisize'),
            subMenuRangeTitle: this.getStyle('range.title'),
            submenuRangePointer: this.getStyle('range.pointer'),
            submenuRangeBar: this.getStyle('range.bar'),
            submenuRangeSubbar: this.getStyle('range.subbar'),
            submenuDisabledRangePointer: this.getStyle('range.disabledPointer'),
            submenuDisabledRangeBar: this.getStyle('range.disabledBar'),
            submenuDisabledRangeSubbar: this.getStyle('range.disabledSubbar'),
            submenuRangeValue: this.getStyle('range.value'),
            submenuColorpickerTitle: this.getStyle('colorpicker.title'),
            submenuColorpickerButton: this.getStyle('colorpicker.button'),
            submenuCheckbox: this.getStyle('checkbox'),
            menuIconSize: this.getStyle('menu.iconSize'),
            submenuIconSize: this.getStyle('submenu.iconSize')
        });
    };
    /**
     * Change to low dimensional object.
     * @param {object} styleOptions - style object of user interface
     * @returns {object} low level object for style apply
     * @private
     */
    Theme.prototype._changeToObject = function (styleOptions) {
        var styleObject = {};
        tui_code_snippet_1.forEach(styleOptions, function (value, key) {
            var keyExplode = key.match(/^(.+)\.([a-z]+)$/i);
            var property = keyExplode[1], subProperty = keyExplode[2];
            if (!styleObject[property]) {
                styleObject[property] = {};
            }
            styleObject[property][subProperty] = value;
        });
        return styleObject;
    };
    /**
     * Style object to Csstext serialize
     * @param {object} styleObject - style object
     * @returns {string} - css text string
     * @private
     */
    Theme.prototype._makeCssText = function (styleObject) {
        var _this = this;
        var converterStack = [];
        tui_code_snippet_1.forEach(styleObject, function (value, key) {
            if (['backgroundImage'].indexOf(key) > -1 && value !== 'none') {
                value = "url(" + value + ")";
            }
            converterStack.push(_this._toUnderScore(key) + ": " + value);
        });
        return converterStack.join(';');
    };
    /**
     * Camel key string to Underscore string
     * @param {string} targetString - change target
     * @returns {string}
     * @private
     */
    Theme.prototype._toUnderScore = function (targetString) {
        return targetString.replace(/([A-Z])/g, function ($0, $1) { return "-" + $1.toLowerCase(); });
    };
    return Theme;
}());
exports.default = Theme;
//# sourceMappingURL=theme.js.map