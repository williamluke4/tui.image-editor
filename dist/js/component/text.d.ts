import Component from '../interface/component';
/**
 * Text
 * @class Text
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
declare class Text extends Component {
    _defaultStyles: any;
    _isSelected: any;
    _selectedObj: any;
    _editingObj: any;
    _listeners: any;
    _textarea: any;
    _ratio: any;
    _lastClickTime: any;
    _editingObjInfos: any;
    isPrevEditing: any;
    useItext: any;
    constructor(graphics: any);
    /**
     * Start input text mode
     */
    start(): void;
    /**
     * End input text mode
     */
    end(): void;
    /**
     * Add new text on canvas image
     * @param {string} text - Initial input text
     * @param {Object} options - Options for generating text
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoraiton] Type of line (underline / line-throgh / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     * @returns {Promise}
     */
    add(text: any, options: any): any;
    /**
     * Change text of activate object on canvas image
     * @param {Object} activeObj - Current selected text object
     * @param {string} text - Changed text
     * @returns {Promise}
     */
    change(activeObj: any, text: any): any;
    /**
     * Set style
     * @param {Object} activeObj - Current selected text object
     * @param {Object} styleObj - Initial styles
     *     @param {string} [styleObj.fill] Color
     *     @param {string} [styleObj.fontFamily] Font type for text
     *     @param {number} [styleObj.fontSize] Size
     *     @param {string} [styleObj.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [styleObj.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [styleObj.textAlign] Type of text align (left / center / right)
     *     @param {string} [styleObj.textDecoraiton] Type of line (underline / line-throgh / overline)
     * @returns {Promise}
     */
    setStyle(activeObj: any, styleObj: any): any;
    /**
     * Get the text
     * @param {Object} activeObj - Current selected text object
     * @returns {String} text
     */
    getText(activeObj: any): any;
    /**
     * Set infos of the current selected object
     * @param {fabric.Text} obj - Current selected text object
     * @param {boolean} state - State of selecting
     */
    setSelectedInfo(obj: any, state: any): void;
    /**
     * Whether object is selected or not
     * @returns {boolean} State of selecting
     */
    isSelected(): any;
    /**
     * Get current selected text object
     * @returns {fabric.Text} Current selected text object
     */
    getSelectedObj(): any;
    /**
     * Set ratio value of canvas
     */
    setCanvasRatio(): void;
    /**
     * Get ratio value of canvas
     * @returns {number} Ratio value
     */
    getCanvasRatio(): any;
    /**
     * Set initial position on canvas image
     * @param {{x: number, y: number}} [position] - Selected position
     * @private
     */
    _setInitPos(position: any): void;
    /**
     * Create textarea element on canvas container
     * @private
     */
    _createTextarea(): void;
    /**
     * Remove textarea element on canvas container
     * @private
     */
    _removeTextarea(): void;
    /**
     * Input event handler
     * @private
     */
    _onInput(): void;
    /**
     * Keydown event handler
     * @private
     */
    _onKeyDown(): void;
    /**
     * Blur event handler
     * @private
     */
    _onBlur(): void;
    /**
     * Scroll event handler
     * @private
     */
    _onScroll(): void;
    /**
     * Fabric scaling event handler
     * @param {fabric.Event} fEvent - Current scaling event on selected object
     * @private
     */
    _onFabricScaling(fEvent: any): void;
    /**
     * onSelectClear handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onFabricSelectClear(fEvent: any): void;
    /**
     * onSelect handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */
    _onFabricSelect(fEvent: any): void;
    /**
     * Fabric 'mousedown' event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    _onFabricMouseDown(fEvent: any): void;
    /**
     * Fire 'addText' event if object is not selected.
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    _fireAddText(fEvent: any): void;
    /**
     * Fabric mouseup event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    _onFabricMouseUp(fEvent: any): void;
    /**
     * Get state of firing double click event
     * @param {Date} newClickTime - Current clicked time
     * @returns {boolean} Whether double clicked or not
     * @private
     */
    _isDoubleClick(newClickTime: any): boolean;
    /**
     * Change state of text object for editing
     * @param {fabric.Text} obj - Text object fired event
     * @private
     */
    _changeToEditingMode(obj: any): void;
}
export default Text;
