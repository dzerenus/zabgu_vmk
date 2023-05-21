/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\n\n// Загрузка изображения\nvar reader = new FileReader();\nvar loadImage = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('loadfile'));\nreader.onload = function (e) {\n    var image = new Image();\n    image.src = e.target.result;\n    image.onload = function () {\n        var canvas = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('image-canvas'));\n        var context = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(canvas.getContext('2d'));\n        context.drawImage(image, 0, 0);\n    };\n};\nloadImage.onchange = function () {\n    var loadedFile = loadImage.files[0];\n    if (loadedFile == null) {\n        return;\n    }\n    var nameParts = loadedFile.name.split('.');\n    if (nameParts[nameParts.length - 1] !== 'jpg' && nameParts[nameParts.length - 1] !== 'png') {\n        loadImage.value = null;\n        return;\n    }\n    reader.readAsDataURL(loadedFile);\n};\n// Подсчёт пикселей.\nvar rPixels = [];\nvar gPixels = [];\nvar bPixels = [];\nfunction fillZero(pixelArray) {\n    pixelArray.length = 0;\n    for (var index = 0; index < 256; index++) {\n        pixelArray.push(0);\n    }\n}\nfunction drawGraphic(pixels, color, canvas, scale) {\n    var rect = canvas.getBoundingClientRect();\n    var context = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(canvas.getContext('2d'));\n    context.clearRect(0, 0, rect.width, rect.height);\n    context.lineWidth = 1;\n    context.strokeStyle = color;\n    context.beginPath();\n    var minY = rect.height;\n    for (var x = 0; x < pixels.length; x++) {\n        var maxY = rect.height - pixels[x] * scale;\n        context.moveTo(x, minY);\n        if (maxY < 0) {\n            context.lineTo(x, 0);\n        }\n        else {\n            context.lineTo(x, maxY);\n        }\n    }\n    context.stroke();\n}\n// Нажатие на кнопку.\nvar button = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('proceedButton'));\nvar scaleElement = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('scale'));\nbutton.onclick = function () {\n    var _a;\n    var scale = Number.parseInt(scaleElement.value) / 100;\n    if (scale == null || !Number.isFinite(scale)) {\n        alert('Введите нормальное число!');\n        return;\n    }\n    fillZero(rPixels);\n    fillZero(gPixels);\n    fillZero(bPixels);\n    var canvas = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('image-canvas'));\n    var context = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(canvas.getContext('2d'));\n    var imgdata = (_a = context.getImageData(0, 0, 200, 200)) === null || _a === void 0 ? void 0 : _a.data;\n    if (imgdata == null) {\n        alert('Не задана картинка!');\n        return;\n    }\n    for (var i = 0; i < imgdata.length; i += 4) {\n        rPixels[imgdata[i]]++;\n        gPixels[imgdata[i + 1]]++;\n        bPixels[imgdata[i + 2]]++;\n    }\n    var rCanvas = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('rcanvas'));\n    var gCanvas = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('gcanvas'));\n    var bCanvas = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('bcanvas'));\n    drawGraphic(rPixels, '#FF0000', rCanvas, scale);\n    drawGraphic(gPixels, '#00FF00', gCanvas, scale);\n    drawGraphic(bPixels, '#0000FF', bCanvas, scale);\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/lang.ts":
/*!*********************!*\
  !*** ./src/lang.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"present\": () => (/* binding */ present)\n/* harmony export */ });\nfunction present(value) {\n    if (value == null) {\n        throw new Error('Value is null!');\n    }\n    return value;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/lang.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;