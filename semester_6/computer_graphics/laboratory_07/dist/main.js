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

/***/ "./src/controls.ts":
/*!*************************!*\
  !*** ./src/controls.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autoButton\": () => (/* binding */ autoButton),\n/* harmony export */   \"downButton\": () => (/* binding */ downButton),\n/* harmony export */   \"leftButton\": () => (/* binding */ leftButton),\n/* harmony export */   \"rightButton\": () => (/* binding */ rightButton),\n/* harmony export */   \"upButton\": () => (/* binding */ upButton),\n/* harmony export */   \"xInput\": () => (/* binding */ xInput),\n/* harmony export */   \"yInput\": () => (/* binding */ yInput),\n/* harmony export */   \"zInput\": () => (/* binding */ zInput),\n/* harmony export */   \"zLeftButton\": () => (/* binding */ zLeftButton),\n/* harmony export */   \"zRightButton\": () => (/* binding */ zRightButton)\n/* harmony export */ });\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\n\nvar upButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('up-btn'));\nvar leftButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('left-btn'));\nvar autoButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('auto-btn'));\nvar downButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('down-btn'));\nvar rightButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('right-btn'));\nvar zLeftButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('zleft-btn'));\nvar zRightButton = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('zright-btn'));\nvar xInput = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('x-input'));\nvar yInput = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('y-input'));\nvar zInput = (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(document.getElementById('z-input'));\n\n\n//# sourceURL=webpack://my-webpack-project/./src/controls.ts?");

