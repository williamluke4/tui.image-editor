"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Submenu Base Class
 * @class
 * @ignore
 */
var Submenu = /** @class */ (function () {
    function Submenu(subMenuElement, _a) {
        var name = _a.name, iconStyle = _a.iconStyle, menuBarPosition = _a.menuBarPosition, templateHtml = _a.templateHtml;
        this.selector = function (str) { return subMenuElement.querySelector(str); };
        this.menuBarPosition = menuBarPosition;
        this.toggleDirection = menuBarPosition === 'top' ? 'down' : 'up';
        this.colorPickerControls = [];
        this._makeSubMenuElement(subMenuElement, {
            name: name,
            iconStyle: iconStyle,
            templateHtml: templateHtml
        });
    }
    Submenu.prototype.colorPickerChangeShow = function (occurredControl) {
        this.colorPickerControls.forEach(function (pickerControl) {
            if (occurredControl !== pickerControl) {
                pickerControl.hide();
            }
        });
    };
    /**
     * Get butten type
     * @param {HTMLElement} button - event target element
     * @param {array} buttonNames - Array of button names
     * @returns {string} - button type
     */
    Submenu.prototype.getButtonType = function (button, buttonNames) {
        return button.className.match(RegExp("(" + buttonNames.join('|') + ")"))[0];
    };
    /**
     * Get butten type
     * @param {HTMLElement} target - event target element
     * @param {string} removeClass - remove class name
     * @param {string} addClass - add class name
     */
    Submenu.prototype.changeClass = function (target, removeClass, addClass) {
        target.classList.remove(removeClass);
        target.classList.add(addClass);
    };
    /**
     * Interface method whose implementation is optional.
     * Returns the menu to its default state.
     */
    Submenu.prototype.changeStandbyMode = function () { };
    /**
     * Interface method whose implementation is optional.
     * Executed when the menu starts.
     */
    Submenu.prototype.changeStartMode = function () { };
    /**
     * Make submenu dom element
     * @param {HTMLElement} subMenuElement - subment dom element
     * @param {Object} iconStyle -  icon style
     * @private
     */
    Submenu.prototype._makeSubMenuElement = function (subMenuElement, _a) {
        var name = _a.name, iconStyle = _a.iconStyle, templateHtml = _a.templateHtml;
        var iconSubMenu = document.createElement('div');
        iconSubMenu.className = "tui-image-editor-menu-" + name;
        iconSubMenu.innerHTML = templateHtml({ iconStyle: iconStyle });
        subMenuElement.appendChild(iconSubMenu);
    };
    return Submenu;
}());
exports.default = Submenu;
//# sourceMappingURL=submenuBase.js.map