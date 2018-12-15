declare interface execute_options {
    /**
     * Shape foreground color (ex: '#fff', 'transparent')
     */
    fill: string;
    /**
     * Shape outline color
     */
    stroke: string;
    /**
     * Shape outline width
     */
    strokeWidth: number;
    /**
     * Width value (When type option is 'rect', this options can use)
     */
    width: number;
    /**
     * Height value (When type option is 'rect', this options can use)
     */
    height: number;
    /**
     * Radius x value (When type option is 'circle', this options can use)
     */
    rx: number;
    /**
     * Radius y value (When type option is 'circle', this options can use)
     */
    ry: number;
    /**
     * Shape x position
     */
    left: number;
    /**
     * Shape y position
     */
    top: number;
    /**
     * Whether resizing shape has 1:1 ratio or not
     */
    isRegular: number;
}

declare interface execute_styles {
    /**
     * Color
     */
    fill: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface execute_posInfo {
    /**
     * x position
     */
    x: number;
    /**
     * y position
     */
    y: number;
    /**
     * can be 'left', 'center', 'right'
     */
    originX: string;
    /**
     * can be 'top', 'center', 'bottom'
     */
    originY: string;
}

declare interface execute_props {
    /**
     * Color
     */
    fill: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface getCroppedImageData_cropRect {
    /**
     * left position
     */
    left: Number;
    /**
     * top position
     */
    top: Number;
    /**
     * width
     */
    width: Number;
    /**
     * height
     */
    height: Number;
}

declare interface add_options {
    /**
     * Initial styles
     */
    styles: Object;
    /**
     * Color
     */
    "styles.fill": string;
    /**
     * Font type for text
     */
    "styles.fontFamily": string;
    /**
     * Size
     */
    "styles.fontSize": number;
    /**
     * Type of inclination (normal / italic)
     */
    "styles.fontStyle": string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    "styles.fontWeight": string;
    /**
     * Type of text align (left / center / right)
     */
    "styles.textAlign": string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    "styles.textDecoraiton": string;
    /**
     * Initial position
     */
    position: Object;
}

declare interface setStyle_styleObj {
    /**
     * Color
     */
    fill: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface startDrawingMode_option {
    /**
     * brush width
     */
    width: Number;
    /**
     * brush color
     */
    color: String;
}

declare interface toDataURL_options {
    /**
     * The format of the output image. Either "jpeg" or "png"
     */
    format: String;
    /**
     * Quality level (0..1). Only used for jpeg.
     */
    quality: Number;
    /**
     * Multiplier to scale by
     */
    multiplier: Number;
    /**
     * Cropping left offset. Introduced in fabric v1.2.14
     */
    left: Number;
    /**
     * Cropping top offset. Introduced in fabric v1.2.14
     */
    top: Number;
    /**
     * Cropping width. Introduced in fabric v1.2.14
     */
    width: Number;
    /**
     * Cropping height. Introduced in fabric v1.2.14
     */
    height: Number;
}

declare interface setBrush_option {
    /**
     * width
     */
    width: Number;
    /**
     * color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */
    color: String;
}

declare interface setDrawingShape_options {
    /**
     * Shape foreground color (ex: '#fff', 'transparent')
     */
    fill: string;
    /**
     * Shape outline color
     */
    stoke: string;
    /**
     * Shape outline width
     */
    strokeWidth: number;
    /**
     * Width value (When type option is 'rect', this options can use)
     */
    width: number;
    /**
     * Height value (When type option is 'rect', this options can use)
     */
    height: number;
    /**
     * Radius x value (When type option is 'circle', this options can use)
     */
    rx: number;
    /**
     * Radius y value (When type option is 'circle', this options can use)
     */
    ry: number;
    /**
     * Whether resizing shape has 1:1 ratio or not
     */
    isRegular: number;
}

declare interface registerPaths_pathInfos {
    /**
     * key
     */
    key: string;
    /**
     * value
     */
    value: string;
}

declare interface setObjectProperties_props {
    /**
     * Color
     */
    fill: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface setObjectPosition_posInfo {
    /**
     * x position
     */
    x: number;
    /**
     * y position
     */
    y: number;
    /**
     * can be 'left', 'center', 'right'
     */
    originX: string;
    /**
     * can be 'top', 'center', 'bottom'
     */
    originY: string;
}

/**
 * Image editor
 */
declare class ImageEditor {
    /**
     * Image editor
     * @param wrapper - Wrapper's element or selector
     * @param options - Canvas max width & height of css
     * @param options.includeUI - Use the provided UI
     * @param options.includeUI.loadImage - Basic editing image
     * @param options.includeUI.loadImage.path - image path
     * @param options.includeUI.loadImage.name - image name
     * @param options.includeUI.theme - Theme object
     * @param options.includeUI.menu - It can be selected when only specific menu is used. [default all]
     * @param options.includeUI.initMenu - The first menu to be selected and started.
     * @param options.includeUI.uiSize - ui size of editor
     * @param options.includeUI.uiSize.width - width of ui
     * @param options.includeUI.uiSize.height - height of ui
     * @param options.includeUI.menuBarPosition - Menu bar position [top | bottom | left | right]
     * @param options.cssMaxWidth - Canvas css-max-width
     * @param options.cssMaxHeight - Canvas css-max-height
     * @param options.usageStatistics - Let us know the hostname. If you don't want to send the hostname, please set to false.
     */
    constructor(wrapper: string | jQuery | HTMLElement, options?: undefined_options);

