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
var submenuBase_1 = require("./submenuBase");
var icon_1 = require("./template/submenu/icon");
var util_1 = require("../util");
var consts_1 = require("../consts");
/**
 * Icon ui class
 * @class
 * @ignore
 */
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'icon',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: icon_1.default
        }) || this;
        _this.iconType = null;
        _this._iconMap = {};
        _this._els = {
            registIconButton: _this.selector('#tie-icon-image-file'),
            addIconButton: _this.selector('#tie-icon-add-button'),
            iconColorpicker: new colorpicker_1.default(_this.selector('#tie-icon-color'), '#ffbb3b', _this.toggleDirection)
        };
        return _this;
    }
    /**
     * Add event for icon
     * @param {Object} actions - actions for icon
     *   @param {Function} actions.registCustomIcon - register icon
     *   @param {Function} actions.addIcon - add icon
     *   @param {Function} actions.changeColor - change icon color
     */
    Icon.prototype.addEvent = function (actions) {
        this.actions = actions;
        this._els.iconColorpicker.on('change', this._changeColorHandler.bind(this));
        this._els.registIconButton.addEventListener('change', this._registeIconHandler.bind(this));
        this._els.addIconButton.addEventListener('click', this._addIconHandler.bind(this));
    };
    /**
     * Clear icon type
     */
    Icon.prototype.clearIconType = function () {
        this._els.addIconButton.classList.remove(this.iconType);
        this.iconType = null;
    };
    /**
     * Register default icon
     */
    Icon.prototype.registDefaultIcon = function () {
        var _this = this;
        tui_code_snippet_1.default.forEach(consts_1.defaultIconPath, function (path, type) {
            _this.actions.registDefalutIcons(type, path);
        });
    };
    /**
     * Set icon picker color
     * @param {string} iconColor - rgb color string
     */
    Icon.prototype.setIconPickerColor = function (iconColor) {
        this._els.iconColorpicker.color = iconColor;
    };
    /**
     * Returns the menu to its default state.
     */
    Icon.prototype.changeStandbyMode = function () {
        this.clearIconType();
        this.actions.cancelAddIcon();
    };
    /**
     * Change icon color
     * @param {string} color - color for change
     * @private
     */
    Icon.prototype._changeColorHandler = function (color) {
        color = color || 'transparent';
        this.actions.changeColor(color);
    };
    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */
    Icon.prototype._addIconHandler = function (event) {
        var button = event.target.closest('.tui-image-editor-button');
        if (button) {
            var iconType = button.getAttribute('data-icontype');
            var iconColor = this._els.iconColorpicker.color;
            this.actions.discardSelection();
            this.actions.changeSelectableAll(false);
            this._els.addIconButton.classList.remove(this.iconType);
            this._els.addIconButton.classList.add(iconType);
            if (this.iconType === iconType) {
                this.changeStandbyMode();
            }
            else {
                this.actions.addIcon(iconType, iconColor);
                this.iconType = iconType;
            }
        }
    };
    /**
     * register icon
     * @param {object} event - file change event object
     * @private
     */
    Icon.prototype._registeIconHandler = function (event) {
        var imgUrl;
        if (!util_1.isSupportFileApi) {
            alert('This browser does not support file-api');
        }
        var file = event.target.files[0];
        if (file) {
            imgUrl = URL.createObjectURL(file);
            this.actions.registCustomIcon(imgUrl, file);
        }
    };
    return Icon;
}(submenuBase_1.default));
exports.default = Icon;
//# sourceMappingURL=icon.js.map