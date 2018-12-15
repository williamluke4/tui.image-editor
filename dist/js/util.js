"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Util
 */
var tui_code_snippet_1 = require("tui-code-snippet");
var min = Math.min, max = Math.max;
var hostnameSent = false;
/**
 * Clamp value
 * @param {number} value - Value
 * @param {number} minValue - Minimum value
 * @param {number} maxValue - Maximum value
 * @returns {number} clamped value
 */
function clamp(value, minValue, maxValue) {
    var temp;
    if (minValue > maxValue) {
        temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }
    return max(minValue, min(value, maxValue));
}
exports.clamp = clamp;
/**
 * Make key-value object from arguments
 * @returns {object.<string, string>}
 */
function keyMirror() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var obj = {};
    tui_code_snippet_1.forEach(args, function (key) {
        obj[key] = key;
    });
    return obj;
}
exports.keyMirror = keyMirror;
/**
 * Make CSSText
 * @param {Object} styleObj - Style info object
 * @returns {string} Connected string of style
 */
function makeStyleText(styleObj) {
    var styleStr = "";
    tui_code_snippet_1.forEach(styleObj, function (value, prop) {
        styleStr += prop + ": " + value + ";";
    });
    return styleStr;
}
exports.makeStyleText = makeStyleText;
/**
 * Get object's properties
 * @param {Object} obj - object
 * @param {Array} keys - keys
 * @returns {Object} properties object
 */
function getProperties(obj, keys) {
    var props = {};
    var length = keys.length;
    var i = 0;
    var key;
    for (i = 0; i < length; i += 1) {
        key = keys[i];
        props[key] = obj[key];
    }
    return props;
}
exports.getProperties = getProperties;
/**
 * ParseInt simpliment
 * @param {number} value - Value
 * @returns {number}
 */
function toInteger(value) {
    return parseInt(value, 10);
}
exports.toInteger = toInteger;
/**
 * String to camelcase string
 * @param {string} targetString - change target
 * @returns {string}
 * @private
 */
function toCamelCase(targetString) {
    return targetString.replace(/-([a-z])/g, function ($0, $1) { return $1.toUpperCase(); });
}
exports.toCamelCase = toCamelCase;
/**
 * Check browser file api support
 * @returns {boolean}
 * @private
 */
function isSupportFileApi() {
    return !!(window.File && window.FileList && window.FileReader);
}
exports.isSupportFileApi = isSupportFileApi;
/**
 * hex to rgb
 * @param {string} color - hex color
 * @param {string} alpha - color alpha value
 * @returns {string} rgb expression
 */
function getRgb(color, alpha) {
    if (color.length === 4) {
        color = "" + color + color.slice(1, 4);
    }
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);
    var a = alpha || 1;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
exports.getRgb = getRgb;
/**
 * send hostname
 */
function sendHostName() {
    if (hostnameSent) {
        return;
    }
    hostnameSent = true;
    tui_code_snippet_1.sendHostname("image-editor", "UA-129999381-1");
}
exports.sendHostName = sendHostName;
/**
 * Apply css resource
 * @param {string} styleBuffer - serialized css text
 * @param {string} tagId - style tag id
 */
function styleLoad(styleBuffer, tagId) {
    var head = document.getElementsByTagName("head")[0];
    var linkElement = document.createElement("link");
    var styleData = encodeURIComponent(styleBuffer);
    if (tagId) {
        linkElement.id = tagId;
        // linkElement.id = 'tui-image-editor-theme-style';
    }
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute("href", "data:text/css;charset=UTF-8," + styleData);
    head.appendChild(linkElement);
}
exports.styleLoad = styleLoad;
/**
 * Get selector
 * @param {HTMLElement} targetElement - target element
 * @returns {Function} selector
 */
function getSelector(targetElement) {
    return function (str) { return targetElement.querySelector(str); };
}
exports.getSelector = getSelector;
/**
 * Change base64 to blob
 * @param {String} data - base64 string data
 * @returns {Blob} Blob Data
 */
function base64ToBlob(data) {
    var rImageType = /data:(image\/.+);base64,/;
    var mimeString = "";
    var raw, uInt8Array, i;
    raw = data.replace(rImageType, function (header, imageType) {
        mimeString = imageType;
        return "";
    });
    raw = atob(raw);
    var rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line
    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: mimeString });
}
exports.base64ToBlob = base64ToBlob;
//# sourceMappingURL=util.js.map