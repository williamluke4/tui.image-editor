"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tui_code_snippet_1 = require("tui-code-snippet");
var util = require("./util");
var imagetracer_1 = require("./helper/imagetracer");
exports.default = {
    /**
     * Get ui actions
     * @returns {Object} actions for ui
     * @private
     */
    getActions: function () {
        return {
            main: this._mainAction(),
            shape: this._shapeAction(),
            crop: this._cropAction(),
            flip: this._flipAction(),
            rotate: this._rotateAction(),
            text: this._textAction(),
            mask: this._maskAction(),
            draw: this._drawAction(),
            icon: this._iconAction(),
            filter: this._filterAction()
        };
    },
    /**
     * Main Action
     * @returns {Object} actions for ui main
     * @private
     */
    _mainAction: function () {
        var _this = this;
        var exitCropOnAction = function () {
            if (_this.ui.submenu === 'crop') {
                _this.stopDrawingMode();
                _this.ui.changeMenu('crop');
            }
        };
        return tui_code_snippet_1.extend({
            initLoadImage: function (imagePath, imageName) { return (_this.loadImageFromURL(imagePath, imageName).then(function (sizeValue) {
                exitCropOnAction();
                _this.ui.initializeImgUrl = imagePath;
                _this.ui.resizeEditor({ imageSize: sizeValue });
                _this.clearUndoStack();
            })); },
            undo: function () {
                if (!_this.isEmptyUndoStack()) {
                    exitCropOnAction();
                    _this.undo();
                }
            },
            redo: function () {
                if (!_this.isEmptyRedoStack()) {
                    exitCropOnAction();
                    _this.redo();
                }
            },
            reset: function () {
                exitCropOnAction();
                _this.loadImageFromURL(_this.ui.initializeImgUrl, 'resetImage').then(function (sizeValue) {
                    exitCropOnAction();
                    _this.ui.resizeEditor({ imageSize: sizeValue });
                    _this.clearUndoStack();
                });
            },
            delete: function () {
                _this.ui.changeDeleteButtonEnabled(false);
                exitCropOnAction();
                _this.removeActiveObject();
                _this.activeObjectId = null;
            },
            deleteAll: function () {
                exitCropOnAction();
                _this.clearObjects();
                _this.ui.changeDeleteButtonEnabled(false);
                _this.ui.changeDeleteAllButtonEnabled(false);
            },
            load: function (file) {
                if (!util.isSupportFileApi()) {
                    alert('This browser does not support file-api');
                }
                _this.ui.initializeImgUrl = URL.createObjectURL(file);
                _this.loadImageFromFile(file).then(function (sizeValue) {
                    exitCropOnAction();
                    _this.clearUndoStack();
                    _this.ui.activeMenuEvent();
                    _this.ui.resizeEditor({ imageSize: sizeValue });
                })['catch'](function (message) { return (Promise.reject(message)); });
            },
            download: function () {
                var dataURL = _this.toDataURL();
                var imageName = _this.getImageName();
                var blob, type, w;
                if (util.isSupportFileApi() && window.saveAs) {
                    blob = util.base64ToBlob(dataURL);
                    type = blob.type.split('/')[1];
                    if (imageName.split('.').pop() !== type) {
                        imageName += "." + type;
                    }
                    saveAs(blob, imageName); // eslint-disable-line
                }
                else {
                    w = window.open();
                    w.document.body.innerHTML = "<img src='" + dataURL + "'>";
                }
            }
        }, this._commonAction());
    },
    /**
     * Icon Action
     * @returns {Object} actions for ui icon
     * @private
     */
    _iconAction: function () {
        var _this = this;
        var cacheIconType;
        var cacheIconColor;
        var startX;
        var startY;
        var iconWidth;
        var iconHeight;
        var objId;
        this.on({
            'iconCreateResize': function (_a) {
                var moveOriginPointer = _a.moveOriginPointer;
                var scaleX = (moveOriginPointer.x - startX) / iconWidth;
                var scaleY = (moveOriginPointer.y - startY) / iconHeight;
                _this.setObjectPropertiesQuietly(objId, {
                    scaleX: Math.abs(scaleX * 2),
                    scaleY: Math.abs(scaleY * 2)
                });
            },
            'iconCreateEnd': function () {
                _this.ui.icon.clearIconType();
                _this.changeSelectableAll(true);
            }
        });
        var mouseDown = function (e, originPointer) {
            startX = originPointer.x;
            startY = originPointer.y;
            _this.addIcon(cacheIconType, {
                left: originPointer.x,
                top: originPointer.y,
                fill: cacheIconColor
            }).then(function (obj) {
                objId = obj.id;
                iconWidth = obj.width;
                iconHeight = obj.height;
            });
        };
        return tui_code_snippet_1.extend({
            changeColor: function (color) {
                if (_this.activeObjectId) {
                    _this.changeIconColor(_this.activeObjectId, color);
                }
            },
            addIcon: function (iconType, iconColor) {
                cacheIconType = iconType;
                cacheIconColor = iconColor;
                // this.readyAddIcon();
                _this.changeCursor('crosshair');
                _this.off('mousedown');
                _this.once('mousedown', mouseDown.bind(_this));
            },
            cancelAddIcon: function () {
                _this.off('mousedown');
                _this.ui.icon.clearIconType();
                _this.changeSelectableAll(true);
                _this.changeCursor('default');
            },
            registDefalutIcons: function (type, path) {
                var iconObj = {};
                iconObj[type] = path;
                _this.registerIcons(iconObj);
            },
            registCustomIcon: function (imgUrl, file) {
                var imagetracer = new imagetracer_1.default();
                imagetracer.imageToSVG(imgUrl, function (svgstr) {
                    var _a = svgstr.match(/path[^>]*d="([^"]*)"/), svgPath = _a[1];
                    var iconObj = {};
                    iconObj[file.name] = svgPath;
                    _this.registerIcons(iconObj);
                    _this.addIcon(file.name, {
                        left: 100,
                        top: 100
                    });
                }, imagetracer_1.default.tracerDefaultOption());
            }
        }, this._commonAction());
    },
    /**
     * Draw Action
     * @returns {Object} actions for ui draw
     * @private
     */
    _drawAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            setDrawMode: function (type, settings) {
                _this.stopDrawingMode();
                if (type === 'free') {
                    _this.startDrawingMode('FREE_DRAWING', settings);
                }
                else {
                    _this.startDrawingMode('LINE_DRAWING', settings);
                }
            },
            setColor: function (color) {
                _this.setBrush({
                    color: color
                });
            }
        }, this._commonAction());
    },
    /**
     * Mask Action
     * @returns {Object} actions for ui mask
     * @private
     */
    _maskAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            loadImageFromURL: function (imgUrl, file) { return (_this.loadImageFromURL(_this.toDataURL(), 'FilterImage').then(function () {
                _this.addImageObject(imgUrl).then(function () {
                    URL.revokeObjectURL(file);
                });
            })); },
            applyFilter: function () {
                _this.applyFilter('mask', {
                    maskObjId: _this.activeObjectId
                });
            }
        }, this._commonAction());
    },
    /**
     * Text Action
     * @returns {Object} actions for ui text
     * @private
     */
    _textAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            changeTextStyle: function (styleObj) {
                if (_this.activeObjectId) {
                    _this.changeTextStyle(_this.activeObjectId, styleObj);
                }
            }
        }, this._commonAction());
    },
    /**
     * Rotate Action
     * @returns {Object} actions for ui rotate
     * @private
     */
    _rotateAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            rotate: function (angle) {
                _this.rotate(angle);
                _this.ui.resizeEditor();
            },
            setAngle: function (angle) {
                _this.setAngle(angle);
                _this.ui.resizeEditor();
            }
        }, this._commonAction());
    },
    /**
     * Shape Action
     * @returns {Object} actions for ui shape
     * @private
     */
    _shapeAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            changeShape: function (changeShapeObject) {
                if (_this.activeObjectId) {
                    _this.changeShape(_this.activeObjectId, changeShapeObject);
                }
            },
            setDrawingShape: function (shapeType) {
                _this.setDrawingShape(shapeType);
            }
        }, this._commonAction());
    },
    /**
     * Crop Action
     * @returns {Object} actions for ui crop
     * @private
     */
    _cropAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            crop: function () {
                var cropRect = _this.getCropzoneRect();
                if (cropRect) {
                    _this.crop(cropRect).then(function () {
                        _this.stopDrawingMode();
                        _this.ui.resizeEditor();
                        _this.ui.changeMenu('crop');
                    })['catch'](function (message) { return (Promise.reject(message)); });
                }
            },
            cancel: function () {
                _this.stopDrawingMode();
                _this.ui.changeMenu('crop');
            },
            preset: function (presetType) {
                switch (presetType) {
                    case 'preset-square':
                        _this.setCropzoneRect(1 / 1);
                        break;
                    case 'preset-3-2':
                        _this.setCropzoneRect(3 / 2);
                        break;
                    case 'preset-4-3':
                        _this.setCropzoneRect(4 / 3);
                        break;
                    case 'preset-5-4':
                        _this.setCropzoneRect(5 / 4);
                        break;
                    case 'preset-7-5':
                        _this.setCropzoneRect(7 / 5);
                        break;
                    case 'preset-16-9':
                        _this.setCropzoneRect(16 / 9);
                        break;
                    default:
                        _this.setCropzoneRect();
                        _this.ui.crop.changeApplyButtonStatus(false);
                        break;
                }
            }
        }, this._commonAction());
    },
    /**
     * Flip Action
     * @returns {Object} actions for ui flip
     * @private
     */
    _flipAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            flip: function (flipType) { return _this[flipType](); }
        }, this._commonAction());
    },
    /**
     * Filter Action
     * @returns {Object} actions for ui filter
     * @private
     */
    _filterAction: function () {
        var _this = this;
        return tui_code_snippet_1.extend({
            applyFilter: function (applying, type, options) {
                if (applying) {
                    _this.applyFilter(type, options);
                }
                else if (_this.hasFilter(type)) {
                    _this.removeFilter(type);
                }
            }
        }, this._commonAction());
    },
    /**
     * Image Editor Event Observer
     */
    setReAction: function () {
        var _this = this;
        this.on({
            undoStackChanged: function (length) {
                if (length) {
                    _this.ui.changeUndoButtonStatus(true);
                    _this.ui.changeResetButtonStatus(true);
                }
                else {
                    _this.ui.changeUndoButtonStatus(false);
                    _this.ui.changeResetButtonStatus(false);
                }
                _this.ui.resizeEditor();
            },
            redoStackChanged: function (length) {
                if (length) {
                    _this.ui.changeRedoButtonStatus(true);
                }
                else {
                    _this.ui.changeRedoButtonStatus(false);
                }
                _this.ui.resizeEditor();
            },
            /* eslint-disable complexity */
            objectActivated: function (obj) {
                _this.activeObjectId = obj.id;
                _this.ui.changeDeleteButtonEnabled(true);
                _this.ui.changeDeleteAllButtonEnabled(true);
                if (obj.type === 'cropzone') {
                    _this.ui.crop.changeApplyButtonStatus(true);
                }
                else if (['rect', 'circle', 'triangle'].indexOf(obj.type) > -1) {
                    _this.stopDrawingMode();
                    if (_this.ui.submenu !== 'shape') {
                        _this.ui.changeMenu('shape', false, false);
                    }
                    _this.ui.shape.setShapeStatus({
                        strokeColor: obj.stroke,
                        strokeWidth: obj.strokeWidth,
                        fillColor: obj.fill
                    });
                    _this.ui.shape.setMaxStrokeValue(Math.min(obj.width, obj.height));
                }
                else if (obj.type === 'path' || obj.type === 'line') {
                    if (_this.ui.submenu !== 'draw') {
                        _this.ui.changeMenu('draw', false, false);
                        _this.ui.draw.changeStandbyMode();
                    }
                }
                else if (['i-text', 'text'].indexOf(obj.type) > -1) {
                    if (_this.ui.submenu !== 'text') {
                        _this.ui.changeMenu('text', false, false);
                    }
                }
                else if (obj.type === 'icon') {
                    _this.stopDrawingMode();
                    if (_this.ui.submenu !== 'icon') {
                        _this.ui.changeMenu('icon', false, false);
                    }
                    _this.ui.icon.setIconPickerColor(obj.fill);
                }
            },
            /* eslint-enable complexity */
            addText: function (pos) {
                _this.addText('Double Click', {
                    position: pos.originPosition,
                    styles: {
                        fill: _this.ui.text.textColor,
                        fontSize: util.toInteger(_this.ui.text.fontSize),
                        fontFamily: 'Noto Sans'
                    }
                }).then(function () {
                    _this.changeCursor('default');
                });
            },
            addObjectAfter: function (obj) {
                if (['rect', 'circle', 'triangle'].indexOf(obj.type) > -1) {
                    _this.ui.shape.setMaxStrokeValue(Math.min(obj.width, obj.height));
                    _this.ui.shape.changeStandbyMode();
                }
            },
            objectScaled: function (obj) {
                if (['i-text', 'text'].indexOf(obj.type) > -1) {
                    _this.ui.text.fontSize = util.toInteger(obj.fontSize);
                }
                else if (['rect', 'circle', 'triangle'].indexOf(obj.type) >= 0) {
                    var width = obj.width, height = obj.height;
                    var strokeValue = _this.ui.shape.getStrokeValue();
                    if (width < strokeValue) {
                        _this.ui.shape.setStrokeValue(width);
                    }
                    if (height < strokeValue) {
                        _this.ui.shape.setStrokeValue(height);
                    }
                }
            },
            selectionCleared: function () {
                _this.activeObjectId = null;
                if (_this.ui.submenu === 'text') {
                    _this.changeCursor('text');
                }
                else if (_this.ui.submenu !== 'draw' && _this.ui.submenu !== 'crop') {
                    _this.stopDrawingMode();
                }
            }
        });
    },
    /**
     * Common Action
     * @returns {Object} common actions for ui
     * @private
     */
    _commonAction: function () {
        var _this = this;
        return {
            modeChange: function (menu) {
                switch (menu) {
                    case 'text':
                        _this._changeActivateMode('TEXT');
                        break;
                    case 'crop':
                        _this.startDrawingMode('CROPPER');
                        break;
                    case 'shape':
                        _this._changeActivateMode('SHAPE');
                        _this.setDrawingShape(_this.ui.shape.type, _this.ui.shape.options);
                        break;
                    default:
                        break;
                }
            },
            deactivateAll: this.deactivateAll.bind(this),
            changeSelectableAll: this.changeSelectableAll.bind(this),
            discardSelection: this.discardSelection.bind(this),
            stopDrawingMode: this.stopDrawingMode.bind(this)
        };
    },
    /**
     * Mixin
     * @param {ImageEditor} ImageEditor instance
     */
    mixin: function (ImageEditor) {
        tui_code_snippet_1.extend(ImageEditor.prototype, this);
    }
};
//# sourceMappingURL=action.js.map