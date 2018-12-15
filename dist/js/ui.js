"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tui_code_snippet_1 = require("tui-code-snippet");
var util = require("./util");
var mainContainer_1 = require("./ui/template/mainContainer");
var controls_1 = require("./ui/template/controls");
var theme_1 = require("./ui/theme/theme");
var shape_1 = require("./ui/shape");
var crop_1 = require("./ui/crop");
var flip_1 = require("./ui/flip");
var rotate_1 = require("./ui/rotate");
var text_1 = require("./ui/text");
var mask_1 = require("./ui/mask");
var icon_1 = require("./ui/icon");
var draw_1 = require("./ui/draw");
var filter_1 = require("./ui/filter");
var SUB_UI_COMPONENT = {
    Shape: shape_1.default,
    Crop: crop_1.default,
    Flip: flip_1.default,
    Rotate: rotate_1.default,
    Text: text_1.default,
    Mask: mask_1.default,
    Icon: icon_1.default,
    Draw: draw_1.default,
    Filter: filter_1.default
};
var BI_EXPRESSION_MINSIZE_WHEN_TOP_POSITION = '1300';
/**
 * Ui class
 * @class
 * @param {string|jQuery|HTMLElement} element - Wrapper's element or selector
 * @param {Object} [options] - Ui setting options
 *   @param {number} option.loadImage - Init default load image
 *   @param {number} option.initMenu - Init start menu
 *   @param {Boolean} [option.menuBarPosition=bottom] - Let
 *   @param {Boolean} [option.applyCropSelectionStyle=false] - Let
 *   @param {Object} [options.uiSize] - ui size of editor
 *     @param {string} options.uiSize.width - width of ui
 *     @param {string} options.uiSize.height - height of ui
 * @param {Objecdt} actions - ui action instance
 */
