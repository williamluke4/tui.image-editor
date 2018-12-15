/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview TextDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
/**
 * TextDrawingMode class
 * @class
 * @ignore
 */
declare class TextDrawingMode extends DrawingMode {
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
export default TextDrawingMode;
