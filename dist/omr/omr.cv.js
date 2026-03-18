"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "analyzeOmrImageLocal", {
    enumerable: true,
    get: function() {
        return analyzeOmrImageLocal;
    }
});
const _opencvjs = /*#__PURE__*/ _interop_require_wildcard(require("@techstark/opencv-js"));
const _canvas = require("canvas");
const _sharp = /*#__PURE__*/ _interop_require_default(require("sharp"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// We'll use this reference for the initialized OpenCV instance
let cv = _opencvjs;
// Wait for OpenCV to initialize
// Wait for OpenCV to initialize
async function ensureCVReady() {
    console.log('[OMR CV] Checking OpenCV readiness...');
    // 1. Check if our global 'cv' reference is already initialized
    if (cv && cv.getBuildInformation && typeof cv.getBuildInformation === 'function') {
        console.log('[OMR CV] OpenCV already ready.');
        return true;
    }
    console.log('[OMR CV] Initializing using require("@techstark/opencv-js")...');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cvLib = require('@techstark/opencv-js');
    console.log(`[OMR CV] cvLib type: ${typeof cvLib}. IsPromise: ${cvLib instanceof Promise}. HasBuildInfo: ${!!(cvLib && cvLib.getBuildInformation)} (${typeof (cvLib && cvLib.getBuildInformation)})`);
    // 2. CHECK IMMEDIATE READINESS FIRST (VERY IMPORTANT!)
    // In some Node.js environments, the library object is already functional 
    // but also has a .then property that NEVER resolves if we await it!
    if (cvLib && cvLib.getBuildInformation) {
        cv = cvLib;
        console.log('[OMR CV] OpenCV already ready (immediate check).');
        return true;
    }
    // 3. Handle Promise/Thenable only if not already ready
    if (cvLib instanceof Promise || cvLib && typeof cvLib.then === 'function') {
        console.log('[OMR CV] Awaiting OpenCV Promise/Thenable...');
        try {
            // Use race for a safety timeout during await
            const result = await Promise.race([
                cvLib,
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('Promise Timeout')), 5000))
            ]);
            cv = result;
            console.log('[OMR CV] OpenCV initialized from Promise.');
            return true;
        } catch  {
            console.warn('[OMR CV] Promise/Thenable failed or timed out. Falling back to callback/polling.');
        }
    }
    // 4. Fallback for callback-based initialization with polling
    return new Promise((resolve)=>{
        console.log('[OMR CV] Waiting for callback/polling...');
        cvLib.onRuntimeInitialized = ()=>{
            cv = cvLib;
            console.log('[OMR CV] OpenCV initialized via callback.');
            resolve();
        };
        // Safety polling
        const interval = setInterval(()=>{
            if (cvLib.getBuildInformation && typeof cvLib.getBuildInformation === 'function') {
                clearInterval(interval);
                cv = cvLib;
                console.log('[OMR CV] OpenCV ready via polling.');
                resolve();
            }
        }, 500);
        setTimeout(()=>{
            clearInterval(interval);
            if (!(cv && cv.getBuildInformation)) {
                console.error('[OMR CV] OpenCV initialization timed out after 15s!');
            }
            resolve();
        }, 15000);
    });
}
async function analyzeOmrImageLocal(buffer, totalQuestions) {
    console.log(`[OMR CV] Starting analysis for ${totalQuestions} questions...`);
    await ensureCVReady();
    // Resize the image to a standardized height for consistent contour detection
    console.log('[OMR CV] Resizing image...');
    const resizedBuffer = await (0, _sharp.default)(buffer).resize({
        height: 3000,
        withoutEnlargement: true
    }).toBuffer();
    const image = await (0, _canvas.loadImage)(resizedBuffer);
    const canvas = (0, _canvas.createCanvas)(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('[OMR CV] Converting to OpenCV Mat...');
    const src = cv.matFromImageData(imgData);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    const blurred = new cv.Mat();
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
    console.log('[OMR CV] Detecting contours...');
    const edges = new cv.Mat();
    cv.Canny(blurred, edges, 75, 200);
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    // Find largest valid contour (the bounding box of the grid)
    let maxArea = 0;
    let maxContour = null;
    console.log(`[OMR CV] Found ${contours.size()} contours. Filtering for largest...`);
    for(let i = 0; i < contours.size(); i++){
        const cnt = contours.get(i);
        const area = cv.contourArea(cnt);
        if (area > maxArea) {
            maxArea = area;
            if (maxContour) maxContour.delete();
            maxContour = cnt.clone();
        }
    }
    if (!maxContour) {
        console.error('[OMR CV] No valid contour found!');
        src.delete();
        gray.delete();
        blurred.delete();
        edges.delete();
        contours.delete();
        hierarchy.delete();
        throw new Error('Could not find OMR grid on the image. Ensure the image is clear and the full RESPONSES box is visible.');
    }
    const approx = new cv.Mat();
    cv.approxPolyDP(maxContour, approx, 0.02 * cv.arcLength(maxContour, true), true);
    if (approx.rows !== 4) {
        src.delete();
        gray.delete();
        blurred.delete();
        edges.delete();
        contours.delete();
        hierarchy.delete();
        maxContour.delete();
        approx.delete();
        throw new Error('OMR Grid is not rectangular. Please upload a flatter, unskewed image.');
    }
    console.log('[OMR CV] Applying perspective transformation...');
    // 3. Perspective Transform
    const pts = [];
    for(let i = 0; i < 4; i++){
        pts.push({
            x: Number(approx.data32S[i * 2]),
            y: Number(approx.data32S[i * 2 + 1])
        });
    }
    // Sort points: top-left, top-right, bottom-right, bottom-left
    pts.sort((a, b)=>a.y - b.y);
    const topList = pts.slice(0, 2).sort((a, b)=>a.x - b.x);
    const bottomList = pts.slice(2, 4).sort((a, b)=>b.x - a.x);
    const sortedPts = [
        ...topList,
        ...bottomList
    ];
    const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
        sortedPts[0].x,
        sortedPts[0].y,
        sortedPts[1].x,
        sortedPts[1].y,
        sortedPts[2].x,
        sortedPts[2].y,
        sortedPts[3].x,
        sortedPts[3].y
    ]);
    const w = 1200;
    const h = 2400;
    const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
        0,
        0,
        w,
        0,
        w,
        h,
        0,
        h
    ]);
    const M = cv.getPerspectiveTransform(srcTri, dstTri);
    const warped = new cv.Mat();
    cv.warpPerspective(src, warped, M, new cv.Size(w, h));
    // Memory cleanup of setup Phase
    src.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
    if (maxContour) maxContour.delete();
    approx.delete();
    srcTri.delete();
    dstTri.delete();
    M.delete();
    // BUBBLE DETECTION PHASE
    let qcols = 4;
    let rowsPerCol = 45;
    let startXOffsetRatio = 1.5 / 5.5;
    let bubbleSpacingRatio = 1 / 5.5;
    let bubbleWidthRatio = 1 / 5.5;
    let rowCropRatio = 0.85;
    if (totalQuestions === 80) {
        // Class 9 and 10
        qcols = 2;
        rowsPerCol = 40;
        startXOffsetRatio = 75 / 600; // 0.125
        bubbleSpacingRatio = 40 / 600; // 0.066
        bubbleWidthRatio = 35 / 600; // 0.058
        rowCropRatio = 0.75;
    } else if (totalQuestions === 70) {
        // Class 6 to 8
        qcols = 2;
        rowsPerCol = 35;
        startXOffsetRatio = 75 / 600;
        bubbleSpacingRatio = 40 / 600;
        bubbleWidthRatio = 35 / 600;
        rowCropRatio = 0.7;
    }
    console.log('[OMR CV] Analyzing bubbles...');
    const colWidth = w / qcols;
    const rowHeight = h / rowsPerCol;
    const allDetectedAnswers = [];
    for(let c = 0; c < qcols; c++){
        const qStartPos = c * rowsPerCol + 1;
        if (qStartPos > totalQuestions) break;
        for(let r = 0; r < rowsPerCol; r++){
            const qNum = qStartPos + r;
            if (qNum > totalQuestions) break;
            const markedOptions = [];
            for(let b = 0; b < 4; b++){
                // approximate bounding box around the bubble using scaling ratios
                const bx = Math.floor(c * colWidth + colWidth * startXOffsetRatio + b * colWidth * bubbleSpacingRatio);
                const by = Math.floor(r * rowHeight);
                const bw = Math.floor(colWidth * bubbleWidthRatio);
                const bh = Math.floor(rowHeight * rowCropRatio);
                // Read smaller center chunk to avoid outline circles
                const rect = new cv.Rect(bx + Math.floor(bw * 0.2), by + Math.floor(bh * 0.2), Math.floor(bw * 0.6), Math.floor(bh * 0.6));
                const bubbleMat = warped.roi(rect);
                const bubbleGray = new cv.Mat();
                cv.cvtColor(bubbleMat, bubbleGray, cv.COLOR_RGBA2GRAY);
                // Invert so dark ink becomes high values
                cv.threshold(bubbleGray, bubbleGray, 120, 255, cv.THRESH_BINARY_INV);
                const meanDarkness = cv.mean(bubbleGray)[0]; // 0-255
                // Threshold: adjust based on ink darkness testing
                if (meanDarkness > 70) {
                    markedOptions.push((b + 1).toString());
                }
                bubbleMat.delete();
                bubbleGray.delete();
            }
            allDetectedAnswers.push({
                number: qNum,
                answer: markedOptions.length > 0 ? markedOptions.join(',') : '-'
            });
        }
    }
    warped.delete();
    console.log(`[OMR CV] Analysis complete. Detected ${allDetectedAnswers.length} questions.`);
    allDetectedAnswers.sort((a, b)=>a.number - b.number);
    return allDetectedAnswers;
}

//# sourceMappingURL=omr.cv.js.map