    /**
     * Remove Active Object
     */
    removeActiveObject(): void;

    /**
     * Get current drawing mode
     * @returns
     */
    getDrawingMode(): string;

    /**
     * Clear all objects
     * @returns
     */
    clearObjects(): Promise;

    /**
     * Deactivate all objects
     */
    deactivateAll(): void;

    /**
     * discard selction
     */
    discardSelection(): void;

    /**
     * selectable status change
     * @param selectable - selctable status
     */
    changeSelectableAll(selectable: boolean): void;

    /**
     * Undo
     * @returns
     */
    undo(): Promise;

    /**
     * Redo
     * @returns
     */
    redo(): Promise;

    /**
     * Load image from file
     * @param imgFile - Image file
     * @param imageName - imageName
     * @returns
     */
    loadImageFromFile(imgFile: File, imageName?: string): Promise<SizeChange, ErrorMsg>;

    /**
     * Load image from url
     * @param url - File url
     * @param imageName - imageName
     * @returns
     */
    loadImageFromURL(url: string, imageName: string): Promise<SizeChange, ErrorMsg>;

    /**
     * Add image object on canvas
     * @param imgUrl - Image url to make object
     * @returns
     */
    addImageObject(imgUrl: string): Promise<ObjectProps, ErrorMsg>;

    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE_DRAWING', 'TEXT', 'SHAPE'</I>
     * @param option parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     * @param option.width brush width
     * @param option.color brush color
     * @returns true if success or false
     */
    startDrawingMode(mode: String, option?: startDrawingMode_option): boolean;

    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     */
    stopDrawingMode(): void;

    /**
     * Crop this image with rect
     * @param rect crop rect
     * @param rect.left left position
     * @param rect.top top position
     * @param rect.width width
     * @param rect.height height
     * @returns
     */
    crop(rect: crop_rect): Promise;

    /**
     * Get the cropping rect
     * @returns {{left: number, top: number, width: number, height: number}} rect
     */
    getCropzoneRect(): Object;

    /**
     * Set the cropping rect
     * @param mode crop rect mode [1, 1.5, 1.3333333333333333, 1.25, 1.7777777777777777]
     * @returns {{left: number, top: number, width: number, height: number}} rect
     */
    setCropzoneRect(mode: Object): Object;

    /**
     * Flip x
     * @returns
     */
    flipX(): Promise<FlipStatus, ErrorMsg>;

    /**
     * Flip y
     * @returns
     */
    flipY(): Promise<FlipStatus, ErrorMsg>;

