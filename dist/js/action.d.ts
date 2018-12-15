declare const _default: {
    getActions(): {
        main: any;
        shape: any;
        crop: any;
        flip: any;
        rotate: any;
        text: any;
        mask: any;
        draw: any;
        icon: any;
        filter: any;
    };
    _mainAction(): any;
    _iconAction(): any;
    _drawAction(): any;
    _maskAction(): any;
    _textAction(): any;
    _rotateAction(): any;
    _shapeAction(): any;
    _cropAction(): any;
    _flipAction(): any;
    _filterAction(): any;
    setReAction(): void;
    _commonAction(): {
        modeChange: (menu: any) => void;
        deactivateAll: any;
        changeSelectableAll: any;
        discardSelection: any;
        stopDrawingMode: any;
    };
    mixin(ImageEditor: any): void;
};
export default _default;
