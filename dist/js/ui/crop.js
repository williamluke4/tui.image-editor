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
var crop_1 = require("./template/submenu/crop");
/**
 * Crop ui class
 * @class
 * @ignore
 */
var Crop = /** @class */ (function (_super) {
    __extends(Crop, _super);
    function Crop(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'crop',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: crop_1.default
        }) || this;
        _this.status = 'active';
        _this._els = {
            apply: _this.selector('#tie-crop-button .apply'),
            cancel: _this.selector('#tie-crop-button .cancel'),
            preset: _this.selector('#tie-crop-preset-button')
        };
        _this.defaultPresetButton = _this._els.preset.querySelector('.preset-none');
        return _this;
    }
    /**
     * Add event for crop
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.crop - crop action
     *   @param {Function} actions.cancel - cancel action
     *   @param {Function} actions.preset - draw rectzone at a predefined ratio
     */
    Crop.prototype.addEvent = function (actions) {
        var _this = this;
        this.actions = actions;
        this._els.apply.addEventListener('click', function () {
            _this.actions.crop();
            _this._els.apply.classList.remove('active');
        });
        this._els.cancel.addEventListener('click', function () {
            _this.actions.cancel();
            _this._els.apply.classList.remove('active');
        });
        this._els.preset.addEventListener('click', function (event) {
            var button = event.target.closest('.tui-image-editor-button.preset');
            if (button) {
                var presetType = button.className.match(/preset-[^\s]+/)[0];
                _this._setPresetButtonActive(button);
                _this.actions.preset(presetType);
            }
        });
    };
    /**
     * Executed when the menu starts.
     */
    Crop.prototype.changeStartMode = function () {
        this.actions.modeChange('crop');
    };
    /**
     * Returns the menu to its default state.
     */
    Crop.prototype.changeStandbyMode = function () {
        this.actions.stopDrawingMode();
        this._setPresetButtonActive();
    };
    /**
     * Change apply button status
     * @param {Boolean} enableStatus - apply button status
     */
    Crop.prototype.changeApplyButtonStatus = function (enableStatus) {
        if (enableStatus) {
            this._els.apply.classList.add('active');
        }
        else {
            this._els.apply.classList.remove('active');
        }
    };
    /**
     * Set preset button to active status
     * @param {HTMLElement} button - event target element
     * @private
     */
    Crop.prototype._setPresetButtonActive = function (button) {
        if (button === void 0) { button = this.defaultPresetButton; }
        tui_code_snippet_1.default.forEach([].slice.call(this._els.preset.querySelectorAll('.preset')), function (presetButton) {
            presetButton.classList.remove('active');
        });
        if (button) {
            button.classList.add('active');
        }
    };
    return Crop;
}(submenuBase_1.default));
exports.default = Crop;
//# sourceMappingURL=crop.js.map