    /**
     * Reset flip
     * @returns
     */
    resetFlip(): Promise<FlipStatus, ErrorMsg>;

    /**
     * Rotate image
     * @returns
     * @param angle - Additional angle to rotate image
     * @returns
     */
    rotate(angle: number): Promise;

    /**
     * Set angle
     * @param angle - Angle of image
     * @returns
     */
    setAngle(angle: number): Promise<RotateStatus, ErrorMsg>;

    /**
     * Set drawing brush
     * @param option brush option
     * @param option.width width
     * @param option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */
    setBrush(option: setBrush_option): void;

    /**
     * Set states of current drawing shape
     * @param type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param options - Shape options
     * @param options.fill - Shape foreground color (ex: '#fff', 'transparent')
     * @param options.stoke - Shape outline color
     * @param options.strokeWidth - Shape outline width
     * @param options.width - Width value (When type option is 'rect', this options can use)
     * @param options.height - Height value (When type option is 'rect', this options can use)
     * @param options.rx - Radius x value (When type option is 'circle', this options can use)
     * @param options.ry - Radius y value (When type option is 'circle', this options can use)
     * @param options.isRegular - Whether resizing shape has 1:1 ratio or not
     */
    setDrawingShape(type: string, options?: setDrawingShape_options): void;

    /**
     * Add shape
     * @param type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param options - Shape options
     * @param options.fill - Shape foreground color (ex: '#fff', 'transparent')
     * @param options.stroke - Shape outline color
     * @param options.strokeWidth - Shape outline width
     * @param options.width - Width value (When type option is 'rect', this options can use)
     * @param options.height - Height value (When type option is 'rect', this options can use)
     * @param options.rx - Radius x value (When type option is 'circle', this options can use)
     * @param options.ry - Radius y value (When type option is 'circle', this options can use)
     * @param options.left - Shape x position
     * @param options.top - Shape y position
     * @param options.isRegular - Whether resizing shape has 1:1 ratio or not
     * @returns
     */
    addShape(type: string, options?: addShape_options): Promise<ObjectProps, ErrorMsg>;

    /**
     * Change shape
     * @param id - object id
     * @param options - Shape options
     * @param options.fill - Shape foreground color (ex: '#fff', 'transparent')
     * @param options.stroke - Shape outline color
     * @param options.strokeWidth - Shape outline width
     * @param options.width - Width value (When type option is 'rect', this options can use)
     * @param options.height - Height value (When type option is 'rect', this options can use)
     * @param options.rx - Radius x value (When type option is 'circle', this options can use)
     * @param options.ry - Radius y value (When type option is 'circle', this options can use)
     * @param options.isRegular - Whether resizing shape has 1:1 ratio or not
     * @returns
     */
    changeShape(id: number, options?: changeShape_options): Promise;

    /**
     * Add text on image
     * @param text - Initial input text
     * @param options Options for generating text
     * @param options.styles Initial styles
     * @param options.styles.fill Color
     * @param options.styles.fontFamily Font type for text
     * @param options.styles.fontSize Size
     * @param options.styles.fontStyle Type of inclination (normal / italic)
     * @param options.styles.fontWeight Type of thicker or thinner looking (normal / bold)
     * @param options.styles.textAlign Type of text align (left / center / right)
     * @param options.styles.textDecoraiton Type of line (underline / line-throgh / overline)
     * @param options.position - Initial position
     * @returns
     */
    addText(text: string, options?: addText_options): Promise;

    /**
     * Change contents of selected text object on image
     * @param id - object id
     * @param text - Changing text
     * @returns
     */
    changeText(id: number, text: string): Promise<ObjectProps, ErrorMsg>;

    /**
     * Set style
     * @param id - object id
     * @param styleObj - text styles
     * @param styleObj.fill Color
     * @param styleObj.fontFamily Font type for text
     * @param styleObj.fontSize Size
     * @param styleObj.fontStyle Type of inclination (normal / italic)
     * @param styleObj.fontWeight Type of thicker or thinner looking (normal / bold)
     * @param styleObj.textAlign Type of text align (left / center / right)
     * @param styleObj.textDecoraiton Type of line (underline / line-throgh / overline)
     * @returns
     */
    changeTextStyle(id: number, styleObj?: changeTextStyle_styleObj): Promise;

