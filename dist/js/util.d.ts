/**
 * Clamp value
 * @param {number} value - Value
 * @param {number} minValue - Minimum value
 * @param {number} maxValue - Maximum value
 * @returns {number} clamped value
 */
export declare function clamp(value: number, minValue: number, maxValue: number): number;
/**
 * Make key-value object from arguments
 * @returns {object.<string, string>}
 */
export declare function keyMirror(...args: any[]): {
    [name: string]: string;
};
/**
 * Make CSSText
 * @param {Object} styleObj - Style info object
 * @returns {string} Connected string of style
 */
export declare function makeStyleText(styleObj: object): string;
/**
 * Get object's properties
 * @param {Object} obj - object
 * @param {Array} keys - keys
 * @returns {Object} properties object
 */
export declare function getProperties(obj: object, keys: Array<any>): object;
/**
 * ParseInt simpliment
 * @param {number} value - Value
 * @returns {number}
 */
export declare function toInteger(value: number): number;
/**
 * String to camelcase string
 * @param {string} targetString - change target
 * @returns {string}
 * @private
 */
export declare function toCamelCase(targetString: string): string;
/**
 * Check browser file api support
 * @returns {boolean}
 * @private
 */
export declare function isSupportFileApi(): boolean;
/**
 * hex to rgb
 * @param {string} color - hex color
 * @param {string} alpha - color alpha value
 * @returns {string} rgb expression
 */
export declare function getRgb(color: string, alpha: string): string;
/**
 * send hostname
 */
export declare function sendHostName(): void;
/**
 * Apply css resource
 * @param {string} styleBuffer - serialized css text
 * @param {string} tagId - style tag id
 */
export declare function styleLoad(styleBuffer: string, tagId: string): void;
/**
 * Get selector
 * @param {HTMLElement} targetElement - target element
 * @returns {Function} selector
 */
export declare function getSelector(targetElement: HTMLElement): Function;
/**
 * Change base64 to blob
 * @param {String} data - base64 string data
 * @returns {Blob} Blob Data
 */
export declare function base64ToBlob(data: string): Blob;
