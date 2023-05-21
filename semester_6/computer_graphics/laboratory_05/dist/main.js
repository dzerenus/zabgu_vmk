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

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCanvasElement\": () => (/* binding */ getCanvasElement),\n/* harmony export */   \"getClearButton\": () => (/* binding */ getClearButton),\n/* harmony export */   \"getDrawColor\": () => (/* binding */ getDrawColor),\n/* harmony export */   \"getFillColor\": () => (/* binding */ getFillColor),\n/* harmony export */   \"present\": () => (/* binding */ present)\n/* harmony export */ });\nvar canvasElement;\nvar drawColorElement;\nvar fillColorElement;\nvar clearButtonElement;\nfunction getCanvasElement() {\n    if (canvasElement == null) {\n        var element = present(document.getElementById('canvas'));\n        canvasElement = element;\n    }\n    return canvasElement;\n}\nfunction getDrawColor() {\n    if (drawColorElement == null) {\n        var element = present(document.getElementById('drawcolor'));\n        drawColorElement = element;\n    }\n    return present(drawColorElement.value);\n}\nfunction getFillColor() {\n    if (fillColorElement == null) {\n        var element = present(document.getElementById('fillcolor'));\n        fillColorElement = element;\n    }\n    return present(fillColorElement.value);\n}\nfunction getClearButton() {\n    if (clearButtonElement == null) {\n        var element = present(document.getElementById('clearButton'));\n        clearButtonElement = element;\n    }\n    return clearButtonElement;\n}\nfunction present(value) {\n    if (value == null) {\n        throw new Error('Value is null.');\n    }\n    return value;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/helper.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/helper.ts\");\n\n\nvar fieldSize = {\n    x: 300,\n    y: 300,\n};\nvar fieldPixels = [];\nclearPixels();\n(0,_helper__WEBPACK_IMPORTED_MODULE_1__.getClearButton)().onclick = function () {\n    clearPixels();\n    clearCanvas();\n};\nvar isMouseDown = false;\nvar drawColor = '';\nvar lastPixel;\nvar canvas = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getCanvasElement)();\nvar rect = canvas.getBoundingClientRect();\nvar context = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.present)(canvas.getContext('2d'));\ncontext.lineWidth = 1;\ndocument.addEventListener(\"contextmenu\", function (e) {\n    e.preventDefault();\n}, false);\ncanvas.onmousedown = function (e) {\n    if (e.button === _types__WEBPACK_IMPORTED_MODULE_0__.MouseButtons.Left) {\n        isMouseDown = true;\n        drawColor = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getDrawColor)();\n    }\n    if (e.button === _types__WEBPACK_IMPORTED_MODULE_0__.MouseButtons.Right) {\n        var x = Math.floor(e.x - rect.left);\n        var y = Math.floor(e.y - rect.top);\n        var cPixel = fieldPixels[y][x];\n        var fillColor = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getFillColor)();\n        var defColor = cPixel.color;\n        var notFilled = getNotFilled(cPixel, defColor, fillColor);\n        console.time('test');\n        while (notFilled.length > 0) {\n            notFilled[0].color = fillColor;\n            drawPixel(notFilled[0]);\n            var newCells = getNotFilled(notFilled[0], defColor, fillColor);\n            for (var _i = 0, newCells_1 = newCells; _i < newCells_1.length; _i++) {\n                var nCell = newCells_1[_i];\n                if (!notFilled.includes(nCell)) {\n                    notFilled.push(nCell);\n                }\n            }\n            notFilled.shift();\n        }\n        console.timeEnd('test');\n        cPixel.color = fillColor;\n        drawPixel(cPixel);\n    }\n};\nfunction getNotFilled(pixel, defaultColor, color) {\n    var result = [];\n    if (pixel.x > 0) {\n        var left = fieldPixels[pixel.y][pixel.x - 1];\n        if (left.color === defaultColor && left.color !== color) {\n            result.push(left);\n        }\n    }\n    if (pixel.y > 0) {\n        var up = fieldPixels[pixel.y - 1][pixel.x];\n        if (up.color === defaultColor && up.color !== color) {\n            result.push(up);\n        }\n    }\n    if (pixel.x < fieldSize.x - 1) {\n        var right = fieldPixels[pixel.y][pixel.x + 1];\n        if (right.color === defaultColor && right.color !== color) {\n            result.push(right);\n        }\n    }\n    if (pixel.y < fieldSize.y - 1) {\n        var down = fieldPixels[pixel.y + 1][pixel.x];\n        if (down.color === defaultColor && down.color !== color) {\n            result.push(down);\n        }\n    }\n    return result;\n}\ncanvas.onmousemove = function (e) {\n    if (!isMouseDown) {\n        return;\n    }\n    var x = Math.floor(e.x - rect.left);\n    var y = Math.floor(e.y - rect.top);\n    if (lastPixel != null) {\n        var xOffset = lastPixel.x - x;\n        var yOffset = lastPixel.y - y;\n        var l = Math.abs(xOffset) > Math.abs(yOffset) ? Math.abs(xOffset) : Math.abs(yOffset);\n        var dx = xOffset / l;\n        var dy = yOffset / l;\n        for (var i = 0; i < l; i++) {\n            var xIndex = Math.floor(dx * i + x);\n            var yIndex = Math.floor(dy * i + y);\n            fieldPixels[yIndex][xIndex].color = drawColor;\n            drawPixel(fieldPixels[yIndex][xIndex]);\n        }\n    }\n    fieldPixels[y][x].color = drawColor;\n    drawPixel(fieldPixels[y][x]);\n    lastPixel = fieldPixels[y][x];\n};\ncanvas.onmouseup = function () { return disableDrawing(); };\ncanvas.onmouseleave = function () { return disableDrawing(); };\nfunction disableDrawing() {\n    isMouseDown = false;\n    lastPixel = null;\n}\nfunction drawPixel(pixel) {\n    context.fillStyle = pixel.color;\n    context.fillRect(pixel.x, pixel.y, 1, 1);\n}\nfunction clearCanvas() {\n    context.clearRect(0, 0, rect.width, rect.height);\n}\nfunction clearPixels() {\n    fieldPixels.length = 0;\n    for (var y = 0; y < fieldSize.y; y++) {\n        var row = [];\n        for (var x = 0; x < fieldSize.x; x++) {\n            var pixel = {\n                x: x,\n                y: y,\n                color: '#FFFFFF'\n            };\n            row.push(pixel);\n        }\n        fieldPixels.push(row);\n    }\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseButtons\": () => (/* binding */ MouseButtons)\n/* harmony export */ });\nvar MouseButtons;\n(function (MouseButtons) {\n    MouseButtons[MouseButtons[\"Left\"] = 0] = \"Left\";\n    MouseButtons[MouseButtons[\"Wheel\"] = 1] = \"Wheel\";\n    MouseButtons[MouseButtons[\"Right\"] = 2] = \"Right\";\n})(MouseButtons || (MouseButtons = {}));\n\n\n//# sourceURL=webpack://my-webpack-project/./src/types.ts?");

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