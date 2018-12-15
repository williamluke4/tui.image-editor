export default class ImageTracer {
    versionnumber: any;
    optionpresets: any;
    pathscan_combined_lookup: any;
    gks: any;
    specpalette: any;
    static tracerDefaultOption(): {
        pathomit: number;
        ltres: number;
        qtres: number;
        scale: number;
        strokewidth: number;
        viewbox: boolean;
        linefilter: boolean;
        desc: boolean;
        rightangleenhance: boolean;
        pal: {
            r: number;
            g: number;
            b: number;
            a: number;
        }[];
    };
    constructor();
    imageToSVG(url: any, callback: any, options: any): void;
    imagedataToSVG(imgd: any, options: any): string;
    imageToTracedata(url: any, callback: any, options: any): void;
    imagedataToTracedata(imgd: any, options: any): {
        layers: any[];
        palette: any;
        width: any;
        height: any;
    };
    checkoptions(options: any): any;
    colorquantization(imgd: any, options: any): {
        array: any[][];
        palette: any;
    };
    samplepalette(numberofcolors: any, imgd: any): {
        r: any;
        g: any;
        b: any;
        a: any;
    }[];
    samplepalette2(numberofcolors: any, imgd: any): {
        r: any;
        g: any;
        b: any;
        a: any;
    }[];
    generatepalette(numberofcolors: any): {
        r: number;
        g: number;
        b: number;
        a: number;
    }[];
    layering(ii: any): any[][];
    layeringstep(ii: any, cnum: any): any[][];
    pathscan(arr: any, pathomit: any): {}[];
    boundingboxincludes(parentbbox: any, childbbox: any): boolean;
    batchpathscan(layers: any, pathomit: any): any[];
    internodes(paths: any, options: any): {}[];
    testrightangle(path: any, idx1: any, idx2: any, idx3: any, idx4: any, idx5: any): boolean;
    getdirection(x1: any, y1: any, x2: any, y2: any): number;
    batchinternodes(bpaths: any, options: any): any[];
    tracepath(path: any, ltres: any, qtres: any): {};
    fitseq(path: any, ltres: any, qtres: any, seqstart: any, seqend: any): any;
    batchtracepaths(internodepaths: any, ltres: any, qtres: any): {}[];
    batchtracelayers(binternodes: any, ltres: any, qtres: any): any[];
    roundtodec(val: any, places?: any): number;
    svgpathstring(tracedata: any, lnum: any, pathnum: any, options: any): string;
    getsvgstring(tracedata: any, options: any): string;
    compareNumbers(a: any, b: any): number;
    torgbastr(c: any): string;
    tosvgcolorstr(c: any, options: any): string;
    appendSVGString(svgstr: any, parentid: any): void;
    blur(imgd: any, radius: any, delta: any): any;
    loadImage(url: any, callback: any, options: any): void;
    getImgdata(canvas: any): any;
    drawLayers(layers: any, palette: any, scale: any, parentid: any): void;
}
