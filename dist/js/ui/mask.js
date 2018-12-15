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
var submenuBase_1 = require("./submenuBase");
var util = require("../util");
var mask_1 = require("./template/submenu/mask");
/**
 * Mask ui class
 * @class
 * @ignore
 */
var Mask = /** @class */ (function (_super) {
    __extends(Mask, _super);
    function Mask(subMenuElement, _a) {
        var iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition;
        var _this = _super.call(this, subMenuElement, {
            name: 'mask',
            iconStyle: iconStyle,
            menuBarPosition: menuBarPosition,
            templateHtml: mask_1.default
        }) || this;
        _this._els = {
            applyButton: _this.selector('#tie-mask-apply'),
            maskImageButton: _this.selector('#tie-mask-image-file')
        };
        return _this;
    }
    /**
     * Add event for mask
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.loadImageFromURL - load image action
     *   @param {Function} actions.applyFilter - apply filter action
     */
    Mask.prototype.addEvent = function (actions) {
        this.actions = actions;
        this._els.maskImageButton.addEventListener('change', this._loadMaskFile.bind(this));
        this._els.applyButton.addEventListener('click', this._applyMask.bind(this));
    };
    /**
     * Apply mask
     * @private
     */
    Mask.prototype._applyMask = function () {
        this.actions.applyFilter();
        this._els.applyButton.classList.remove('active');
    };
    /**
     * Load mask file
     * @param {object} event - File change event object
     * @private
     */
    Mask.prototype._loadMaskFile = function (event) {
        var imgUrl;
        if (!util.isSupportFileApi()) {
            alert('This browser does not support file-api');
        }
        var file = event.target.files[0];
        if (file) {
            imgUrl = URL.createObjectURL(file);
            this.actions.loadImageFromURL(imgUrl, file);
            this._els.applyButton.classList.add('active');
        }
    };
    return Mask;
}(submenuBase_1.default));
exports.default = Mask;
//# sourceMappingURL=mask.js.map