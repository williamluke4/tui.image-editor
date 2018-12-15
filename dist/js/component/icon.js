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
 * @fileoverview Add icon module
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var tui_code_snippet_1 = require("tui-code-snippet");
var promise_1 = require("core-js/library/es6/promise");
var component_1 = require("../interface/component");
var consts = require("../consts");
var events = consts.eventNames;
var rejectMessages = consts.rejectMessages;
var pathMap = {
    arrow: 'M 0 90 H 105 V 120 L 160 60 L 105 0 V 30 H 0 Z',
    cancel: 'M 0 30 L 30 60 L 0 90 L 30 120 L 60 90 L 90 120 L 120 90 ' +
        'L 90 60 L 120 30 L 90 0 L 60 30 L 30 0 Z'
};
/**
 * Icon
 * @class Icon
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon(graphics) {
        var _this = _super.call(this, consts.componentNames.ICON, graphics) || this;
        /**
         * Default icon color
         * @type {string}
         */
        _this._oColor = '#000000';
        /**
         * Path value of each icon type
         * @type {Object}
         */
        _this._pathMap = pathMap;
        /**
         * Option to add icon to drag.
         * @type {boolean}
         */
        _this.useDragAddIcon = graphics.useDragAddIcon;
        return _this;
    }
    /**
     * Add icon
     * @param {string} type - Icon type
     * @param {Object} options - Icon options
     *      @param {string} [options.fill] - Icon foreground color
     *      @param {string} [options.left] - Icon x position
     *      @param {string} [options.top] - Icon y position
     * @returns {Promise}
     */
    Icon.prototype.add = function (type, options) {
        var _this = this;
        return new promise_1.default(function (resolve, reject) {
            var canvas = _this.getCanvas();
            var path = _this._pathMap[type];
            var selectionStyle = consts.fObjectOptions.SELECTION_STYLE;
            var registerdIcon = Object.keys(consts.defaultIconPath).indexOf(type) >= 0;
            var useDragAddIcon = _this.useDragAddIcon && registerdIcon;
            var icon = path ? _this._createIcon(path) : null;
            if (!icon) {
                reject(rejectMessages.invalidParameters);
            }
            icon.set(tui_code_snippet_1.default.extend({
                type: 'icon',
                fill: _this._oColor
            }, selectionStyle, options, _this.graphics.controlStyle));
            canvas.add(icon).setActiveObject(icon);
            if (useDragAddIcon) {
                _this._addWithDragEvent(canvas);
            }
            resolve(_this.graphics.createObjectProperties(icon));
        });
    };
    /**
     * Added icon drag event
     * @param {fabric.Canvas} canvas - Canvas instance
     * @private
     */
    Icon.prototype._addWithDragEvent = function (canvas) {
        var _this = this;
        canvas.on({
            'mouse:move': function (fEvent) {
                canvas.selection = false;
                _this.fire(events.ICON_CREATE_RESIZE, {
                    moveOriginPointer: canvas.getPointer(fEvent.e)
                });
            },
            'mouse:up': function (fEvent) {
                _this.fire(events.ICON_CREATE_END, {
                    moveOriginPointer: canvas.getPointer(fEvent.e)
                });
                canvas.defaultCursor = 'default';
                canvas.off('mouse:up');
                canvas.off('mouse:move');
                canvas.selection = true;
            }
        });
    };
    /**
     * Register icon paths
     * @param {{key: string, value: string}} pathInfos - Path infos
     */
    Icon.prototype.registerPaths = function (pathInfos) {
        var _this = this;
        tui_code_snippet_1.default.forEach(pathInfos, function (path, type) {
            _this._pathMap[type] = path;
        }, this);
    };
    /**
     * Set icon object color
     * @param {string} color - Color to set
     * @param {fabric.Path}[obj] - Current activated path object
     */
    Icon.prototype.setColor = function (color, obj) {
        this._oColor = color;
        if (obj && obj.get('type') === 'icon') {
            obj.setFill(this._oColor);
            this.getCanvas().renderAll();
        }
    };
    /**
     * Get icon color
     * @param {fabric.Path}[obj] - Current activated path object
     * @returns {string} color
     */
    Icon.prototype.getColor = function (obj) {
        return obj.fill;
    };
    /**
     * Create icon object
     * @param {string} path - Path value to create icon
     * @returns {fabric.Path} Path object
     */
    Icon.prototype._createIcon = function (path) {
        return new fabric_require_1.default.Path(path);
    };
    return Icon;
}(component_1.default));
exports.default = Icon;
//# sourceMappingURL=icon.js.map