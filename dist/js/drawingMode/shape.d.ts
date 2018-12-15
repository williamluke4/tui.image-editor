/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview ShapeDrawingMode class
 */
import DrawingMode from "../interface/drawingMode";
/**
 * ShapeDrawingMode class
 * @class
 * @ignore
 */
declare class ShapeDrawingMode extends DrawingMode {
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
export default ShapeDrawingMode;
