"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Shape resize helper
 */
var DIVISOR = {
    rect: 1,
    circle: 2,
    triangle: 1
};
var DIMENSION_KEYS = {
    rect: {
        w: 'width',
        h: 'height'
    },
    circle: {
        w: 'rx',
        h: 'ry'
    },
    triangle: {
        w: 'width',
        h: 'height'
    }
};
/**
 * Set the start point value to the shape object
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function setStartPoint(shape) {
    var originX = shape.getOriginX();
    var originY = shape.getOriginY();
    var originKey = originX.substring(0, 1) + originY.substring(0, 1);
    shape.startPoint = shape.origins[originKey];
}
/**
 * Get the positions of ratated origin by the pointer value
 * @param {{x: number, y: number}} origin - Origin value
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {number} angle - Rotating angle
 * @returns {Object} Postions of origin
 * @ignore
 */
function getPositionsOfRotatedOrigin(origin, pointer, angle) {
    var sx = origin.x;
    var sy = origin.y;
    var px = pointer.x;
    var py = pointer.y;
    var r = angle * Math.PI / 180;
    var rx = ((px - sx) * Math.cos(r)) - ((py - sy) * Math.sin(r)) + sx;
    var ry = ((px - sx) * Math.sin(r)) + ((py - sy) * Math.cos(r)) + sy;
    return {
        originX: (sx > rx) ? 'right' : 'left',
        originY: (sy > ry) ? 'bottom' : 'top'
    };
}
/**
 * Whether the shape has the center origin or not
 * @param {fabric.Object} shape - Shape object
 * @returns {boolean} State
 * @ignore
 */
function hasCenterOrigin(shape) {
    return (shape.getOriginX() === 'center' &&
        shape.getOriginY() === 'center');
}
/**
 * Adjust the origin of shape by the start point
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustOriginByStartPoint(pointer, shape) {
    var centerPoint = shape.getPointByOrigin('center', 'center');
    var angle = -shape.getAngle();
    var originPositions = getPositionsOfRotatedOrigin(centerPoint, pointer, angle);
    var originX = originPositions.originX, originY = originPositions.originY;
    var origin = shape.getPointByOrigin(originX, originY);
    var left = shape.getLeft() - (centerPoint.x - origin.x);
    var top = shape.getTop() - (centerPoint.x - origin.y);
    shape.set({
        originX: originX,
        originY: originY,
        left: left,
        top: top
    });
    shape.setCoords();
}
/**
 * Adjust the origin of shape by the moving pointer value
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustOriginByMovingPointer(pointer, shape) {
    var origin = shape.startPoint;
    var angle = -shape.getAngle();
    var originPositions = getPositionsOfRotatedOrigin(origin, pointer, angle);
    var originX = originPositions.originX, originY = originPositions.originY;
    shape.setPositionByOrigin(origin, originX, originY);
}
/**
 * Adjust the dimension of shape on firing scaling event
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustDimensionOnScaling(shape) {
    var type = shape.type, scaleX = shape.scaleX, scaleY = shape.scaleY;
    var dimensionKeys = DIMENSION_KEYS[type];
    var width = shape[dimensionKeys.w] * scaleX;
    var height = shape[dimensionKeys.h] * scaleY;
    if (shape.isRegular) {
        var maxScale = Math.max(scaleX, scaleY);
        width = shape[dimensionKeys.w] * maxScale;
        height = shape[dimensionKeys.h] * maxScale;
    }
    var options = {
        hasControls: false,
        hasBorders: false,
        scaleX: 1,
        scaleY: 1
    };
    options[dimensionKeys.w] = width;
    options[dimensionKeys.h] = height;
    shape.set(options);
}
/**
 * Adjust the dimension of shape on firing mouse move event
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustDimensionOnMouseMove(pointer, shape) {
    var type = shape.type, strokeWidth = shape.strokeWidth, origin = shape.startPoint;
    var divisor = DIVISOR[type];
    var dimensionKeys = DIMENSION_KEYS[type];
    var isTriangle = !!(shape.type === 'triangle');
    var options = {};
    var width = Math.abs(origin.x - pointer.x) / divisor;
    var height = Math.abs(origin.y - pointer.y) / divisor;
    if (width > strokeWidth) {
        width -= strokeWidth / divisor;
    }
    if (height > strokeWidth) {
        height -= strokeWidth / divisor;
    }
    if (shape.isRegular) {
        width = height = Math.max(width, height);
        if (isTriangle) {
            height = Math.sqrt(3) / 2 * width;
        }
    }
    options[dimensionKeys.w] = width;
    options[dimensionKeys.h] = height;
    shape.set(options);
}
exports.default = {
    /**
     * Set each origin value to shape
     * @param {fabric.Object} shape - Shape object
     */
    setOrigins: function (shape) {
        var leftTopPoint = shape.getPointByOrigin('left', 'top');
        var rightTopPoint = shape.getPointByOrigin('right', 'top');
        var rightBottomPoint = shape.getPointByOrigin('right', 'bottom');
        var leftBottomPoint = shape.getPointByOrigin('left', 'bottom');
        shape.origins = {
            lt: leftTopPoint,
            rt: rightTopPoint,
            rb: rightBottomPoint,
            lb: leftBottomPoint
        };
    },
    /**
     * Resize the shape
     * @param {fabric.Object} shape - Shape object
     * @param {{x: number, y: number}} pointer - Mouse pointer values on canvas
     * @param {boolean} isScaling - Whether the resizing action is scaling or not
     */
    resize: function (shape, pointer, isScaling) {
        if (hasCenterOrigin(shape)) {
            adjustOriginByStartPoint(pointer, shape);
            setStartPoint(shape);
        }
        if (isScaling) {
            adjustDimensionOnScaling(shape, pointer);
        }
        else {
            adjustDimensionOnMouseMove(pointer, shape);
        }
        adjustOriginByMovingPointer(pointer, shape);
    },
    /**
     * Adjust the origin position of shape to center
     * @param {fabric.Object} shape - Shape object
     */
    adjustOriginToCenter: function (shape) {
        var centerPoint = shape.getPointByOrigin('center', 'center');
        var originX = shape.getOriginX();
        var originY = shape.getOriginY();
        var origin = shape.getPointByOrigin(originX, originY);
        var left = shape.getLeft() + (centerPoint.x - origin.x);
        var top = shape.getTop() + (centerPoint.y - origin.y);
        shape.set({
            hasControls: true,
            hasBorders: true,
            originX: 'center',
            originY: 'center',
            left: left,
            top: top
        });
        shape.setCoords(); // For left, top properties
    }
};
//# sourceMappingURL=shapeResizeHelper.js.map