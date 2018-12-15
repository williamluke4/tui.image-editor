/**
 * Ui class
 * @class
 * @param {string|jQuery|HTMLElement} element - Wrapper's element or selector
 * @param {Object} [options] - Ui setting options
 *   @param {number} option.loadImage - Init default load image
 *   @param {number} option.initMenu - Init start menu
 *   @param {Boolean} [option.menuBarPosition=bottom] - Let
 *   @param {Boolean} [option.applyCropSelectionStyle=false] - Let
 *   @param {Object} [options.uiSize] - ui size of editor
 *     @param {string} options.uiSize.width - width of ui
 *     @param {string} options.uiSize.height - height of ui
 * @param {Objecdt} actions - ui action instance
 */
declare class Ui {
    options: any;
    _actions: any;
    submenu: any;
    imageSize: any;
    uiSize: any;
    theme: any;
    _submenuChangeTransection: any;
    _selectedElement: any;
    _mainElement: any;
    _editorElementWrap: any;
    _editorElement: any;
    _menuElement: any;
    _subMenuElement: any;
    _initMenuEvent: any;
    _els: any;
    _editorContainerElement: any;
    icon: any;
    width: any;
    height: any;
    menuBarPosition: any;
    normal: any;
    active: any;
    hover: any;
    constructor(element: any, options: any, actions: any);
    /**
     * Set Default Selection for includeUI
     * @param {Object} option - imageEditor options
     * @returns {Object} - extends selectionStyle option
     * @ignore
     */
    setUiDefaultSelectionStyle(option: any): any;
    /**
     * Change editor size
     * @param {Object} resizeInfo - ui & image size info
     *   @param {Object} resizeInfo.uiSize - image size dimension
     *     @param {Number} resizeInfo.uiSize.width - ui width
     *     @param {Number} resizeInfo.uiSize.height - ui height
     *   @param {Object} resizeInfo.imageSize - image size dimension
     *     @param {Number} resizeInfo.imageSize.oldWidth - old width
     *     @param {Number} resizeInfo.imageSize.oldHeight - old height
     *     @param {Number} resizeInfo.imageSize.newWidth - new width
     *     @param {Number} resizeInfo.imageSize.newHeight - new height
     * @example
     * // Change the image size and ui size, and change the affected ui state together.
     * imageEditor.ui.resizeEditor({
     *     imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 700, newHeight: 700},
     *     uiSize: {width: 1000, height: 1000}
     * });
     * @example
     * // Apply the ui state while preserving the previous attribute (for example, if responsive Ui)
     * imageEditor.ui.resizeEditor();
     */
    resizeEditor({uiSize, imageSize}?: {
        uiSize: any;
        imageSize?: any;
    }): void;
    /**
     * Change undo button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    changeUndoButtonStatus(enableStatus: any): void;
    /**
     * Change redo button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    changeRedoButtonStatus(enableStatus: any): void;
    /**
     * Change reset button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    changeResetButtonStatus(enableStatus: any): void;
    /**
     * Change delete-all button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    changeDeleteAllButtonEnabled(enableStatus: any): void;
    /**
     * Change delete button status
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */
    changeDeleteButtonEnabled(enableStatus: any): void;
    /**
     * Change delete button status
     * @param {Object} [options] - Ui setting options
     *   @param {number} option.loadImage - Init default load image
     *   @param {number} option.initMenu - Init start menu
     *   @param {Boolean} [option.menuBarPosition=bottom] - Let
     *   @param {Boolean} [option.applyCropSelectionStyle=false] - Let
     * @returns {Object} initialize option
     * @private
     */
    _initializeOption(options: any): any;
    /**
     * Set ui container size
     * @param {Object} uiSize - ui dimension
     *   @param {number} width - width
     *   @param {number} height - height
     * @private
     */
    _setUiSize(uiSize?: any): void;
    /**
     * Make submenu dom element
     * @private
     */
    _makeSubMenu(): void;
    /**
     * Make primary ui dom element
     * @param {string|jQuery|HTMLElement} element - Wrapper's element or selector
     * @private
     */
    _makeUiElement(element: any): void;
    /**
     * Make menu ui dom element
     * @param {string} menuName - menu name
     * @private
     */
    _makeMenuElement(menuName: any): void;
    /**
     * Add help action event
     * @param {string} helpName - help menu name
     * @private
     */
    _addHelpActionEvent(helpName: any): void;
    /**
     * Add download event
     * @private
     */
    _addDownloadEvent(): void;
    /**
     * Add load event
     * @private
     */
    _addLoadEvent(): void;
    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */
    _addMenuEvent(menuName: any): void;
    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */
    _addSubMenuEvent(menuName: any): void;
    /**
     * get editor area element
     * @returns {HTMLElement} editor area html element
     * @ignore
     */
    getEditorArea(): any;
    /**
     * Add event for menu items
     * @ignore
     */
    activeMenuEvent(): void;
    /**
     * Init canvas
     * @ignore
     */
    initCanvas(): void;
    /**
     * get editor area element
     * @returns {Object} load image option
     * @private
     */
    _getLoadImage(): any;
    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toogle or not
     * @param {boolean} discardSelection - discard selection
     * @ignore
     */
    changeMenu(menuName: any, toggle?: boolean, discardSelection?: boolean): void;
    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toogle or not
     * @param {boolean} discardSelection - discard selection
     * @private
     */
    _changeMenu(menuName: any, toggle: any, discardSelection: any): void;
    /**
     * Init menu
     * @private
     */
    _initMenu(): void;
    /**
     * Get editor dimension
     * @returns {Object} - width & height of editor
     * @private
     */
    _getEditorDimension(): {
        width: any;
        height: any;
    };
    /**
     * Set editor position
     * @param {string} menuBarPosition - top or right or bottom or left
     * @private
     */
    _setEditorPosition(menuBarPosition: any): void;
}
export default Ui;