    /**
     * Register custom icons
     * @param infos - Infos to register icons
     */
    registerIcons(infos: Object): void;

    /**
     * Change canvas cursor type
     * @param cursorType - cursor type
     */
    changeCursor(cursorType: string): void;

    /**
     * Add icon on canvas
     * @param type - Icon type ('arrow', 'cancel', custom icon name)
     * @param options - Icon options
     * @param options.fill - Icon foreground color
     * @param options.left - Icon x position
     * @param options.top - Icon y position
     * @returns
     */
    addIcon(type: string, options?: addIcon_options): Promise<ObjectProps, ErrorMsg>;

    /**
     * Change icon color
     * @param id - object id
     * @param color - Color for icon
     * @returns
     */
    changeIconColor(id: number, color: string): Promise;

    /**
     * Remove an object or group by id
     * @param id - object id
     * @returns
     */
    removeObject(id: number): Promise;

    /**
     * Whether it has the filter or not
     * @param type - Filter type
     * @returns true if it has the filter
     */
    hasFilter(type: string): boolean;

    /**
     * Remove filter on canvas image
     * @param type - Filter type
     * @returns
     */
    removeFilter(type: string): Promise<FilterResult, ErrorMsg>;

    /**
     * Apply filter on canvas image
     * @param type - Filter type
     * @param options - Options to apply filter
     * @param options.maskObjId - masking image object id
     * @returns
     */
    applyFilter(type: string, options: applyFilter_options): Promise<FilterResult, ErrorMsg>;

    /**
     * Get data url
     * @param options - options for toDataURL
     * @param options.format The format of the output image. Either "jpeg" or "png"
     * @param options.quality Quality level (0..1). Only used for jpeg.
     * @param options.multiplier Multiplier to scale by
     * @param options.left Cropping left offset. Introduced in fabric v1.2.14
     * @param options.top Cropping top offset. Introduced in fabric v1.2.14
     * @param options.width Cropping width. Introduced in fabric v1.2.14
     * @param options.height Cropping height. Introduced in fabric v1.2.14
     * @returns A DOMString containing the requested data URI
     */
    toDataURL(options?: toDataURL_options): string;

    /**
     * Get image name
     * @returns image name
     */
    getImageName(): string;

    /**
     * Clear undoStack
     */
    clearUndoStack(): void;

    /**
     * Clear redoStack
     */
    clearRedoStack(): void;

    /**
     * Whehter the undo stack is empty or not
     * @returns imageEditor.isEmptyUndoStack();
     */
    isEmptyUndoStack(): boolean;

    /**
     * Whehter the redo stack is empty or not
     * @returns imageEditor.isEmptyRedoStack();
     */
    isEmptyRedoStack(): boolean;

    /**
     * Resize canvas dimension
     * @param dimension - Max width & height
     * @returns
     */
    resizeCanvasDimension(dimension: Object): Promise;

    /**
     * Destroy
     */
    destroy(): void;

    /**
     * Set properties of active object
     * @param id - object id
     * @param keyValue - key & value
     * @returns
     */
    setObjectProperties(id: number, keyValue: Object): Promise;

    /**
     * Set properties of active object, Do not leave an invoke history.
     * @param id - object id
     * @param keyValue - key & value
     */
    setObjectPropertiesQuietly(id: number, keyValue: Object): void;

    /**
     * Get properties of active object corresponding key
     * @param id - object id
     * @param keys - property's key
     * @returns properties if id is valid or null
     */
    getObjectProperties(id: number, keys: string[] | ObjectProps | string): ObjectProps;

    /**
     * Get the canvas size
     * @returns {{width: number, height: number}} canvas size
     */
    getCanvasSize(): Object;

