/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview CropperDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
/**
 * CropperDrawingMode class
 * @class
 * @ignore
 */
declare class CropperDrawingMode extends DrawingMode {
    constructor();
    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    start(graphics: any): void;
    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    end(graphics: any): void;
}
export default CropperDrawingMode;