var Ui = /** @class */ (function () {
    function Ui(element, options, actions) {
        this.options = this._initializeOption(options);
        this._actions = actions;
        this.submenu = false;
        this.imageSize = {};
        this.uiSize = {};
        this.theme = new theme_1.default(this.options.theme);
        this._submenuChangeTransection = false;
        this._selectedElement = null;
        this._mainElement = null;
        this._editorElementWrap = null;
        this._editorElement = null;
        this._menuElement = null;
        this._subMenuElement = null;
        this._makeUiElement(element);
        this._setUiSize();
        this._initMenuEvent = false;
        this._els = {
            'undo': this._menuElement.querySelector('#tie-btn-undo'),
            'redo': this._menuElement.querySelector('#tie-btn-redo'),
            'reset': this._menuElement.querySelector('#tie-btn-reset'),
            'delete': this._menuElement.querySelector('#tie-btn-delete'),
            'deleteAll': this._menuElement.querySelector('#tie-btn-delete-all'),
            'download': this._selectedElement.querySelectorAll('.tui-image-editor-download-btn'),
            'load': this._selectedElement.querySelectorAll('.tui-image-editor-load-btn')
        };
        this._makeSubMenu();
    }
    /**
     * Set Default Selection for includeUI
     * @param {Object} option - imageEditor options
     * @returns {Object} - extends selectionStyle option
     * @ignore
     */
    Ui.prototype.setUiDefaultSelectionStyle = function (option) {
        return tui_code_snippet_1.default.extend({
            applyCropSelectionStyle: true,
            applyGroupSelectionStyle: true,
            selectionStyle: {
                cornerStyle: 'circle',
                cornerSize: 16,
                cornerColor: '#fff',
                cornerStrokeColor: '#fff',
                transparentCorners: false,
                lineWidth: 2,
                borderColor: '#fff'
            }
        }, option);
    };
    /**
     * Change editor size
     * @param {Object} resizeInfo - ui & image size info
     *   @param {Object} resizeInfo.uiSize - image size dimension
     *     @param {Number} resizeInfo.uiSize.width - ui width
     *     @param {Number} resizeInfo.uiSize.height - ui height
     *   @param {Object} resizeInfo.imageSize - image size dimension
     *     @param {Number} resizeInfo.imageSize.oldWidth - old width
     *     @param {Number} resizeInfo.imageSize.oldHeight - old height
     *     @param {Number} resizeInfo.imageSize.newWidth - new width
     *     @param {Number} resizeInfo.imageSize.newHeight - new height
     * @example
     * // Change the image size and ui size, and change the affected ui state together.
     * imageEditor.ui.resizeEditor({
     *     imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 700, newHeight: 700},
     *     uiSize: {width: 1000, height: 1000}
     * });
     * @example
     * // Apply the ui state while preserving the previous attribute (for example, if responsive Ui)
     * imageEditor.ui.resizeEditor();
     */
    Ui.prototype.resizeEditor = function (_a) {
        var _b = _a === void 0 ? {} : _a, uiSize = _b.uiSize, _c = _b.imageSize, imageSize = _c === void 0 ? this.imageSize : _c;
        if (imageSize !== this.imageSize) {
            this.imageSize = imageSize;
        }
        if (uiSize) {
            this._setUiSize(uiSize);
        }
        var _d = this._getEditorDimension(), width = _d.width, height = _d.height;
        var editorElementStyle = this._editorElement.style;
        var menuBarPosition = this.options.menuBarPosition;
        editorElementStyle.height = height + "px";
        editorElementStyle.width = width + "px";
        this._setEditorPosition(menuBarPosition);
        this._editorElementWrap.style.bottom = "0px";
        this._editorElementWrap.style.top = "0px";
        this._editorElementWrap.style.left = "0px";
        this._editorElementWrap.style.width = "100%";
        var selectElementClassList = this._selectedElement.classList;
        if (menuBarPosition === 'top' && this._selectedElement.offsetWidth < BI_EXPRESSION_MINSIZE_WHEN_TOP_POSITION) {
            selectElementClassList.add('tui-image-editor-top-optimization');
        }
        else {
            selectElementClassList.remove('tui-image-editor-top-optimization');
        }
    };
    /**
     * Change undo button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    Ui.prototype.changeUndoButtonStatus = function (enableStatus) {
        if (enableStatus) {
            this._els.undo.classList.add('enabled');
        }
        else {
            this._els.undo.classList.remove('enabled');
        }
    };
    /**
     * Change redo button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    Ui.prototype.changeRedoButtonStatus = function (enableStatus) {
        if (enableStatus) {
            this._els.redo.classList.add('enabled');
        }
        else {
            this._els.redo.classList.remove('enabled');
        }
    };
    /**
     * Change reset button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    Ui.prototype.changeResetButtonStatus = function (enableStatus) {
        if (enableStatus) {
            this._els.reset.classList.add('enabled');
        }
        else {
            this._els.reset.classList.remove('enabled');
        }
    };
    /**
     * Change delete-all button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    Ui.prototype.changeDeleteAllButtonEnabled = function (enableStatus) {
        if (enableStatus) {
            this._els.deleteAll.classList.add('enabled');
        }
        else {
            this._els.deleteAll.classList.remove('enabled');
        }
    };
    /**
     * Change delete button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    Ui.prototype.changeDeleteButtonEnabled = function (enableStatus) {
        if (enableStatus) {
            this._els['delete'].classList.add('enabled');
        }
        else {
            this._els['delete'].classList.remove('enabled');
        }
    };
    /**
     * Change delete button status
     * @param {Object} [options] - Ui setting options
     *   @param {number} option.loadImage - Init default load image
     *   @param {number} option.initMenu - Init start menu
     *   @param {Boolean} [option.menuBarPosition=bottom] - Let
     *   @param {Boolean} [option.applyCropSelectionStyle=false] - Let
     * @returns {Object} initialize option
     * @private
     */
    Ui.prototype._initializeOption = function (options) {
        return tui_code_snippet_1.default.extend({
            loadImage: {
                path: '',
                name: ''
            },
            menuIconPath: '',
            menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
            initMenu: false,
            uiSize: {
                width: '100%',
                height: '100%'
            },
            menuBarPosition: 'bottom'
        }, options);
    };
    /**
     * Set ui container size
     * @param {Object} uiSize - ui dimension
     *   @param {number} width - width
     *   @param {number} height - height
     * @private
     */
    Ui.prototype._setUiSize = function (uiSize) {
        if (uiSize === void 0) { uiSize = this.options.uiSize; }
        var elementDimension = this._selectedElement.style;
        elementDimension.width = uiSize.width;
        elementDimension.height = uiSize.height;
    };
    /**
     * Make submenu dom element
     * @private
     */
    Ui.prototype._makeSubMenu = function () {
        var _this = this;
        tui_code_snippet_1.default.forEach(this.options.menu, function (menuName) {
            var SubComponentClass = SUB_UI_COMPONENT[menuName.replace(/^[a-z]/, function ($0) { return $0.toUpperCase(); })];
            // make menu element
            _this._makeMenuElement(menuName);
            // menu btn element
            _this._els[menuName] = _this._menuElement.querySelector("#tie-btn-" + menuName);
            // submenu ui instance
            _this[menuName] = new SubComponentClass(_this._subMenuElement, {
                iconStyle: _this.theme.getStyle('submenu.icon'),
                menuBarPosition: _this.options.menuBarPosition
            });
        });
    };
    /**
     * Make primary ui dom element
     * @param {string|jQuery|HTMLElement} element - Wrapper's element or selector
     * @private
     */
    Ui.prototype._makeUiElement = function (element) {
        var selectedElement;
        window.snippet = tui_code_snippet_1.default;
        if (element.jquery) {
            selectedElement = element[0];
        }
        else if (element.nodeType) {
            selectedElement = element;
        }
        else {
            selectedElement = document.querySelector(element);
        }
        var selector = util.getSelector(selectedElement);
        selectedElement.classList.add('tui-image-editor-container');
        selectedElement.innerHTML = controls_1.default({
            biImage: this.theme.getStyle('common.bi'),
            iconStyle: this.theme.getStyle('menu.icon'),
            loadButtonStyle: this.theme.getStyle('loadButton'),
            downloadButtonStyle: this.theme.getStyle('downloadButton')
        }) +
            mainContainer_1.default({
                biImage: this.theme.getStyle('common.bi'),
                commonStyle: this.theme.getStyle('common'),
                headerStyle: this.theme.getStyle('header'),
                loadButtonStyle: this.theme.getStyle('loadButton'),
                downloadButtonStyle: this.theme.getStyle('downloadButton'),
                submenuStyle: this.theme.getStyle('submenu')
            });
        this._selectedElement = selectedElement;
        this._selectedElement.classList.add(this.options.menuBarPosition);
        this._mainElement = selector('.tui-image-editor-main');
        this._editorElementWrap = selector('.tui-image-editor-wrap');
        this._editorElement = selector('.tui-image-editor');
        this._menuElement = selector('.tui-image-editor-menu');
        this._subMenuElement = selector('.tui-image-editor-submenu');
    };
    /**
     * Make menu ui dom element
     * @param {string} menuName - menu name
     * @private
     */
    Ui.prototype._makeMenuElement = function (menuName) {
        var btnElement = document.createElement('li');
        var _a = this.theme.getStyle('menu.icon'), normal = _a.normal, active = _a.active, hover = _a.hover;
        var menuItemHtml = "\n            <svg class=\"svg_ic-menu\">\n                <use xlink:href=\"" + normal.path + "#" + normal.name + "-ic-" + menuName + "\" class=\"normal\"/>\n                <use xlink:href=\"" + active.path + "#" + active.name + "-ic-" + menuName + "\" class=\"active\"/>\n                <use xlink:href=\"" + hover.path + "#" + hover.name + "-ic-" + menuName + "\" class=\"hover\"/>\n            </svg>\n        ";
        btnElement.id = "tie-btn-" + menuName;
        btnElement.className = 'tui-image-editor-item normal';
        btnElement.title = menuName.replace(/^[a-z]/g, function ($0) { return $0.toUpperCase(); });
        btnElement.innerHTML = menuItemHtml;
        this._menuElement.appendChild(btnElement);
    };
    /**
     * Add help action event
     * @param {string} helpName - help menu name
     * @private
     */
    Ui.prototype._addHelpActionEvent = function (helpName) {
        var _this = this;
        this._els[helpName].addEventListener('click', function () {
            _this._actions.main[helpName]();
        });
    };
    /**
     * Add download event
     * @private
     */
    Ui.prototype._addDownloadEvent = function () {
        var _this = this;
        tui_code_snippet_1.default.forEach(this._els.download, function (element) {
            element.addEventListener('click', function () {
                _this._actions.main.download();
            });
        });
    };
    /**
     * Add load event
     * @private
     */
    Ui.prototype._addLoadEvent = function () {
        var _this = this;
        tui_code_snippet_1.default.forEach(this._els.load, function (element) {
            element.addEventListener('change', function (event) {
                _this._actions.main.load(event.target.files[0]);
            });
        });
    };
    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */
    Ui.prototype._addMenuEvent = function (menuName) {
        var _this = this;
        this._els[menuName].addEventListener('click', function () {
            _this.changeMenu(menuName);
        });
    };
    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */
    Ui.prototype._addSubMenuEvent = function (menuName) {
        this[menuName].addEvent(this._actions[menuName]);
    };
    /**
     * get editor area element
     * @returns {HTMLElement} editor area html element
     * @ignore
     */
    Ui.prototype.getEditorArea = function () {
        return this._editorElement;
    };
    /**
     * Add event for menu items
     * @ignore
     */
    Ui.prototype.activeMenuEvent = function () {
        var _this = this;
        if (this._initMenuEvent) {
            return;
        }
        this._addHelpActionEvent('undo');
        this._addHelpActionEvent('redo');
        this._addHelpActionEvent('reset');
        this._addHelpActionEvent('delete');
        this._addHelpActionEvent('deleteAll');
        this._addDownloadEvent();
        tui_code_snippet_1.default.forEach(this.options.menu, function (menuName) {
            _this._addMenuEvent(menuName);
            _this._addSubMenuEvent(menuName);
        });
        this._initMenu();
        this._initMenuEvent = true;
    };
    /**
     * Init canvas
     * @ignore
     */
    Ui.prototype.initCanvas = function () {
        var _this = this;
        var loadImageInfo = this._getLoadImage();
        if (loadImageInfo.path) {
            this._actions.main.initLoadImage(loadImageInfo.path, loadImageInfo.name).then(function () {
                _this.activeMenuEvent();
            });
        }
        this._addLoadEvent();
        var gridVisual = document.createElement('div');
        gridVisual.className = 'tui-image-editor-grid-visual';
        var grid = "<table>\n           <tr><td class=\"dot left-top\"></td><td></td><td class=\"dot right-top\"></td></tr>\n           <tr><td></td><td></td><td></td></tr>\n           <tr><td class=\"dot left-bottom\"></td><td></td><td class=\"dot right-bottom\"></td></tr>\n         </table>";
        gridVisual.innerHTML = grid;
        this._editorContainerElement = this._editorElement.querySelector('.tui-image-editor-canvas-container');
        this._editorContainerElement.appendChild(gridVisual);
    };
    /**
     * get editor area element
     * @returns {Object} load image option
     * @private
     */
    Ui.prototype._getLoadImage = function () {
        return this.options.loadImage;
    };
    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toogle or not
     * @param {boolean} discardSelection - discard selection
     * @ignore
     */
    Ui.prototype.changeMenu = function (menuName, toggle, discardSelection) {
        if (toggle === void 0) { toggle = true; }
        if (discardSelection === void 0) { discardSelection = true; }
        if (!this._submenuChangeTransection) {
            this._submenuChangeTransection = true;
            this._changeMenu(menuName, toggle, discardSelection);
            this._submenuChangeTransection = false;
        }
    };
    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toogle or not
     * @param {boolean} discardSelection - discard selection
     * @private
     */
    Ui.prototype._changeMenu = function (menuName, toggle, discardSelection) {
        if (this.submenu) {
            this._els[this.submenu].classList.remove('active');
            this._mainElement.classList.remove("tui-image-editor-menu-" + this.submenu);
            if (discardSelection) {
                this._actions.main.discardSelection();
            }
            this._actions.main.changeSelectableAll(true);
            this[this.submenu].changeStandbyMode();
        }
        if (this.submenu === menuName && toggle) {
            this.submenu = null;
        }
        else {
            this._els[menuName].classList.add('active');
            this._mainElement.classList.add("tui-image-editor-menu-" + menuName);
            this.submenu = menuName;
            this[this.submenu].changeStartMode();
        }
        this.resizeEditor();
    };
    /**
     * Init menu
     * @private
     */
    Ui.prototype._initMenu = function () {
        if (this.options.initMenu) {
            var evt = document.createEvent('MouseEvents');
            evt.initEvent('click', true, false);
            this._els[this.options.initMenu].dispatchEvent(evt);
            if (this.icon) {
                this.icon.registDefaultIcon();
            }
        }
    };
    /**
     * Get editor dimension
     * @returns {Object} - width & height of editor
     * @private
     */
    Ui.prototype._getEditorDimension = function () {
        var maxHeight = parseFloat(this._editorContainerElement.style.maxHeight);
        var height = (this.imageSize.newHeight > maxHeight) ? maxHeight : this.imageSize.newHeight;
        var maxWidth = parseFloat(this._editorContainerElement.style.maxWidth);
        var width = (this.imageSize.newWidth > maxWidth) ? maxWidth : this.imageSize.newWidth;
        return {
            width: width,
            height: height
        };
    };
    /**
     * Set editor position
     * @param {string} menuBarPosition - top or right or bottom or left
     * @private
     */
    Ui.prototype._setEditorPosition = function (menuBarPosition) {
        var _a = this._getEditorDimension(), width = _a.width, height = _a.height;
        var editorElementStyle = this._editorElement.style;
        var top = 0;
        var left = 0;
        if (this.submenu) {
            if (menuBarPosition === 'bottom') {
                if (height > this._editorElementWrap.scrollHeight - 150) {
                    top = (height - this._editorElementWrap.scrollHeight) / 2;
                }
                else {
                    top = (150 / 2) * -1;
                }
            }
            else if (menuBarPosition === 'top') {
                if (height > this._editorElementWrap.offsetHeight - 150) {
                    top = (150 / 2) - ((height - (this._editorElementWrap.offsetHeight - 150)) / 2);
                }
                else {
                    top = 150 / 2;
                }
            }
            else if (menuBarPosition === 'left') {
                if (width > this._editorElementWrap.offsetWidth - 248) {
                    left = (248 / 2) - ((width - (this._editorElementWrap.offsetWidth - 248)) / 2);
                }
                else {
                    left = 248 / 2;
                }
            }
            else if (menuBarPosition === 'right') {
                if (width > this._editorElementWrap.scrollWidth - 248) {
                    left = (width - this._editorElementWrap.scrollWidth) / 2;
                }
                else {
                    left = (248 / 2) * -1;
                }
            }
        }
        editorElementStyle.top = top + "px";
        editorElementStyle.left = left + "px";
    };
    return Ui;
}());
exports.default = Ui;
//# sourceMappingURL=ui.js.map