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
 * @fileoverview Free drawing module, Set brush
 */
var fabric_require_1 = require("fabric/dist/fabric.require");
var component_1 = require("../interface/component");
var consts = require("../consts");
var eventNames = consts.eventNames;
/**
 * Line
 * @class Line
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(graphics) {
        var _this = _super.call(this, consts.componentNames.LINE, graphics) || this;
        /**
         * Brush width
         * @type {number}
         * @private
         */
        _this._width = 12;
        /**
         * fabric.Color instance for brush color
         * @type {fabric.Color}
         * @private
         */
        _this._oColor = new fabric_require_1.default.Color('rgba(0, 0, 0, 0.5)');
        /**
         * Listeners
         * @type {object.<string, function>}
         * @private
         */
        _this._listeners = {
            mousedown: _this._onFabricMouseDown.bind(_this),
            mousemove: _this._onFabricMouseMove.bind(_this),
            mouseup: _this._onFabricMouseUp.bind(_this)
        };
        return _this;
    }
    /**
     * Start drawing line mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    Line.prototype.start = function (setting) {
        var canvas = this.getCanvas();
        canvas.defaultCursor = 'crosshair';
        canvas.selection = false;
        this.setBrush(setting);
        canvas.forEachObject(function (obj) {
            obj.set({
                evented: false
            });
        });
        canvas.on({
            'mouse:down': this._listeners.mousedown
        });
    };
    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    Line.prototype.setBrush = function (setting) {
        var brush = this.getCanvas().freeDrawingBrush;
        setting = setting || {};
        this._width = setting.width || this._width;
        if (setting.color) {
            this._oColor = new fabric_require_1.default.Color(setting.color);
        }
        brush.width = this._width;
        brush.color = this._oColor.toRgba();
    };
    /**
     * End drawing line mode
     */
    Line.prototype.end = function () {
        var canvas = this.getCanvas();
        canvas.defaultCursor = 'default';
        canvas.selection = true;
        canvas.forEachObject(function (obj) {
            obj.set({
                evented: true
            });
        });
        canvas.off('mouse:down', this._listeners.mousedown);
    };
    /**
     * Mousedown event handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    Line.prototype._onFabricMouseDown = function (fEvent) {
        var canvas = this.getCanvas();
        var pointer = canvas.getPointer(fEvent.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this._line = new fabric_require_1.default.Line(points, {
            stroke: this._oColor.toRgba(),
            strokeWidth: this._width,
            evented: false
        });
        this._line.set(consts.fObjectOptions.SELECTION_STYLE);
        canvas.add(this._line);
        canvas.on({
            'mouse:move': this._listeners.mousemove,
            'mouse:up': this._listeners.mouseup
        });
    };
    /**
     * Mousemove event handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    Line.prototype._onFabricMouseMove = function (fEvent) {
        var canvas = this.getCanvas();
        var pointer = canvas.getPointer(fEvent.e);
        this._line.set({
            x2: pointer.x,
            y2: pointer.y
        });
        this._line.setCoords();
        canvas.renderAll();
    };
    /**
     * Mouseup event handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    Line.prototype._onFabricMouseUp = function () {
        var canvas = this.getCanvas();
        var params = this.graphics.createObjectProperties(this._line);
        this.fire(eventNames.ADD_OBJECT, params);
        this._line = null;
        canvas.off({
            'mouse:move': this._listeners.mousemove,
            'mouse:up': this._listeners.mouseup
        });
    };
    return Line;
}(component_1.default));
exports.default = Line;
//# sourceMappingURL=line.js.map