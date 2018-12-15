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
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Text module
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var util = require("../util");
var events = consts.eventNames;
var defaultStyles = {
    fill: '#000000',
    left: 0,
    top: 0
};
var resetStyles = {
    fill: '#000000',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    textDecoraiton: ''
};
var browser = tui_code_snippet_1.default.browser;
var TEXTAREA_CLASSNAME = 'tui-image-eidtor-textarea';
var TEXTAREA_STYLES = util.makeStyleText({
    position: 'absolute',
    padding: 0,
    display: 'none',
    border: '1px dotted red',
    overflow: 'hidden',
    resize: 'none',
    outline: 'none',
    'border-radius': 0,
    'background-color': 'transparent',
    '-webkit-appearance': 'none',
    'z-index': 9999,
    'white-space': 'pre'
});
var EXTRA_PIXEL_LINEHEIGHT = 0.1;
var DBCLICK_TIME = 500;
/**
 * Text
 * @class Text
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(graphics) {
        var _this = _super.call(this, consts.componentNames.TEXT, graphics) || this;
        /**
         * Default text style
         * @type {Object}
         */
        _this._defaultStyles = defaultStyles;
        /**
         * Selected state
         * @type {boolean}
         */
        _this._isSelected = false;
        /**
         * Selected text object
         * @type {Object}
         */
        _this._selectedObj = {};
        /**
         * Editing text object
         * @type {Object}
         */
        _this._editingObj = {};
        /**
         * Listeners for fabric event
         * @type {Object}
         */
        _this._listeners = {
            mousedown: _this._onFabricMouseDown.bind(_this),
            select: _this._onFabricSelect.bind(_this),
            selectClear: _this._onFabricSelectClear.bind(_this),
            scaling: _this._onFabricScaling.bind(_this)
        };
        /**
         * Textarea element for editing
         * @type {HTMLElement}
         */
        _this._textarea = null;
        /**
         * Ratio of current canvas
         * @type {number}
         */
        _this._ratio = 1;
        /**
         * Last click time
         * @type {Date}
         */
        _this._lastClickTime = (new Date()).getTime();
        /**
         * Text object infos before editing
         * @type {Object}
         */
        _this._editingObjInfos = {};
        /**
         * Previous state of editing
         * @type {boolean}
         */
        _this.isPrevEditing = false;
        /**
         * use itext
         * @type {boolean}
         */
        _this.useItext = graphics.useItext;
        return _this;
    }
    /**
     * Start input text mode
     */
    Text.prototype.start = function () {
        var canvas = this.getCanvas();
        canvas.selection = false;
        canvas.defaultCursor = 'text';
        canvas.on({
            'mouse:down': this._listeners.mousedown,
            'object:selected': this._listeners.select,
            'before:selection:cleared': this._listeners.selectClear,
            'object:scaling': this._listeners.scaling,
            'text:editing': this._listeners.modify
        });
        if (this.useItext) {
            canvas.forEachObject(function (obj) {
                if (obj.type === 'i-text') {
                    obj.set({
                        left: obj.left - (obj.width / 2),
                        top: obj.top - (obj.height / 2),
                        originX: 'left',
                        originY: 'top'
                    });
                }
            });
        }
        else {
            this._createTextarea();
        }
        this.setCanvasRatio();
    };
    /**
     * End input text mode
     */
    Text.prototype.end = function () {
        var canvas = this.getCanvas();
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        if (this.useItext) {
            canvas.forEachObject(function (obj) {
                if (obj.type === 'i-text') {
                    if (obj.text === '') {
                        obj.remove();
                    }
                    else {
                        obj.set({
                            left: obj.left + (obj.width / 2),
                            top: obj.top + (obj.height / 2),
                            originX: 'center',
                            originY: 'center'
                        });
                    }
                }
            });
        }
        else {
            canvas.deactivateAllWithDispatch();
            this._removeTextarea();
        }
        canvas.off({
            'mouse:down': this._listeners.mousedown,
            'object:selected': this._listeners.select,
            'before:selection:cleared': this._listeners.selectClear,
            'object:scaling': this._listeners.scaling,
            'text:editing': this._listeners.modify
        });
    };
    /**
     * Add new text on canvas image
     * @param {string} text - Initial input text
     * @param {Object} options - Options for generating text
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoraiton] Type of line (underline / line-throgh / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     * @returns {Promise}
     */
    Text.prototype.add = function (text, options) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            var canvas = _this.getCanvas();
            var newText = null;
            var selectionStyle = consts.fObjectOptions.SELECTION_STYLE;
            var styles = _this._defaultStyles;
            _this._setInitPos(options.position);
            if (options.styles) {
                styles = tui_code_snippet_1.default.extend(styles, options.styles);
            }
            if (_this.useItext) {
                newText = new fabric_require_1.default.IText(text, styles);
                selectionStyle = tui_code_snippet_1.default.extend({}, selectionStyle, {
                    originX: 'left',
                    originY: 'top'
                });
            }
            else {
                newText = new fabric_require_1.default.Text(text, styles);
            }
            newText.set(selectionStyle);
            newText.on({
                mouseup: _this._onFabricMouseUp.bind(_this)
            });
            canvas.add(newText);
            if (!canvas.getActiveObject()) {
                canvas.setActiveObject(newText);
            }
            _this.isPrevEditing = true;
            resolve(_this.graphics.createObjectProperties(newText));
        });
    };
    /**
     * Change text of activate object on canvas image
     * @param {Object} activeObj - Current selected text object
     * @param {string} text - Changed text
     * @returns {Promise}
     */
    Text.prototype.change = function (activeObj, text) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            activeObj.set('text', text);
            _this.getCanvas().renderAll();
            resolve();
        });
    };
    /**
     * Set style
     * @param {Object} activeObj - Current selected text object
     * @param {Object} styleObj - Initial styles
     *     @param {string} [styleObj.fill] Color
     *     @param {string} [styleObj.fontFamily] Font type for text
     *     @param {number} [styleObj.fontSize] Size
     *     @param {string} [styleObj.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [styleObj.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [styleObj.textAlign] Type of text align (left / center / right)
     *     @param {string} [styleObj.textDecoraiton] Type of line (underline / line-throgh / overline)
     * @returns {Promise}
     */
    Text.prototype.setStyle = function (activeObj, styleObj) {
        var _this = this;
        return new promise_1.default(function (resolve) {
            tui_code_snippet_1.default.forEach(styleObj, function (val, key) {
                if (activeObj[key] === val) {
                    styleObj[key] = resetStyles[key] || '';
                }
            }, _this);
            activeObj.set(styleObj);
            _this.getCanvas().renderAll();
            resolve();
        });
    };
    /**
     * Get the text
     * @param {Object} activeObj - Current selected text object
     * @returns {String} text
     */
    Text.prototype.getText = function (activeObj) {
        return activeObj.getText();
    };
    /**
     * Set infos of the current selected object
     * @param {fabric.Text} obj - Current selected text object
     * @param {boolean} state - State of selecting
     */
    Text.prototype.setSelectedInfo = function (obj, state) {
        this._selectedObj = obj;
        this._isSelected = state;
    };
    /**
     * Whether object is selected or not
     * @returns {boolean} State of selecting
     */
    Text.prototype.isSelected = function () {
        return this._isSelected;
    };
    /**
     * Get current selected text object
     * @returns {fabric.Text} Current selected text object
     */
    Text.prototype.getSelectedObj = function () {
        return this._selectedObj;
    };
    /**
     * Set ratio value of canvas
     */
    Text.prototype.setCanvasRatio = function () {
        var canvasElement = this.getCanvasElement();
        var cssWidth = parseInt(canvasElement.style.maxWidth, 10);
        var originWidth = canvasElement.width;
        var ratio = originWidth / cssWidth;
        this._ratio = ratio;
    };
    /**
     * Get ratio value of canvas
     * @returns {number} Ratio value
     */
    Text.prototype.getCanvasRatio = function () {
        return this._ratio;
    };
    /**
     * Set initial position on canvas image
     * @param {{x: number, y: number}} [position] - Selected position
     * @private
     */
    Text.prototype._setInitPos = function (position) {
        position = position || this.getCanvasImage().getCenterPoint();
        this._defaultStyles.left = position.x;
        this._defaultStyles.top = position.y;
    };
    /**
     * Create textarea element on canvas container
     * @private
     */
    Text.prototype._createTextarea = function () {
        var container = this.getCanvasElement().parentNode;
        var textarea = document.createElement('textarea');
        textarea.className = TEXTAREA_CLASSNAME;
        textarea.setAttribute('style', TEXTAREA_STYLES);
        textarea.setAttribute('wrap', 'off');
        container.appendChild(textarea);
        this._textarea = textarea;
        this._listeners = tui_code_snippet_1.default.extend(this._listeners, {
            input: this._onInput.bind(this),
            keydown: this._onKeyDown.bind(this),
            blur: this._onBlur.bind(this),
            scroll: this._onScroll.bind(this)
        });
        if (browser.msie && browser.version === 9) {
            fabric_require_1.default.util.addListener(textarea, 'keydown', this._listeners.keydown);
        }
        else {
            fabric_require_1.default.util.addListener(textarea, 'input', this._listeners.input);
        }
        fabric_require_1.default.util.addListener(textarea, 'blur', this._listeners.blur);
        fabric_require_1.default.util.addListener(textarea, 'scroll', this._listeners.scroll);
    };
    /**
     * Remove textarea element on canvas container
     * @private
     */
    Text.prototype._removeTextarea = function () {
        var container = this.getCanvasElement().parentNode;
        var textarea = container.querySelector('textarea');
        container.removeChild(textarea);
        this._textarea = null;
        if (browser.msie && browser.version < 10) {
            fabric_require_1.default.util.removeListener(textarea, 'keydown', this._listeners.keydown);
        }
        else {
            fabric_require_1.default.util.removeListener(textarea, 'input', this._listeners.input);
        }
        fabric_require_1.default.util.removeListener(textarea, 'blur', this._listeners.blur);
        fabric_require_1.default.util.removeListener(textarea, 'scroll', this._listeners.scroll);
    };
    /**
     * Input event handler
     * @private
     */
    Text.prototype._onInput = function () {
        var ratio = this.getCanvasRatio();
        var obj = this._editingObj;
        var textareaStyle = this._textarea.style;
        textareaStyle.width = Math.ceil(obj.getWidth() / ratio) + "px";
        textareaStyle.height = Math.ceil(obj.getHeight() / ratio) + "px";
    };
    /**
     * Keydown event handler
     * @private
     */
    Text.prototype._onKeyDown = function () {
        var _this = this;
        var ratio = this.getCanvasRatio();
        var obj = this._editingObj;
        var textareaStyle = this._textarea.style;
        setTimeout(function () {
            obj.setText(_this._textarea.value);
            textareaStyle.width = Math.ceil(obj.getWidth() / ratio) + "px";
            textareaStyle.height = Math.ceil(obj.getHeight() / ratio) + "px";
        }, 0);
    };
    /**
     * Blur event handler
     * @private
     */
    Text.prototype._onBlur = function () {
        var ratio = this.getCanvasRatio();
        var editingObj = this._editingObj;
        var editingObjInfos = this._editingObjInfos;
        var textContent = this._textarea.value;
        var transWidth = (editingObj.getWidth() / ratio) - (editingObjInfos.width / ratio);
        var transHeight = (editingObj.getHeight() / ratio) - (editingObjInfos.height / ratio);
        if (ratio === 1) {
            transWidth /= 2;
            transHeight /= 2;
        }
        this._textarea.style.display = 'none';
        editingObj.set({
            left: editingObjInfos.left + transWidth,
            top: editingObjInfos.top + transHeight
        });
        if (textContent.length) {
            this.getCanvas().add(editingObj);
            var params = {
                id: tui_code_snippet_1.default.stamp(editingObj),
                type: editingObj.type,
                text: textContent
            };
            this.fire(events.TEXT_CHANGED, params);
        }
    };
    /**
     * Scroll event handler
     * @private
     */
    Text.prototype._onScroll = function () {
        this._textarea.scrollLeft = 0;
        this._textarea.scrollTop = 0;
    };
    /**
     * Fabric scaling event handler
     * @param {fabric.Event} fEvent - Current scaling event on selected object
     * @private
     */
    Text.prototype._onFabricScaling = function (fEvent) {
        var obj = fEvent.target;
        var scalingSize = obj.getFontSize() * obj.getScaleY();
        obj.setFontSize(scalingSize);
        obj.setScaleX(1);
        obj.setScaleY(1);
    };
    /**
     * onSelectClear handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Text.prototype._onFabricSelectClear = function (fEvent) {
        var obj = this.getSelectedObj();
        this.isPrevEditing = true;
        this.setSelectedInfo(fEvent.target, false);
        if (obj) {
            // obj is empty object at initial time, will be set fabric object
            if (obj.text === '') {
                obj.remove();
            }
        }
    };
    /**
     * onSelect handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    Text.prototype._onFabricSelect = function (fEvent) {
        this.isPrevEditing = true;
        this.setSelectedInfo(fEvent.target, true);
    };
    /**
     * Fabric 'mousedown' event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    Text.prototype._onFabricMouseDown = function (fEvent) {
        var obj = fEvent.target;
        if (obj && !obj.isType('text')) {
            return;
        }
        if (this.isPrevEditing) {
            this.isPrevEditing = false;
            return;
        }
        this._fireAddText(fEvent);
    };
    /**
     * Fire 'addText' event if object is not selected.
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    Text.prototype._fireAddText = function (fEvent) {
        var obj = fEvent.target;
        var e = fEvent.e || {};
        var originPointer = this.getCanvas().getPointer(e);
        if (!obj) {
            this.fire(events.ADD_TEXT, {
                originPosition: {
                    x: originPointer.x,
                    y: originPointer.y
                },
                clientPosition: {
                    x: e.clientX || 0,
                    y: e.clientY || 0
                }
            });
        }
    };
    /**
     * Fabric mouseup event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    Text.prototype._onFabricMouseUp = function (fEvent) {
        var newClickTime = (new Date()).getTime();
        if (this._isDoubleClick(newClickTime)) {
            if (!this.useItext) {
                this._changeToEditingMode(fEvent.target);
            }
            this.fire(events.TEXT_EDITING); // fire editing text event
        }
        this._lastClickTime = newClickTime;
    };
    /**
     * Get state of firing double click event
     * @param {Date} newClickTime - Current clicked time
     * @returns {boolean} Whether double clicked or not
     * @private
     */
    Text.prototype._isDoubleClick = function (newClickTime) {
        return (newClickTime - this._lastClickTime < DBCLICK_TIME);
    };
    /**
     * Change state of text object for editing
     * @param {fabric.Text} obj - Text object fired event
     * @private
     */
    Text.prototype._changeToEditingMode = function (obj) {
        var ratio = this.getCanvasRatio();
        var textareaStyle = this._textarea.style;
        this.isPrevEditing = true;
        obj.remove();
        this._editingObj = obj;
        this._textarea.value = obj.getText();
        this._editingObjInfos = {
            left: this._editingObj.getLeft(),
            top: this._editingObj.getTop(),
            width: this._editingObj.getWidth(),
            height: this._editingObj.getHeight()
        };
        textareaStyle.display = 'block';
        textareaStyle.left = obj.oCoords.tl.x / ratio + "px";
        textareaStyle.top = obj.oCoords.tl.y / ratio + "px";
        textareaStyle.width = Math.ceil(obj.getWidth() / ratio) + "px";
        textareaStyle.height = Math.ceil(obj.getHeight() / ratio) + "px";
        textareaStyle.transform = "rotate(" + obj.getAngle() + "deg)";
        textareaStyle.color = obj.getFill();
        textareaStyle['font-size'] = obj.getFontSize() / ratio + "px";
        textareaStyle['font-family'] = obj.getFontFamily();
        textareaStyle['font-style'] = obj.getFontStyle();
        textareaStyle['font-weight'] = obj.getFontWeight();
        textareaStyle['text-align'] = obj.getTextAlign();
        textareaStyle['line-height'] = obj.getLineHeight() + EXTRA_PIXEL_LINEHEIGHT;
        textareaStyle['transform-origin'] = 'left top';
        this._textarea.focus();
    };
    return Text;
}(component_1.default));
exports.default = Text;
//# sourceMappingURL=text.js.map