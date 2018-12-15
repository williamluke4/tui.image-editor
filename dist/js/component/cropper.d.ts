import Component from '../interface/component';
/**
 * Cropper components
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @class Cropper
 * @ignore
 */
declare class Cropper extends Component {
    _cropzone: any;
    _startX: any;
    _startY: any;
    _withShiftKey: any;
    _listeners: any;
    x: any;
    y: any;
    constructor(graphics: any);
    /**
     * Start cropping
     */
    start(): void;
    /**
     * End cropping
     */
    end(): void;
    /**
     * onMousedown handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onFabricMouseDown(fEvent: any): void;
    /**
     * onMousemove handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onFabricMouseMove(fEvent: any): void;
    /**
     * Get rect dimension setting from Canvas-Mouse-Position(x, y)
     * @param {number} x - Canvas-Mouse-Position x
     * @param {number} y - Canvas-Mouse-Position Y
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */
    _calcRectDimensionFromPoint(x: any, y: any): {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    /**
     * onMouseup handler in fabric canvas
     * @private
     */
    _onFabricMouseUp(): void;
    /**
     * Get cropped image data
     * @param {Object} cropRect cropzone rect
     *  @param {Number} cropRect.left left position
     *  @param {Number} cropRect.top top position
     *  @param {Number} cropRect.width width
     *  @param {Number} cropRect.height height
     * @returns {?{imageName: string, url: string}} cropped Image data
     */
    getCroppedImageData(cropRect: any): {
        imageName: any;
        url: any;
    };
    /**
     * Get cropped rect
     * @returns {Object} rect
     */
    getCropzoneRect(): {
        left: any;
        top: any;
        width: any;
        height: any;
    };
    /**
     * Set a cropzone square
     * @param {number} [presetRatio] - preset ratio
     */
    setCropzoneRect(presetRatio: any): void;
    /**
     * Set a cropzone square
     * @param {number} presetRatio - preset ratio
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */
    _getPresetCropSizePosition(presetRatio: any): {
        top: number;
        left: number;
        width: number;
        height: any;
    };
    /**
     * Keydown event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    _onKeyDown(e: any): void;
    /**
     * Keyup event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    _onKeyUp(e: any): void;
}
export default Cropper;
