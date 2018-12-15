"use strict";
/*
  imagetracer.js version 1.2.4
  Simple raster image tracer and vectorizer written in JavaScript.
  andras@jankovics.net
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
  The Unlicense / PUBLIC DOMAIN
  This is free and unencumbered software released into the public domain.
  Anyone is free to copy, modify, publish, use, compile, sell, or
  distribute this software, either in source code form or as a compiled
  binary, for any purpose, commercial or non-commercial, and by any
  means.
  In jurisdictions that recognize copyright laws, the author or authors
  of this software dedicate any and all copyright interest in the
  software to the public domain. We make this dedication for the benefit
  of the public at large and to the detriment of our heirs and
  successors. We intend this dedication to be an overt act of
  relinquishment in perpetuity of all present and future rights to this
  software under copyright law.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
  OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  For more information, please refer to http://unlicense.org/
*/
var ImageTracer = /** @class */ (function () {
    /* eslint-disable */
    function ImageTracer() {
        this.versionnumber = '1.2.4';
        this.optionpresets = {
            default: {
                corsenabled: false,
                ltres: 1,
                qtres: 1,
                pathomit: 8,
                rightangleenhance: true,
                colorsampling: 2,
                numberofcolors: 16,
                mincolorratio: 0,
                colorquantcycles: 3,
                layering: 0,
                strokewidth: 1,
                linefilter: false,
                scale: 1,
                roundcoords: 1,
                viewbox: false,
                desc: false,
                lcpr: 0,
                qcpr: 0,
                blurradius: 0,
                blurdelta: 20
            },
            'posterized1': {
                colorsampling: 0,
                numberofcolors: 2
            },
            'posterized2': {
                numberofcolors: 4,
                blurradius: 5
            },
            'curvy': {
                ltres: 0.01,
                linefilter: true,
                rightangleenhance: false
            },
            'sharp': { qtres: 0.01,
                linefilter: false },
            'detailed': { pathomit: 0,
                roundcoords: 2,
                ltres: 0.5,
                qtres: 0.5,
                numberofcolors: 64 },
            'smoothed': { blurradius: 5,
                blurdelta: 64 },
            'grayscale': { colorsampling: 0,
                colorquantcycles: 1,
                numberofcolors: 7 },
            'fixedpalette': { colorsampling: 0,
                colorquantcycles: 1,
                numberofcolors: 27 },
            'randomsampling1': { colorsampling: 1,
                numberofcolors: 8 },
            'randomsampling2': { colorsampling: 1,
                numberofcolors: 64 },
            'artistic1': { colorsampling: 0,
                colorquantcycles: 1,
                pathomit: 0,
                blurradius: 5,
                blurdelta: 64,
                ltres: 0.01,
                linefilter: true,
                numberofcolors: 16,
                strokewidth: 2 },
            'artistic2': { qtres: 0.01,
                colorsampling: 0,
                colorquantcycles: 1,
                numberofcolors: 4,
                strokewidth: 0 },
            'artistic3': { qtres: 10,
                ltres: 10,
                numberofcolors: 8 },
            'artistic4': { qtres: 10,
                ltres: 10,
                numberofcolors: 64,
                blurradius: 5,
                blurdelta: 256,
                strokewidth: 2 },
            'posterized3': { ltres: 1,
                qtres: 1,
                pathomit: 20,
                rightangleenhance: true,
                colorsampling: 0,
                numberofcolors: 3,
                mincolorratio: 0,
                colorquantcycles: 3,
                blurradius: 3,
                blurdelta: 20,
                strokewidth: 0,
                linefilter: false,
                roundcoords: 1,
                pal: [{ r: 0,
                        g: 0,
                        b: 100,
                        a: 255 }, { r: 255,
                        g: 255,
                        b: 255,
                        a: 255 }] }
        };
        this.pathscan_combined_lookup = [
            [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]],
            [[0, 1, 0, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [0, 2, -1, 0]],
            [[-1, -1, -1, -1], [-1, -1, -1, -1], [0, 1, 0, -1], [0, 0, 1, 0]],
            [[0, 0, 1, 0], [-1, -1, -1, -1], [0, 2, -1, 0], [-1, -1, -1, -1]],
            [[-1, -1, -1, -1], [0, 0, 1, 0], [0, 3, 0, 1], [-1, -1, -1, -1]],
            [[13, 3, 0, 1], [13, 2, -1, 0], [7, 1, 0, -1], [7, 0, 1, 0]],
            [[-1, -1, -1, -1], [0, 1, 0, -1], [-1, -1, -1, -1], [0, 3, 0, 1]],
            [[0, 3, 0, 1], [0, 2, -1, 0], [-1, -1, -1, -1], [-1, -1, -1, -1]],
            [[0, 3, 0, 1], [0, 2, -1, 0], [-1, -1, -1, -1], [-1, -1, -1, -1]],
            [[-1, -1, -1, -1], [0, 1, 0, -1], [-1, -1, -1, -1], [0, 3, 0, 1]],
            [[11, 1, 0, -1], [14, 0, 1, 0], [14, 3, 0, 1], [11, 2, -1, 0]],
            [[-1, -1, -1, -1], [0, 0, 1, 0], [0, 3, 0, 1], [-1, -1, -1, -1]],
            [[0, 0, 1, 0], [-1, -1, -1, -1], [0, 2, -1, 0], [-1, -1, -1, -1]],
            [[-1, -1, -1, -1], [-1, -1, -1, -1], [0, 1, 0, -1], [0, 0, 1, 0]],
            [[0, 1, 0, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [0, 2, -1, 0]],
            [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]]
        ];
        this.gks = [[0.27901, 0.44198, 0.27901], [0.135336, 0.228569, 0.272192, 0.228569, 0.135336], [0.086776, 0.136394, 0.178908, 0.195843, 0.178908, 0.136394, 0.086776],
            [0.063327, 0.093095, 0.122589, 0.144599, 0.152781, 0.144599, 0.122589, 0.093095, 0.063327], [0.049692, 0.069304, 0.089767, 0.107988, 0.120651, 0.125194, 0.120651, 0.107988, 0.089767, 0.069304, 0.049692]];
        this.specpalette = [
            { r: 0, g: 0, b: 0, a: 255 }, { r: 128, g: 128, b: 128, a: 255 }, { r: 0, g: 0, b: 128, a: 255 }, { r: 64, g: 64, b: 128, a: 255 },
            { r: 192, g: 192, b: 192, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }, { r: 128, g: 128, b: 192, a: 255 }, { r: 0, g: 0, b: 192, a: 255 },
            { r: 128, g: 0, b: 0, a: 255 }, { r: 128, g: 64, b: 64, a: 255 }, { r: 128, g: 0, b: 128, a: 255 }, { r: 168, g: 168, b: 168, a: 255 },
            { r: 192, g: 128, b: 128, a: 255 }, { r: 192, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 128, b: 0, a: 255 }
        ];
    }
    ImageTracer.tracerDefaultOption = function () {
        return {
            pathomit: 100,
            ltres: 0.1,
            qtres: 1,
            scale: 1,
            strokewidth: 5,
            viewbox: false,
            linefilter: true,
            desc: false,
            rightangleenhance: false,
            pal: [{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                }, {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 255
                }]
        };
    };
    ImageTracer.prototype.imageToSVG = function (url, callback, options) {
        var _this = this;
        options = this.checkoptions(options);
        this.loadImage(url, function (canvas) {
            callback(_this.imagedataToSVG(_this.getImgdata(canvas), options));
        }, options);
    };
    ImageTracer.prototype.imagedataToSVG = function (imgd, options) {
        options = this.checkoptions(options);
        var td = this.imagedataToTracedata(imgd, options);
        return this.getsvgstring(td, options);
    };
    ImageTracer.prototype.imageToTracedata = function (url, callback, options) {
        var _this = this;
        options = this.checkoptions(options);
        this.loadImage(url, function (canvas) {
            callback(_this.imagedataToTracedata(_this.getImgdata(canvas), options));
        }, options);
    };
    ImageTracer.prototype.imagedataToTracedata = function (imgd, options) {
        options = this.checkoptions(options);
        var ii = this.colorquantization(imgd, options);
        var tracedata;
        if (options.layering === 0) {
            tracedata = {
                layers: [],
                palette: ii.palette,
                width: ii.array[0].length - 2,
                height: ii.array.length - 2
            };
            for (var colornum = 0; colornum < ii.palette.length; colornum += 1) {
                var tracedlayer = this.batchtracepaths(this.internodes(this.pathscan(this.layeringstep(ii, colornum), options.pathomit), options), options.ltres, options.qtres);
                tracedata.layers.push(tracedlayer);
            }
        }
        else {
            var ls = this.layering(ii);
            if (options.layercontainerid) {
                this.drawLayers(ls, this.specpalette, options.scale, options.layercontainerid);
            }
            var bps = this.batchpathscan(ls, options.pathomit);
            var bis = this.batchinternodes(bps, options);
            tracedata = {
                layers: this.batchtracelayers(bis, options.ltres, options.qtres),
                palette: ii.palette,
                width: imgd.width,
                height: imgd.height
            };
        }
        return tracedata;
    };
    ImageTracer.prototype.checkoptions = function (options) {
        options = options || {};
        if (typeof options === 'string') {
            options = options.toLowerCase();
            if (this.optionpresets[options]) {
                options = this.optionpresets[options];
            }
            else {
                options = {};
            }
        }
        var ok = Object.keys(this.optionpresets['default']);
        for (var k = 0; k < ok.length; k += 1) {
            if (!options.hasOwnProperty(ok[k])) {
                options[ok[k]] = this.optionpresets['default'][ok[k]];
            }
        }
        return options;
    };
    ImageTracer.prototype.colorquantization = function (imgd, options) {
        var arr = [];
        var idx = 0;
        var cd;
        var cdl;
        var ci;
        var paletteacc = [];
        var pixelnum = imgd.width * imgd.height;
        var i;
        var j;
        var k;
        var cnt;
        var palette;
        for (j = 0; j < imgd.height + 2; j += 1) {
            arr[j] = [];
            for (i = 0; i < imgd.width + 2; i += 1) {
                arr[j][i] = -1;
            }
        }
        if (options.pal) {
            palette = options.pal;
        }
        else if (options.colorsampling === 0) {
            palette = this.generatepalette(options.numberofcolors);
        }
        else if (options.colorsampling === 1) {
            palette = this.samplepalette(options.numberofcolors, imgd);
        }
        else {
            palette = this.samplepalette2(options.numberofcolors, imgd);
        }
        if (options.blurradius > 0) {
            imgd = this.blur(imgd, options.blurradius, options.blurdelta);
        }
        for (cnt = 0; cnt < options.colorquantcycles; cnt += 1) {
            if (cnt > 0) {
                for (k = 0; k < palette.length; k += 1) {
                    if (paletteacc[k].n > 0) {
                        palette[k] = { r: Math.floor(paletteacc[k].r / paletteacc[k].n),
                            g: Math.floor(paletteacc[k].g / paletteacc[k].n),
                            b: Math.floor(paletteacc[k].b / paletteacc[k].n),
                            a: Math.floor(paletteacc[k].a / paletteacc[k].n) };
                    }
                    if ((paletteacc[k].n / pixelnum < options.mincolorratio) && (cnt < options.colorquantcycles - 1)) {
                        palette[k] = { r: Math.floor(Math.random() * 255),
                            g: Math.floor(Math.random() * 255),
                            b: Math.floor(Math.random() * 255),
                            a: Math.floor(Math.random() * 255) };
                    }
                }
            }
            for (i = 0; i < palette.length; i += 1) {
                paletteacc[i] = { r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    n: 0 };
            }
            for (j = 0; j < imgd.height; j += 1) {
                for (i = 0; i < imgd.width; i += 1) {
                    idx = ((j * imgd.width) + i) * 4;
                    ci = 0;
                    cdl = 1024;
                    for (k = 0; k < palette.length; k += 1) {
                        cd = Math.abs(palette[k].r - imgd.data[idx]) +
                            Math.abs(palette[k].g - imgd.data[idx + 1]) +
                            Math.abs(palette[k].b - imgd.data[idx + 2]) +
                            Math.abs(palette[k].a - imgd.data[idx + 3]);
                        if (cd < cdl) {
                            cdl = cd;
                            ci = k;
                        }
                    }
                    paletteacc[ci].r += imgd.data[idx];
                    paletteacc[ci].g += imgd.data[idx + 1];
                    paletteacc[ci].b += imgd.data[idx + 2];
                    paletteacc[ci].a += imgd.data[idx + 3];
                    paletteacc[ci].n += 1;
                    arr[j + 1][i + 1] = ci;
                }
            }
        }
        return { array: arr,
            palette: palette };
    };
    ImageTracer.prototype.samplepalette = function (numberofcolors, imgd) {
        var idx;
        var palette = [];
        for (var i = 0; i < numberofcolors; i += 1) {
            idx = Math.floor(Math.random() * imgd.data.length / 4) * 4;
            palette.push({ r: imgd.data[idx],
                g: imgd.data[idx + 1],
                b: imgd.data[idx + 2],
                a: imgd.data[idx + 3] });
        }
        return palette;
    };
    ImageTracer.prototype.samplepalette2 = function (numberofcolors, imgd) {
        var idx;
        var palette = [];
        var ni = Math.ceil(Math.sqrt(numberofcolors));
        var nj = Math.ceil(numberofcolors / ni);
        var vx = imgd.width / (ni + 1);
        var vy = imgd.height / (nj + 1);
        for (var j = 0; j < nj; j += 1) {
            for (var i = 0; i < ni; i += 1) {
                if (palette.length === numberofcolors) {
                    break;
                }
                else {
                    idx = Math.floor((((j + 1) * vy) * imgd.width) + ((i + 1) * vx)) * 4;
                    palette.push({ r: imgd.data[idx],
                        g: imgd.data[idx + 1],
                        b: imgd.data[idx + 2],
                        a: imgd.data[idx + 3] });
                }
            }
        }
        return palette;
    };
    ImageTracer.prototype.generatepalette = function (numberofcolors) {
        var palette = [];
        var rcnt;
        var gcnt;
        var bcnt;
        if (numberofcolors < 8) {
            var graystep = Math.floor(255 / (numberofcolors - 1));
            for (var i = 0; i < numberofcolors; i += 1) {
                palette.push({ r: i * graystep,
                    g: i * graystep,
                    b: i * graystep,
                    a: 255 });
            }
        }
        else {
            var colorqnum = Math.floor(Math.pow(numberofcolors, 1 / 3));
            var colorstep = Math.floor(255 / (colorqnum - 1));
            var rndnum = numberofcolors - (colorqnum * colorqnum * colorqnum);
            for (rcnt = 0; rcnt < colorqnum; rcnt += 1) {
                for (gcnt = 0; gcnt < colorqnum; gcnt += 1) {
                    for (bcnt = 0; bcnt < colorqnum; bcnt += 1) {
                        palette.push({ r: rcnt * colorstep,
                            g: gcnt * colorstep,
                            b: bcnt * colorstep,
                            a: 255 });
                    }
                }
            }
            for (rcnt = 0; rcnt < rndnum; rcnt += 1) {
                palette.push({ r: Math.floor(Math.random() * 255),
                    g: Math.floor(Math.random() * 255),
                    b: Math.floor(Math.random() * 255),
                    a: Math.floor(Math.random() * 255) });
            }
        }
        return palette;
    };
    ImageTracer.prototype.layering = function (ii) {
        var layers = [];
        var val = 0;
        var ah = ii.array.length;
        var aw = ii.array[0].length;
        var n1;
        var n2;
        var n3;
        var n4;
        var n5;
        var n6;
        var n7;
        var n8;
        var i;
        var j;
        var k;
        for (k = 0; k < ii.palette.length; k += 1) {
            layers[k] = [];
            for (j = 0; j < ah; j += 1) {
                layers[k][j] = [];
                for (i = 0; i < aw; i += 1) {
                    layers[k][j][i] = 0;
                }
            }
        }
        for (j = 1; j < ah - 1; j += 1) {
            for (i = 1; i < aw - 1; i += 1) {
                val = ii.array[j][i];
                n1 = ii.array[j - 1][i - 1] === val ? 1 : 0;
                n2 = ii.array[j - 1][i] === val ? 1 : 0;
                n3 = ii.array[j - 1][i + 1] === val ? 1 : 0;
                n4 = ii.array[j][i - 1] === val ? 1 : 0;
                n5 = ii.array[j][i + 1] === val ? 1 : 0;
                n6 = ii.array[j + 1][i - 1] === val ? 1 : 0;
                n7 = ii.array[j + 1][i] === val ? 1 : 0;
                n8 = ii.array[j + 1][i + 1] === val ? 1 : 0;
                layers[val][j + 1][i + 1] = 1 + (n5 * 2) + (n8 * 4) + (n7 * 8);
                if (!n4) {
                    layers[val][j + 1][i] = 0 + 2 + (n7 * 4) + (n6 * 8);
                }
                if (!n2) {
                    layers[val][j][i + 1] = 0 + (n3 * 2) + (n5 * 4) + 8;
                }
                if (!n1) {
                    layers[val][j][i] = 0 + (n2 * 2) + 4 + (n4 * 8);
                }
            }
        }
        return layers;
    };
    ImageTracer.prototype.layeringstep = function (ii, cnum) {
        var layer = [];
        var ah = ii.array.length;
        var aw = ii.array[0].length;
        var i;
        var j;
        for (j = 0; j < ah; j += 1) {
            layer[j] = [];
            for (i = 0; i < aw; i += 1) {
                layer[j][i] = 0;
            }
        }
        for (j = 1; j < ah; j += 1) {
            for (i = 1; i < aw; i += 1) {
                layer[j][i] =
                    (ii.array[j - 1][i - 1] === cnum ? 1 : 0) +
                        (ii.array[j - 1][i] === cnum ? 2 : 0) +
                        (ii.array[j][i - 1] === cnum ? 8 : 0) +
                        (ii.array[j][i] === cnum ? 4 : 0);
            }
        }
        return layer;
    };
    ImageTracer.prototype.pathscan = function (arr, pathomit) {
        var paths = [];
        var pacnt = 0;
        var pcnt = 0;
        var px = 0;
        var py = 0;
        var w = arr[0].length;
        var h = arr.length;
        var dir = 0;
        var pathfinished = true;
        var holepath = false;
        var lookuprow;
        for (var j = 0; j < h; j += 1) {
            for (var i = 0; i < w; i += 1) {
                if ((arr[j][i] === 4) || (arr[j][i] === 11)) {
                    px = i;
                    py = j;
                    paths[pacnt] = {};
                    paths[pacnt].points = [];
                    paths[pacnt].boundingbox = [px, py, px, py];
                    paths[pacnt].holechildren = [];
                    pathfinished = false;
                    pcnt = 0;
                    holepath = (arr[j][i] === 11);
                    dir = 1;
                    while (!pathfinished) {
                        paths[pacnt].points[pcnt] = {};
                        paths[pacnt].points[pcnt].x = px - 1;
                        paths[pacnt].points[pcnt].y = py - 1;
                        paths[pacnt].points[pcnt].t = arr[py][px];
                        if ((px - 1) < paths[pacnt].boundingbox[0]) {
                            paths[pacnt].boundingbox[0] = px - 1;
                        }
                        if ((px - 1) > paths[pacnt].boundingbox[2]) {
                            paths[pacnt].boundingbox[2] = px - 1;
                        }
                        if ((py - 1) < paths[pacnt].boundingbox[1]) {
                            paths[pacnt].boundingbox[1] = py - 1;
                        }
                        if ((py - 1) > paths[pacnt].boundingbox[3]) {
                            paths[pacnt].boundingbox[3] = py - 1;
                        }
                        lookuprow = this.pathscan_combined_lookup[arr[py][px]][dir];
                        arr[py][px] = lookuprow[0];
                        dir = lookuprow[1];
                        px += lookuprow[2];
                        py += lookuprow[3];
                        if ((px - 1 === paths[pacnt].points[0].x) && (py - 1 === paths[pacnt].points[0].y)) {
                            pathfinished = true;
                            if (paths[pacnt].points.length < pathomit) {
                                paths.pop();
                            }
                            else {
                                paths[pacnt].isholepath = !!holepath;
                                if (holepath) {
                                    var parentidx = 0, parentbbox = [-1, -1, w + 1, h + 1];
                                    for (var parentcnt = 0; parentcnt < pacnt; parentcnt++) {
                                        if ((!paths[parentcnt].isholepath) &&
                                            this.boundingboxincludes(paths[parentcnt].boundingbox, paths[pacnt].boundingbox) &&
                                            this.boundingboxincludes(parentbbox, paths[parentcnt].boundingbox)) {
                                            parentidx = parentcnt;
                                            parentbbox = paths[parentcnt].boundingbox;
                                        }
                                    }
                                    paths[parentidx].holechildren.push(pacnt);
                                }
                                pacnt += 1;
                            }
                        }
                        pcnt += 1;
                    }
                }
            }
        }
        return paths;
    };
    ImageTracer.prototype.boundingboxincludes = function (parentbbox, childbbox) {
        return ((parentbbox[0] < childbbox[0]) && (parentbbox[1] < childbbox[1]) &&
            (parentbbox[2] > childbbox[2]) && (parentbbox[3] > childbbox[3]));
    };
    ImageTracer.prototype.batchpathscan = function (layers, pathomit) {
        var bpaths = [];
        for (var k in layers) {
            if (!layers.hasOwnProperty(k)) {
                continue;
            }
            bpaths[k] = this.pathscan(layers[k], pathomit);
        }
        return bpaths;
    };
    ImageTracer.prototype.internodes = function (paths, options) {
        var ins = [];
        var palen = 0;
        var nextidx = 0;
        var nextidx2 = 0;
        var previdx = 0;
        var previdx2 = 0;
        var pacnt;
        var pcnt;
        for (pacnt = 0; pacnt < paths.length; pacnt += 1) {
            ins[pacnt] = {};
            ins[pacnt].points = [];
            ins[pacnt].boundingbox = paths[pacnt].boundingbox;
            ins[pacnt].holechildren = paths[pacnt].holechildren;
            ins[pacnt].isholepath = paths[pacnt].isholepath;
            palen = paths[pacnt].points.length;
            for (pcnt = 0; pcnt < palen; pcnt += 1) {
                nextidx = (pcnt + 1) % palen;
                nextidx2 = (pcnt + 2) % palen;
                previdx = (pcnt - 1 + palen) % palen;
                previdx2 = (pcnt - 2 + palen) % palen;
                if (options.rightangleenhance && this.testrightangle(paths[pacnt], previdx2, previdx, pcnt, nextidx, nextidx2)) {
                    if (ins[pacnt].points.length > 0) {
                        ins[pacnt].points[ins[pacnt].points.length - 1].linesegment = this.getdirection(ins[pacnt].points[ins[pacnt].points.length - 1].x, ins[pacnt].points[ins[pacnt].points.length - 1].y, paths[pacnt].points[pcnt].x, paths[pacnt].points[pcnt].y);
                    }
                    ins[pacnt].points.push({
                        x: paths[pacnt].points[pcnt].x,
                        y: paths[pacnt].points[pcnt].y,
                        linesegment: this.getdirection(paths[pacnt].points[pcnt].x, paths[pacnt].points[pcnt].y, ((paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2), ((paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2))
                    });
                }
                ins[pacnt].points.push({
                    x: ((paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2),
                    y: ((paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2),
                    linesegment: this.getdirection(((paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2), ((paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2), ((paths[pacnt].points[nextidx].x + paths[pacnt].points[nextidx2].x) / 2), ((paths[pacnt].points[nextidx].y + paths[pacnt].points[nextidx2].y) / 2))
                });
            }
        }
        return ins;
    };
    ImageTracer.prototype.testrightangle = function (path, idx1, idx2, idx3, idx4, idx5) {
        return (((path.points[idx3].x === path.points[idx1].x) &&
            (path.points[idx3].x === path.points[idx2].x) &&
            (path.points[idx3].y === path.points[idx4].y) &&
            (path.points[idx3].y === path.points[idx5].y)) ||
            ((path.points[idx3].y === path.points[idx1].y) &&
                (path.points[idx3].y === path.points[idx2].y) &&
                (path.points[idx3].x === path.points[idx4].x) &&
                (path.points[idx3].x === path.points[idx5].x)));
    };
    ImageTracer.prototype.getdirection = function (x1, y1, x2, y2) {
        var val = 8;
        if (x1 < x2) {
            if (y1 < y2) {
                val = 1;
            }
            else if (y1 > y2) {
                val = 7;
            }
            else {
                val = 0;
            }
        }
        else if (x1 > x2) {
            if (y1 < y2) {
                val = 3;
            }
            else if (y1 > y2) {
                val = 5;
            }
            else {
                val = 4;
            }
        }
        else if (y1 < y2) {
            val = 2;
        }
        else if (y1 > y2) {
            val = 6;
        }
        else {
            val = 8;
        }
        return val;
    };
    ImageTracer.prototype.batchinternodes = function (bpaths, options) {
        var binternodes = [];
        for (var k in bpaths) {
            if (!bpaths.hasOwnProperty(k)) {
                continue;
            }
            binternodes[k] = this.internodes(bpaths[k], options);
        }
        return binternodes;
    };
    ImageTracer.prototype.tracepath = function (path, ltres, qtres) {
        var pcnt = 0;
        var segtype1;
        var segtype2;
        var seqend;
        var smp = {};
        smp.segments = [];
        smp.boundingbox = path.boundingbox;
        smp.holechildren = path.holechildren;
        smp.isholepath = path.isholepath;
        while (pcnt < path.points.length) {
            segtype1 = path.points[pcnt].linesegment;
            segtype2 = -1;
            seqend = pcnt + 1;
            while (((path.points[seqend].linesegment === segtype1) || (path.points[seqend].linesegment === segtype2) || (segtype2 === -1)) && (seqend < path.points.length - 1)) {
                if ((path.points[seqend].linesegment !== segtype1) && (segtype2 === -1)) {
                    segtype2 = path.points[seqend].linesegment;
                }
                seqend += 1;
            }
            if (seqend === path.points.length - 1) {
                seqend = 0;
            }
            smp.segments = smp.segments.concat(this.fitseq(path, ltres, qtres, pcnt, seqend));
            if (seqend > 0) {
                pcnt = seqend;
            }
            else {
                pcnt = path.points.length;
            }
        }
        return smp;
    };
    ImageTracer.prototype.fitseq = function (path, ltres, qtres, seqstart, seqend) {
        if ((seqend > path.points.length) || (seqend < 0)) {
            return [];
        }
        var errorpoint = seqstart, errorval = 0, curvepass = true, px, py, dist2;
        var tl = (seqend - seqstart);
        if (tl < 0) {
            tl += path.points.length;
        }
        var vx = (path.points[seqend].x - path.points[seqstart].x) / tl, vy = (path.points[seqend].y - path.points[seqstart].y) / tl;
        var pcnt = (seqstart + 1) % path.points.length, pl;
        while (pcnt != seqend) {
            pl = pcnt - seqstart;
            if (pl < 0) {
                pl += path.points.length;
            }
            px = path.points[seqstart].x + vx * pl;
            py = path.points[seqstart].y + vy * pl;
            dist2 = (path.points[pcnt].x - px) * (path.points[pcnt].x - px) + (path.points[pcnt].y - py) * (path.points[pcnt].y - py);
            if (dist2 > ltres) {
                curvepass = false;
            }
            if (dist2 > errorval) {
                errorpoint = pcnt;
                errorval = dist2;
            }
            pcnt = (pcnt + 1) % path.points.length;
        }
        if (curvepass) {
            return [{ type: 'L',
                    x1: path.points[seqstart].x,
                    y1: path.points[seqstart].y,
                    x2: path.points[seqend].x,
                    y2: path.points[seqend].y }];
        }
        var fitpoint = errorpoint;
        curvepass = true;
        errorval = 0;
        var t = (fitpoint - seqstart) / tl, t1 = (1 - t) * (1 - t), t2 = 2 * (1 - t) * t, t3 = t * t;
        var cpx = (t1 * path.points[seqstart].x + t3 * path.points[seqend].x - path.points[fitpoint].x) / -t2, cpy = (t1 * path.points[seqstart].y + t3 * path.points[seqend].y - path.points[fitpoint].y) / -t2;
        pcnt = seqstart + 1;
        while (pcnt != seqend) {
            t = (pcnt - seqstart) / tl;
            t1 = (1 - t) * (1 - t);
            t2 = 2 * (1 - t) * t;
            t3 = t * t;
            px = t1 * path.points[seqstart].x + t2 * cpx + t3 * path.points[seqend].x;
            py = t1 * path.points[seqstart].y + t2 * cpy + t3 * path.points[seqend].y;
            dist2 = (path.points[pcnt].x - px) * (path.points[pcnt].x - px) + (path.points[pcnt].y - py) * (path.points[pcnt].y - py);
            if (dist2 > qtres) {
                curvepass = false;
            }
            if (dist2 > errorval) {
                errorpoint = pcnt;
                errorval = dist2;
            }
            pcnt = (pcnt + 1) % path.points.length;
        }
        if (curvepass) {
            return [{ type: 'Q',
                    x1: path.points[seqstart].x,
                    y1: path.points[seqstart].y,
                    x2: cpx,
                    y2: cpy,
                    x3: path.points[seqend].x,
                    y3: path.points[seqend].y }];
        }
        var splitpoint = fitpoint;
        return this.fitseq(path, ltres, qtres, seqstart, splitpoint).concat(this.fitseq(path, ltres, qtres, splitpoint, seqend));
    };
    ImageTracer.prototype.batchtracepaths = function (internodepaths, ltres, qtres) {
        var btracedpaths = [];
        for (var k in internodepaths) {
            if (!internodepaths.hasOwnProperty(k)) {
                continue;
            }
            btracedpaths.push(this.tracepath(internodepaths[k], ltres, qtres));
        }
        return btracedpaths;
    };
    ImageTracer.prototype.batchtracelayers = function (binternodes, ltres, qtres) {
        var btbis = [];
        for (var k in binternodes) {
            if (!binternodes.hasOwnProperty(k)) {
                continue;
            }
            btbis[k] = this.batchtracepaths(binternodes[k], ltres, qtres);
        }
        return btbis;
    };
    ImageTracer.prototype.roundtodec = function (val, places) {
        return Number(val.toFixed(places));
    };
    ImageTracer.prototype.svgpathstring = function (tracedata, lnum, pathnum, options) {
        var layer = tracedata.layers[lnum], smp = layer[pathnum], str = '', pcnt;
        if (options.linefilter && (smp.segments.length < 3)) {
            return str;
        }
        str = "<path " + (options.desc ? ("desc=\"l " + lnum + " p " + pathnum + "\" ") : '') + this.tosvgcolorstr(tracedata.palette[lnum], options) + "d=\"";
        if (options.roundcoords === -1) {
            str += "M " + smp.segments[0].x1 * options.scale + " " + smp.segments[0].y1 * options.scale + " ";
            for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
                str += smp.segments[pcnt].type + " " + smp.segments[pcnt].x2 * options.scale + " " + smp.segments[pcnt].y2 * options.scale + " ";
                if (smp.segments[pcnt].hasOwnProperty('x3')) {
                    str += smp.segments[pcnt].x3 * options.scale + " " + smp.segments[pcnt].y3 * options.scale + " ";
                }
            }
            str += 'Z ';
        }
        else {
            str += "M " + this.roundtodec(smp.segments[0].x1 * options.scale, options.roundcoords) + " " + this.roundtodec(smp.segments[0].y1 * options.scale, options.roundcoords) + " ";
            for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
                str += smp.segments[pcnt].type + " " + this.roundtodec(smp.segments[pcnt].x2 * options.scale, options.roundcoords) + " " + this.roundtodec(smp.segments[pcnt].y2 * options.scale, options.roundcoords) + " ";
                if (smp.segments[pcnt].hasOwnProperty('x3')) {
                    str += this.roundtodec(smp.segments[pcnt].x3 * options.scale, options.roundcoords) + " " + this.roundtodec(smp.segments[pcnt].y3 * options.scale, options.roundcoords) + " ";
                }
            }
            str += 'Z ';
        }
        for (var hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
            var hsmp = layer[smp.holechildren[hcnt]];
            if (options.roundcoords === -1) {
                if (hsmp.segments[hsmp.segments.length - 1].hasOwnProperty('x3')) {
                    str += "M " + hsmp.segments[hsmp.segments.length - 1].x3 * options.scale + " " + hsmp.segments[hsmp.segments.length - 1].y3 * options.scale + " ";
                }
                else {
                    str += "M " + hsmp.segments[hsmp.segments.length - 1].x2 * options.scale + " " + hsmp.segments[hsmp.segments.length - 1].y2 * options.scale + " ";
                }
                for (pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
                    str += hsmp.segments[pcnt].type + " ";
                    if (hsmp.segments[pcnt].hasOwnProperty('x3')) {
                        str += hsmp.segments[pcnt].x2 * options.scale + " " + hsmp.segments[pcnt].y2 * options.scale + " ";
                    }
                    str += hsmp.segments[pcnt].x1 * options.scale + " " + hsmp.segments[pcnt].y1 * options.scale + " ";
                }
            }
            else {
                if (hsmp.segments[hsmp.segments.length - 1].hasOwnProperty('x3')) {
                    str += "M " + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].x3 * options.scale) + " " + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].y3 * options.scale) + " ";
                }
                else {
                    str += "M " + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].x2 * options.scale) + " " + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].y2 * options.scale) + " ";
                }
                for (pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
                    str += hsmp.segments[pcnt].type + " ";
                    if (hsmp.segments[pcnt].hasOwnProperty('x3')) {
                        str += this.roundtodec(hsmp.segments[pcnt].x2 * options.scale) + " " + this.roundtodec(hsmp.segments[pcnt].y2 * options.scale) + " ";
                    }
                    str += this.roundtodec(hsmp.segments[pcnt].x1 * options.scale) + " " + this.roundtodec(hsmp.segments[pcnt].y1 * options.scale) + " ";
                }
            }
            str += 'Z ';
        }
        str += '" />';
        if (options.lcpr || options.qcpr) {
            for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
                if (smp.segments[pcnt].hasOwnProperty('x3') && options.qcpr) {
                    str += "<circle cx=\"" + smp.segments[pcnt].x2 * options.scale + "\" cy=\"" + smp.segments[pcnt].y2 * options.scale + "\" r=\"" + options.qcpr + "\" fill=\"cyan\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"black\" />";
                    str += "<circle cx=\"" + smp.segments[pcnt].x3 * options.scale + "\" cy=\"" + smp.segments[pcnt].y3 * options.scale + "\" r=\"" + options.qcpr + "\" fill=\"white\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"black\" />";
                    str += "<line x1=\"" + smp.segments[pcnt].x1 * options.scale + "\" y1=\"" + smp.segments[pcnt].y1 * options.scale + "\" x2=\"" + smp.segments[pcnt].x2 * options.scale + "\" y2=\"" + smp.segments[pcnt].y2 * options.scale + "\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"cyan\" />";
                    str += "<line x1=\"" + smp.segments[pcnt].x2 * options.scale + "\" y1=\"" + smp.segments[pcnt].y2 * options.scale + "\" x2=\"" + smp.segments[pcnt].x3 * options.scale + "\" y2=\"" + smp.segments[pcnt].y3 * options.scale + "\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"cyan\" />";
                }
                if ((!smp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr) {
                    str += "<circle cx=\"" + smp.segments[pcnt].x2 * options.scale + "\" cy=\"" + smp.segments[pcnt].y2 * options.scale + "\" r=\"" + options.lcpr + "\" fill=\"white\" stroke-width=\"" + options.lcpr * 0.2 + "\" stroke=\"black\" />";
                }
            }
            for (var hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
                var hsmp = layer[smp.holechildren[hcnt]];
                for (pcnt = 0; pcnt < hsmp.segments.length; pcnt++) {
                    if (hsmp.segments[pcnt].hasOwnProperty('x3') && options.qcpr) {
                        str += "<circle cx=\"" + hsmp.segments[pcnt].x2 * options.scale + "\" cy=\"" + hsmp.segments[pcnt].y2 * options.scale + "\" r=\"" + options.qcpr + "\" fill=\"cyan\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"black\" />";
                        str += "<circle cx=\"" + hsmp.segments[pcnt].x3 * options.scale + "\" cy=\"" + hsmp.segments[pcnt].y3 * options.scale + "\" r=\"" + options.qcpr + "\" fill=\"white\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"black\" />";
                        str += "<line x1=\"" + hsmp.segments[pcnt].x1 * options.scale + "\" y1=\"" + hsmp.segments[pcnt].y1 * options.scale + "\" x2=\"" + hsmp.segments[pcnt].x2 * options.scale + "\" y2=\"" + hsmp.segments[pcnt].y2 * options.scale + "\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"cyan\" />";
                        str += "<line x1=\"" + hsmp.segments[pcnt].x2 * options.scale + "\" y1=\"" + hsmp.segments[pcnt].y2 * options.scale + "\" x2=\"" + hsmp.segments[pcnt].x3 * options.scale + "\" y2=\"" + hsmp.segments[pcnt].y3 * options.scale + "\" stroke-width=\"" + options.qcpr * 0.2 + "\" stroke=\"cyan\" />";
                    }
                    if ((!hsmp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr) {
                        str += "<circle cx=\"" + hsmp.segments[pcnt].x2 * options.scale + "\" cy=\"" + hsmp.segments[pcnt].y2 * options.scale + "\" r=\"" + options.lcpr + "\" fill=\"white\" stroke-width=\"" + options.lcpr * 0.2 + "\" stroke=\"black\" />";
                    }
                }
            }
        }
        return str;
    };
    ImageTracer.prototype.getsvgstring = function (tracedata, options) {
        options = this.checkoptions(options);
        var w = tracedata.width * options.scale;
        var h = tracedata.height * options.scale;
        var svgstr = "<svg " + (options.viewbox ? ("viewBox=\"0 0 " + w + " " + h + "\" ") : ("width=\"" + w + "\" height=\"" + h + "\" ")) + "version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" desc=\"Created with imagetracer.js version " + this.versionnumber + "\" >";
        for (var lcnt = 0; lcnt < tracedata.layers.length; lcnt += 1) {
            for (var pcnt = 0; pcnt < tracedata.layers[lcnt].length; pcnt += 1) {
                if (!tracedata.layers[lcnt][pcnt].isholepath) {
                    svgstr += this.svgpathstring(tracedata, lcnt, pcnt, options);
                }
            }
        }
        svgstr += '</svg>';
        return svgstr;
    };
    ImageTracer.prototype.compareNumbers = function (a, b) {
        return a - b;
    };
    ImageTracer.prototype.torgbastr = function (c) {
        return "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")";
    };
    ImageTracer.prototype.tosvgcolorstr = function (c, options) {
        return "fill=\"rgb(" + c.r + "," + c.g + "," + c.b + ")\" stroke=\"rgb(" + c.r + "," + c.g + "," + c.b + ")\" stroke-width=\"" + options.strokewidth + "\" opacity=\"" + c.a / 255.0 + "\" ";
    };
    ImageTracer.prototype.appendSVGString = function (svgstr, parentid) {
        var div;
        if (parentid) {
            div = document.getElementById(parentid);
            if (!div) {
                div = document.createElement('div');
                div.id = parentid;
                document.body.appendChild(div);
            }
        }
        else {
            div = document.createElement('div');
            document.body.appendChild(div);
        }
        div.innerHTML += svgstr;
    };
    ImageTracer.prototype.blur = function (imgd, radius, delta) {
        var i, j, k, d, idx, racc, gacc, bacc, aacc, wacc;
        var imgd2 = { width: imgd.width,
            height: imgd.height,
            data: [] };
        radius = Math.floor(radius);
        if (radius < 1) {
            return imgd;
        }
        if (radius > 5) {
            radius = 5;
        }
        delta = Math.abs(delta);
        if (delta > 1024) {
            delta = 1024;
        }
        var thisgk = this.gks[radius - 1];
        for (j = 0; j < imgd.height; j++) {
            for (i = 0; i < imgd.width; i++) {
                racc = 0;
                gacc = 0;
                bacc = 0;
                aacc = 0;
                wacc = 0;
                for (k = -radius; k < radius + 1; k++) {
                    if ((i + k > 0) && (i + k < imgd.width)) {
                        idx = (j * imgd.width + i + k) * 4;
                        racc += imgd.data[idx] * thisgk[k + radius];
                        gacc += imgd.data[idx + 1] * thisgk[k + radius];
                        bacc += imgd.data[idx + 2] * thisgk[k + radius];
                        aacc += imgd.data[idx + 3] * thisgk[k + radius];
                        wacc += thisgk[k + radius];
                    }
                }
                idx = (j * imgd.width + i) * 4;
                imgd2.data[idx] = Math.floor(racc / wacc);
                imgd2.data[idx + 1] = Math.floor(gacc / wacc);
                imgd2.data[idx + 2] = Math.floor(bacc / wacc);
                imgd2.data[idx + 3] = Math.floor(aacc / wacc);
            }
        }
        var himgd = new Uint8ClampedArray(imgd2.data);
        for (j = 0; j < imgd.height; j++) {
            for (i = 0; i < imgd.width; i++) {
                racc = 0;
                gacc = 0;
                bacc = 0;
                aacc = 0;
                wacc = 0;
                for (k = -radius; k < radius + 1; k++) {
                    if ((j + k > 0) && (j + k < imgd.height)) {
                        idx = ((j + k) * imgd.width + i) * 4;
                        racc += himgd[idx] * thisgk[k + radius];
                        gacc += himgd[idx + 1] * thisgk[k + radius];
                        bacc += himgd[idx + 2] * thisgk[k + radius];
                        aacc += himgd[idx + 3] * thisgk[k + radius];
                        wacc += thisgk[k + radius];
                    }
                }
                idx = (j * imgd.width + i) * 4;
                imgd2.data[idx] = Math.floor(racc / wacc);
                imgd2.data[idx + 1] = Math.floor(gacc / wacc);
                imgd2.data[idx + 2] = Math.floor(bacc / wacc);
                imgd2.data[idx + 3] = Math.floor(aacc / wacc);
            }
        }
        for (j = 0; j < imgd.height; j++) {
            for (i = 0; i < imgd.width; i++) {
                idx = (j * imgd.width + i) * 4;
                d = Math.abs(imgd2.data[idx] - imgd.data[idx]) + Math.abs(imgd2.data[idx + 1] - imgd.data[idx + 1]) +
                    Math.abs(imgd2.data[idx + 2] - imgd.data[idx + 2]) + Math.abs(imgd2.data[idx + 3] - imgd.data[idx + 3]);
                if (d > delta) {
                    imgd2.data[idx] = imgd.data[idx];
                    imgd2.data[idx + 1] = imgd.data[idx + 1];
                    imgd2.data[idx + 2] = imgd.data[idx + 2];
                    imgd2.data[idx + 3] = imgd.data[idx + 3];
                }
            }
        }
        return imgd2;
    };
    ImageTracer.prototype.loadImage = function (url, callback, options) {
        var img = new Image();
        if (options && options.corsenabled) {
            img.crossOrigin = 'Anonymous';
        }
        img.src = url;
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            callback(canvas);
        };
    };
    ImageTracer.prototype.getImgdata = function (canvas) {
        var context = canvas.getContext('2d');
        return context.getImageData(0, 0, canvas.width, canvas.height);
    };
    ImageTracer.prototype.drawLayers = function (layers, palette, scale, parentid) {
        scale = scale || 1;
        var w, h, i, j, k;
        var div;
        if (parentid) {
            div = document.getElementById(parentid);
            if (!div) {
                div = document.createElement('div');
                div.id = parentid;
                document.body.appendChild(div);
            }
        }
        else {
            div = document.createElement('div');
            document.body.appendChild(div);
        }
        for (k in layers) {
            if (!layers.hasOwnProperty(k)) {
                continue;
            }
            w = layers[k][0].length;
            h = layers[k].length;
            var canvas = document.createElement('canvas');
            canvas.width = w * scale;
            canvas.height = h * scale;
            var context = canvas.getContext('2d');
            for (j = 0; j < h; j += 1) {
                for (i = 0; i < w; i += 1) {
                    context.fillStyle = this.torgbastr(palette[layers[k][j][i] % palette.length]);
                    context.fillRect(i * scale, j * scale, scale, scale);
                }
            }
            div.appendChild(canvas);
        }
    };
    return ImageTracer;
}());
exports.default = ImageTracer;
//# sourceMappingURL=imagetracer.js.map