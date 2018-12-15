import Component from '../interface/component';
/**
 * FreeDrawing
 * @class FreeDrawing
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
declare class FreeDrawing extends Component {
    width: any;
    oColor: any;
    constructor(graphics: any);
    /**
     * Start free drawing mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    start(setting: any): void;
    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    setBrush(setting: any): void;
    /**
     * End free drawing mode
     */
    end(): void;
}
export default FreeDrawing;
