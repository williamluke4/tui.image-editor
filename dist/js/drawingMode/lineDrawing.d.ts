/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview LineDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
/**
 * LineDrawingMode class
 * @class
 * @ignore
 */
declare class LineDrawingMode extends DrawingMode {
    constructor();
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @param {{width: ?number, color: ?string}} [options] - Brush width & color
    * @override
    */
    start(graphics: any, options: any): void;
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    end(graphics: any): void;
}
export default LineDrawingMode;
