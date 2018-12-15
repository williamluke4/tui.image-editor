import Component from '../interface/component';
/**
 * Flip
 * @class Flip
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
declare class Flip extends Component {
    angle: any;
    constructor(graphics: any);
    /**
     * Get current flip settings
     * @returns {{flipX: Boolean, flipY: Boolean}}
     */
    getCurrentSetting(): {
        flipX: any;
        flipY: any;
    };
    /**
     * Set flipX, flipY
     * @param {{flipX: Boolean, flipY: Boolean}} newSetting - Flip setting
     * @returns {jQuery.Deferred}
     */
    set(newSetting: any): any;
    /**
     * Invert image angle for flip
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     */
    _invertAngle(isChangingFlipX: any, isChangingFlipY: any): void;
    /**
     * Flip objects
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     * @private
     */
    _flipObjects(isChangingFlipX: any, isChangingFlipY: any): void;
    /**
     * Reset flip settings
     * @returns {jQuery.Deferred}
     */
    reset(): any;
    /**
     * Flip x
     * @returns {jQuery.Deferred}
     */
    flipX(): any;
    /**
     * Flip y
     * @returns {jQuery.Deferred}
     */
    flipY(): any;
}
export default Flip;