/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"anchor\": () => (/* binding */ anchor),\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"rotation\": () => (/* binding */ rotation)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\nvar cameraPosition = {\n    x: 0,\n    y: 0,\n    z: 100\n};\nvar cameraDistance = 300;\nvar anchor = {\n    x: 0,\n    y: 0,\n    z: 0\n};\nvar rotation = {\n    x: 0,\n    y: 0,\n    z: 0\n};\nfunction render(models) {\n    var canvas = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCanvas)();\n    var rect = canvas.getBoundingClientRect();\n    var ctx = (0,_lang__WEBPACK_IMPORTED_MODULE_1__.present)(canvas.getContext('2d'));\n    var centerX = rect.width / 2;\n    var centerY = rect.height / 2;\n    ctx.clearRect(0, 0, rect.width, rect.height);\n    var _loop_1 = function (model) {\n        ctx.strokeStyle = \"#000000\";\n        var extendedPolygons = model.polygons.map(function (x) {\n            var points = x.points.map(function (x) { return rotateX(rotateY(subPoint(x, anchor), rotation.y), rotation.x); });\n            var result = {\n                color: x.color,\n                points: points,\n                center: polygonCenter(points),\n                normale: getNormale(points)\n            };\n            return result;\n        });\n        var figureCenter = getFigureCenter(extendedPolygons.map(function (x) { return x.center; }));\n        var index = 0;\n        extendedPolygons.forEach(function (x) {\n            x.skalar = figureCenter.x * x.normale.x + figureCenter.y * x.normale.y + figureCenter.z * x.normale.z;\n            if (x.skalar <= 0) {\n                x.normale = {\n                    x: x.normale.x * -1,\n                    y: x.normale.y * -1,\n                    z: x.normale.z * -1,\n                };\n            }\n            if (index == 0) {\n                x.normale = {\n                    x: x.normale.x * -1,\n                    y: x.normale.y * -1,\n                    z: x.normale.z * -1,\n                };\n            }\n            index++;\n        });\n        extendedPolygons.forEach(function (x) {\n            x.skalar = x.normale.x * cameraPosition.x + x.normale.y * cameraPosition.y + x.normale.z * cameraPosition.z;\n        });\n        extendedPolygons.sort(function (a, b) { return a.skalar - b.skalar; });\n        for (var _a = 0, extendedPolygons_1 = extendedPolygons; _a < extendedPolygons_1.length; _a++) {\n            var v = extendedPolygons_1[_a];\n            if (v.skalar <= 0) {\n                continue;\n            }\n            var points = v.points.map(function (x) { return translateTo2D(x); });\n            ctx.fillStyle = v.color;\n            ctx.beginPath();\n            for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {\n                var point = points_1[_b];\n                ctx.lineTo(centerX + point.x, centerY - point.y);\n            }\n            ctx.fill();\n            ctx.closePath();\n            ctx.stroke();\n        }\n    };\n    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {\n        var model = models_1[_i];\n        _loop_1(model);\n    }\n}\nfunction addPoint(p1, p2) {\n    var result = {\n        x: p1.x + p2.x,\n        y: p1.y + p2.y,\n        z: p1.z + p2.z,\n    };\n    return result;\n}\nfunction subPoint(p1, p2) {\n    var result = {\n        x: p1.x - p2.x,\n        y: p1.y - p2.y,\n        z: p1.z - p2.z,\n    };\n    return result;\n}\nfunction getNormale(points) {\n    var first = {\n        x: points[points.length - 1].x - points[0].x,\n        y: points[points.length - 1].y - points[0].y,\n        z: points[points.length - 1].z - points[0].z,\n    };\n    var second = {\n        x: points[1].x - points[0].x,\n        y: points[1].y - points[0].y,\n        z: points[1].z - points[0].z,\n    };\n    return {\n        x: first.y * second.z - first.z * second.y,\n        y: first.z * second.x - first.x * second.z,\n        z: first.x * second.y - first.y * second.x,\n    };\n}\nfunction getFigureCenter(input) {\n    var xPointsSum = 0;\n    var yPointsSum = 0;\n    var zPointsSum = 0;\n    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {\n        var point = input_1[_i];\n        xPointsSum += point.x;\n        yPointsSum += point.y;\n        zPointsSum += point.z;\n    }\n    return {\n        x: xPointsSum / input.length,\n        y: yPointsSum / input.length,\n        z: zPointsSum / input.length,\n    };\n}\nfunction polygonCenter(input) {\n    var xPointsSum = 0;\n    var yPointsSum = 0;\n    var zPointsSum = 0;\n    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {\n        var point = input_2[_i];\n        xPointsSum += point.x;\n        yPointsSum += point.y;\n        zPointsSum += point.z;\n    }\n    return {\n        x: xPointsSum / input.length,\n        y: yPointsSum / input.length,\n        z: zPointsSum / input.length,\n    };\n}\nfunction rotateX(v, angle) {\n    var result = __assign({}, v);\n    result.y = v.y * Math.cos(angle) + v.z * Math.sin(angle);\n    result.z = v.z * Math.cos(angle) - v.y * Math.sin(angle);\n    return result;\n}\nfunction rotateY(v, angle) {\n    var result = __assign({}, v);\n    result.x = v.x * Math.cos(angle) + v.z * Math.sin(angle);\n    result.z = v.z * Math.cos(angle) - v.x * Math.sin(angle);\n    return result;\n}\nfunction translateTo2D(point) {\n    var px = point.x - cameraPosition.x;\n    var py = point.y - cameraPosition.y;\n    var pz = point.z - cameraPosition.z;\n    var y = cameraDistance * py / pz;\n    var x = cameraDistance * px / pz;\n    return {\n        x: x,\n        y: y,\n        z: 0\n    };\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/engine.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCanvas\": () => (/* binding */ getCanvas)\n/* harmony export */ });\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\n\nfunction getCanvas() {\n    var canvas = document.getElementById('canvas');\n    return (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(canvas);\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/helpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine */ \"./src/engine.ts\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls */ \"./src/controls.ts\");\n\n\n\n\nvar models = [];\nmodels.push((0,_models__WEBPACK_IMPORTED_MODULE_0__.createPyramid)(8));\nsetInterval(function () { return (0,_engine__WEBPACK_IMPORTED_MODULE_2__.render)(models); }, 16);\nvar isRotating = false;\nvar direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Left;\n_controls__WEBPACK_IMPORTED_MODULE_3__.leftButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_3__.leftButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Left;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.rightButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_3__.rightButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Right;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.upButton.onmouseup = function () {\n    isRotating = false;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.upButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Up;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.downButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_3__.downButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Down;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.zLeftButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_3__.zLeftButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.ZLeft;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_3__.zRightButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_3__.zRightButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_1__.Directions.ZRight;\n    isRotating = true;\n};\n(0,_engine__WEBPACK_IMPORTED_MODULE_2__.render)(models);\nvar prevAnchor = { x: 0, y: 0, z: 0 };\nvar rotateAngle = Math.PI / 180 * 1;\nsetInterval(function () {\n    if (isRotating) {\n        var anchore = {\n            x: Number(_controls__WEBPACK_IMPORTED_MODULE_3__.xInput.value),\n            y: Number(_controls__WEBPACK_IMPORTED_MODULE_3__.yInput.value),\n            z: Number(_controls__WEBPACK_IMPORTED_MODULE_3__.zInput.value)\n        };\n        if (prevAnchor !== _engine__WEBPACK_IMPORTED_MODULE_2__.anchor) {\n            _engine__WEBPACK_IMPORTED_MODULE_2__.anchor.x = anchore.x;\n            _engine__WEBPACK_IMPORTED_MODULE_2__.anchor.y = anchore.y;\n            _engine__WEBPACK_IMPORTED_MODULE_2__.anchor.z = anchore.z;\n        }\n        ;\n        switch (direction) {\n            case _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Up:\n                _engine__WEBPACK_IMPORTED_MODULE_2__.rotation.x += 0.02;\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Down:\n                _engine__WEBPACK_IMPORTED_MODULE_2__.rotation.x -= 0.02;\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Left:\n                _engine__WEBPACK_IMPORTED_MODULE_2__.rotation.y += 0.02;\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_1__.Directions.Right:\n                _engine__WEBPACK_IMPORTED_MODULE_2__.rotation.y -= 0.02;\n                break;\n            // case Directions.ZLeft:\n            //     cube.rotateZ(rotateAngle);\n            //     break;\n            // case Directions.ZRight:\n            //     cube.rotateZ(-rotateAngle);\n            //     break;\n        }\n        (0,_engine__WEBPACK_IMPORTED_MODULE_2__.render)(models);\n    }\n}, 10);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/lang.ts":
/*!*********************!*\
  !*** ./src/lang.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"present\": () => (/* binding */ present)\n/* harmony export */ });\nfunction present(input) {\n    if (input == null) {\n        throw new Error();\n    }\n    return input;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/lang.ts?");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPyramid\": () => (/* binding */ createPyramid)\n/* harmony export */ });\nfunction createPyramid(angleCount) {\n    if (angleCount < 3) {\n        throw new Error();\n    }\n    var polygons = [];\n    var upPoint = { x: 0, y: 40, z: 0 };\n    polygons.push({ color: getColor(), points: [] });\n    for (var i = 0; i < angleCount; i++) {\n        var z = 20 * Math.cos((2 * Math.PI * i) / angleCount);\n        var x = 20 * Math.sin((2 * Math.PI * i) / angleCount);\n        polygons[0].points.push({ x: x, y: 0, z: z });\n    }\n    for (var i = 1; i < polygons[0].points.length; i++) {\n        polygons.push({\n            color: getColor(),\n            points: [polygons[0].points[i - 1], polygons[0].points[i], upPoint]\n        });\n    }\n    polygons.push({\n        color: getColor(),\n        points: [polygons[1].points[0], polygons[polygons.length - 1].points[1], upPoint]\n    });\n    var result = {\n        polygons: polygons,\n    };\n    return result;\n}\nvar index = 0;\nvar colors = [\"#AAFFFF\", \"#AAAAFF\", \"#AAAAAA\", \"#bf5a5a\", \"#22c98c\", \"#7dbd59\", \"#c434cf\", \"#c6d65e\"];\nfunction getColor() {\n    index++;\n    if (index == colors.length) {\n        index = 0;\n    }\n    return colors[index];\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/models.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Directions\": () => (/* binding */ Directions)\n/* harmony export */ });\nvar Directions;\n(function (Directions) {\n    Directions[Directions[\"Up\"] = 0] = \"Up\";\n    Directions[Directions[\"Down\"] = 1] = \"Down\";\n    Directions[Directions[\"Left\"] = 2] = \"Left\";\n    Directions[Directions[\"Right\"] = 3] = \"Right\";\n    Directions[Directions[\"ZLeft\"] = 4] = \"ZLeft\";\n    Directions[Directions[\"ZRight\"] = 5] = \"ZRight\";\n})(Directions || (Directions = {}));\n\n\n//# sourceURL=webpack://my-webpack-project/./src/types.ts?");

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