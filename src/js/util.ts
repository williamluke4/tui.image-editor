/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Util
 */
import {forEach, sendHostname} from "tui-code-snippet";
const {min, max} = Math;
let hostnameSent = false;


/**
 * Clamp value
 * @param {number} value - Value
 * @param {number} minValue - Minimum value
 * @param {number} maxValue - Maximum value
 * @returns {number} clamped value
 */
export function clamp(value: number, minValue: number, maxValue: number): number {
    let temp;
    if (minValue > maxValue) {
        temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }

    return max(minValue, min(value, maxValue));
}

/**
 * Make key-value object from arguments
 * @returns {object.<string, string>}
 */
export function keyMirror(...args): {[name: string]: string} {
    const obj = {};
    forEach(args, key => {
        obj[key] = key;
    });
    return obj;
}

/**
 * Make CSSText
 * @param {Object} styleObj - Style info object
 * @returns {string} Connected string of style
 */
export function makeStyleText(styleObj: object): string {
    let styleStr = "";

    forEach(styleObj, (value, prop) => {
        styleStr += `${prop}: ${value};`;
    });

    return styleStr;
}

/**
 * Get object's properties
 * @param {Object} obj - object
 * @param {Array} keys - keys
 * @returns {Object} properties object
 */
export function getProperties(obj: object, keys: Array<any>): object {
    const props = {};
    const {length} = keys;
    let i = 0;
    let key;

    for (i = 0; i < length; i += 1) {
        key = keys[i];
        props[key] = obj[key];
    }

    return props;
}

/**
 * ParseInt simpliment
 * @param {number} value - Value
 * @returns {number}
 */
export function toInteger(value: number): number {
    return parseInt(value, 10);
}

/**
 * String to camelcase string
 * @param {string} targetString - change target
 * @returns {string}
 * @private
 */
export function toCamelCase(targetString: string): string {
    return targetString.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

/**
 * Check browser file api support
 * @returns {boolean}
 * @private
 */
export function isSupportFileApi(): boolean {
    return !!(window.File && window.FileList && window.FileReader);
}

/**
 * hex to rgb
 * @param {string} color - hex color
 * @param {string} alpha - color alpha value
 * @returns {string} rgb expression
 */
export function getRgb(color: string, alpha: string): string {
    if (color.length === 4) {
        color = `${color}${color.slice(1, 4)}`;
    }
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const a = alpha || 1;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
/**
 * send hostname
 */
export function sendHostName() {
    if (hostnameSent) {
        return;
    }
    hostnameSent = true;

    sendHostname("image-editor", "UA-129999381-1");
}

/**
 * Apply css resource
 * @param {string} styleBuffer - serialized css text
 * @param {string} tagId - style tag id
 */
export function styleLoad(styleBuffer: string, tagId: string): void {
    const [head] = document.getElementsByTagName("head");
    const linkElement = document.createElement("link");
    const styleData = encodeURIComponent(styleBuffer);
    if (tagId) {
        linkElement.id = tagId;
        // linkElement.id = 'tui-image-editor-theme-style';
    }
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute("href", `data:text/css;charset=UTF-8,${styleData}`);
    head.appendChild(linkElement);
}

/**
 * Get selector
 * @param {HTMLElement} targetElement - target element
 * @returns {Function} selector
 */
export function getSelector(targetElement: HTMLElement): Function {
    return str => targetElement.querySelector(str);
}

/**
 * Change base64 to blob
 * @param {String} data - base64 string data
 * @returns {Blob} Blob Data
 */
export function base64ToBlob(data: string): Blob {
    const rImageType: RegExp = /data:(image\/.+);base64,/;
    let mimeString: string = "";
    let raw, uInt8Array, i;

    raw = data.replace(rImageType, (header, imageType) => {
        mimeString = imageType;

        return "";
    });

    raw = atob(raw);
    const rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: mimeString});
}