    /**
     * Get object position by originX, originY
     * @param id - object id
     * @param originX - can be 'left', 'center', 'right'
     * @param originY - can be 'top', 'center', 'bottom'
     * @returns {{x:number, y: number}} position by origin if id is valid, or null
     */
    getObjectPosition(id: number, originX: string, originY: string): Object;

    /**
     * Set object position  by originX, originY
     * @param id - object id
     * @param posInfo - position object
     * @param posInfo.x - x position
     * @param posInfo.y - y position
     * @param posInfo.originX - can be 'left', 'center', 'right'
     * @param posInfo.originY - can be 'top', 'center', 'bottom'
     * @returns
     */
    setObjectPosition(id: number, posInfo: setObjectPosition_posInfo): Promise;

}

declare interface undefined_options {
    /**
     * Init default load image
     */
    loadImage: number;
    /**
     * Init start menu
     */
    initMenu: number;
    /**
     * Let
     */
    menuBarPosition: Boolean;
    /**
     * Let
     */
    applyCropSelectionStyle: Boolean;
    /**
     * ui size of editor
     */
    uiSize: Object;
    /**
     * width of ui
     */
    "uiSize.width": string;
    /**
     * height of ui
     */
    "uiSize.height": string;
}

/**
 * Image filter result
 */
declare interface FilterResult {
    /**
     * filter type like 'mask', 'Grayscale' and so on
     */
    type: string;
    /**
     * action type like 'add', 'remove'
     */
    action: string;
}

/**
 * Flip status
 */
declare interface FlipStatus {
    /**
     * x axis
     */
    flipX: boolean;
    /**
     * y axis
     */
    flipY: boolean;
    /**
     * angle
     */
    angle: Number;
}

/**
 * Rotation status
 */
declare interface RotateStatus {
    /**
     * angle
     */
    angle: Number;
}

/**
 * Old and new Size
 */
declare interface SizeChange {
    /**
     * old width
     */
    oldWidth: Number;
    /**
     * old height
     */
    oldHeight: Number;
    /**
     * new width
     */
    newWidth: Number;
    /**
     * new height
     */
    newHeight: Number;
}

declare interface ErrorMsg {
}

declare interface ObjectProps {
    /**
     * object id
     */
    id: number;
    /**
     * object type
     */
    type: string;
    /**
     * text content
     */
    text: string;
    /**
     * Left
     */
    left: string;
    /**
     * Top
     */
    top: string;
    /**
     * Width
     */
    width: string;
    /**
     * Height
     */
    height: string;
    /**
     * Color
     */
    fill: string;
    /**
     * Stroke
     */
    stroke: string;
    /**
     * StrokeWidth
     */
    strokeWidth: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Font Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface crop_rect {
    /**
     * left position
     */
    left: Number;
    /**
     * top position
     */
    top: Number;
    /**
     * width
     */
    width: Number;
    /**
     * height
     */
    height: Number;
}

declare interface addShape_options {
    /**
     * Shape foreground color (ex: '#fff', 'transparent')
     */
    fill: string;
    /**
     * Shape outline color
     */
    stroke: string;
    /**
     * Shape outline width
     */
    strokeWidth: number;
    /**
     * Width value (When type option is 'rect', this options can use)
     */
    width: number;
    /**
     * Height value (When type option is 'rect', this options can use)
     */
    height: number;
    /**
     * Radius x value (When type option is 'circle', this options can use)
     */
    rx: number;
    /**
     * Radius y value (When type option is 'circle', this options can use)
     */
    ry: number;
    /**
     * Shape x position
     */
    left: number;
    /**
     * Shape y position
     */
    top: number;
    /**
     * Whether resizing shape has 1:1 ratio or not
     */
    isRegular: number;
}

declare interface changeShape_options {
    /**
     * Shape foreground color (ex: '#fff', 'transparent')
     */
    fill: string;
    /**
     * Shape outline color
     */
    stroke: string;
    /**
     * Shape outline width
     */
    strokeWidth: number;
    /**
     * Width value (When type option is 'rect', this options can use)
     */
    width: number;
    /**
     * Height value (When type option is 'rect', this options can use)
     */
    height: number;
    /**
     * Radius x value (When type option is 'circle', this options can use)
     */
    rx: number;
    /**
     * Radius y value (When type option is 'circle', this options can use)
     */
    ry: number;
    /**
     * Whether resizing shape has 1:1 ratio or not
     */
    isRegular: number;
}

declare interface addText_options {
    /**
     * Initial styles
     */
    styles: Object;
    /**
     * Color
     */
    "styles.fill": string;
    /**
     * Font type for text
     */
    "styles.fontFamily": string;
    /**
     * Size
     */
    "styles.fontSize": number;
    /**
     * Type of inclination (normal / italic)
     */
    "styles.fontStyle": string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    "styles.fontWeight": string;
    /**
     * Type of text align (left / center / right)
     */
    "styles.textAlign": string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    "styles.textDecoraiton": string;
    /**
     * Initial position
     */
    position: Object;
}

declare interface changeTextStyle_styleObj {
    /**
     * Color
     */
    fill: string;
    /**
     * Font type for text
     */
    fontFamily: string;
    /**
     * Size
     */
    fontSize: number;
    /**
     * Type of inclination (normal / italic)
     */
    fontStyle: string;
    /**
     * Type of thicker or thinner looking (normal / bold)
     */
    fontWeight: string;
    /**
     * Type of text align (left / center / right)
     */
    textAlign: string;
    /**
     * Type of line (underline / line-throgh / overline)
     */
    textDecoraiton: string;
}

declare interface addIcon_options {
    /**
     * Icon foreground color
     */
    fill: string;
    /**
     * Icon x position
     */
    left: string;
    /**
     * Icon y position
     */
    top: string;
}

declare interface applyFilter_options {
    /**
     * masking image object id
     */
    maskObjId: number;
}

declare interface addEvent_actions {
    /**
     * change text style
     */
    changeTextStyle: Function;
}

/**
 * Full configuration for theme.<br>
 */
declare interface themeConfig {
    /**
     * Brand icon image
     */
    "common.bi.image": string;
    /**
     * Icon image width
     */
    "common.bisize.width": string;
    /**
     * Icon Image Height
     */
    "common.bisize.height": string;
    /**
     * Background image
     */
    "common.backgroundImage": string;
    /**
     * Background color
     */
    "common.backgroundColor": string;
    /**
     * Full area border style
     */
    "common.border": string;
    /**
     * header area background
     */
    "header.backgroundImage": string;
    /**
     * header area background color
     */
    "header.backgroundColor": string;
    /**
     * header area border style
     */
    "header.border": string;
    /**
     * load button background color
     */
    "loadButton.backgroundColor": string;
    /**
     * load button border style
     */
    "loadButton.border": string;
    /**
     * load button foreground color
     */
    "loadButton.color": string;
    /**
     * load button font type
     */
    "loadButton.fontFamily": string;
    /**
     * load button font size
     */
    "loadButton.fontSize": string;
    /**
     * download button background color
     */
    "downloadButton.backgroundColor": string;
    /**
     * download button border style
     */
    "downloadButton.border": string;
    /**
     * download button foreground color
     */
    "downloadButton.color": string;
    /**
     * download button font type
     */
    "downloadButton.fontFamily": string;
    /**
     * download button font size
     */
    "downloadButton.fontSize": string;
    /**
     * Menu default icon svg bundle file path
     */
    "menu.normalIcon.path": string;
    /**
     * Menu default icon svg bundle name
     */
    "menu.normalIcon.name": string;
    /**
     * Menu active icon svg bundle file path
     */
    "menu.activeIcon.path": string;
    /**
     * Menu active icon svg bundle name
     */
    "menu.activeIcon.name": string;
    /**
     * Menu icon Size Width
     */
    "menu.iconSize.width": string;
    /**
     * Menu Icon Size Height
     */
    "menu.iconSize.height": string;
    /**
     * Sub-menu area background color
     */
    "submenu.backgroundColor": string;
    /**
     * Submenu partition line color
     */
    "submenu.partition.color": string;
    /**
     * Submenu default icon svg bundle file path
     */
    "submenu.normalIcon.path": string;
    /**
     * Submenu default icon svg bundle name
     */
    "submenu.normalIcon.name": string;
    /**
     * Submenu active icon svg bundle file path
     */
    "submenu.activeIcon.path": string;
    /**
     * Submenu active icon svg bundle name
     */
    "submenu.activeIcon.name": string;
    /**
     * Submenu icon Size Width
     */
    "submenu.iconSize.width": string;
    /**
     * Submenu Icon Size Height
     */
    "submenu.iconSize.height": string;
    /**
     * Submenu default label color
     */
    "submenu.normalLabel.color": string;
    /**
     * Sub Menu Default Label Font Thickness
     */
    "submenu.normalLabel.fontWeight": string;
    /**
     * Submenu active label color
     */
    "submenu.activeLabel.color": string;
    /**
     * Submenu active label Font thickness
     */
    "submenu.activeLabel.fontWeight": string;
    /**
     * Checkbox border style
     */
    "checkbox.border": string;
    /**
     * Checkbox background color
     */
    "checkbox.backgroundColor": string;
    /**
     * range control pointer color
     */
    "range.pointer.color": string;
    /**
     * range control bar color
     */
    "range.bar.color": string;
    /**
     * range control subbar color
     */
    "range.subbar.color": string;
    /**
     * range number box font color
     */
    "range.value.color": string;
    /**
     * range number box font thickness
     */
    "range.value.fontWeight": string;
    /**
     * range number box font size
     */
    "range.value.fontSize": string;
    /**
     * range number box border style
     */
    "range.value.border": string;
    /**
     * range number box background color
     */
    "range.value.backgroundColor": string;
    /**
     * range title font color
     */
    "range.title.color": string;
    /**
     * range title font weight
     */
    "range.title.fontWeight": string;
    /**
     * colorpicker button border style
     */
    "colorpicker.button.border": string;
    /**
     * colorpicker button title font color
     */
    "colorpicker.title.color": string;
}

/**
 * Ui class
 */
declare class Ui {
    /**
     * Ui class
     * @param element - Wrapper's element or selector
     * @param options - Ui setting options
     * @param option.loadImage - Init default load image
     * @param option.initMenu - Init start menu
     * @param option.menuBarPosition - Let
     * @param option.applyCropSelectionStyle - Let
     * @param options.uiSize - ui size of editor
     * @param options.uiSize.width - width of ui
     * @param options.uiSize.height - height of ui
     * @param actions - ui action instance
     */
    constructor(element: string | jQuery | HTMLElement, options: undefined_options, actions: Objecdt);

    /**
     * Change editor size
     * @param resizeInfo - ui & image size info
     * @param resizeInfo.uiSize - image size dimension
     * @param resizeInfo.uiSize.width - ui width
     * @param resizeInfo.uiSize.height - ui height
     * @param resizeInfo.imageSize - image size dimension
     * @param resizeInfo.imageSize.oldWidth - old width
     * @param resizeInfo.imageSize.oldHeight - old height
     * @param resizeInfo.imageSize.newWidth - new width
     * @param resizeInfo.imageSize.newHeight - new height
     */
    resizeEditor(resizeInfo: resizeEditor_resizeInfo): void;

}

declare interface resizeEditor_resizeInfo {
    /**
     * image size dimension
     */
    uiSize: Object;
    /**
     * ui width
     */
    "uiSize.width": Number;
    /**
     * ui height
     */
    "uiSize.height": Number;
    /**
     * image size dimension
     */
    imageSize: Object;
    /**
     * old width
     */
    "imageSize.oldWidth": Number;
    /**
     * old height
     */
    "imageSize.oldHeight": Number;
    /**
     * new width
     */
    "imageSize.newWidth": Number;
    /**
     * new height
     */
    "imageSize.newHeight": Number;
}

