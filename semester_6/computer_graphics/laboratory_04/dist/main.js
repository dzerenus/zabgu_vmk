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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\n\n\nvar cameraPosition = {\n    x: 0,\n    y: 0,\n    z: 100\n};\nvar cameraDistance = 300;\nfunction render(models) {\n    var canvas = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCanvas)();\n    var rect = canvas.getBoundingClientRect();\n    var ctx = (0,_lang__WEBPACK_IMPORTED_MODULE_1__.present)(canvas.getContext('2d'));\n    var centerX = rect.width / 2;\n    var centerY = rect.height / 2;\n    ctx.clearRect(0, 0, rect.width, rect.height);\n    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {\n        var model = models_1[_i];\n        ctx.beginPath();\n        ctx.strokeStyle = \"#000000\";\n        for (var _a = 0, _b = model.edges; _a < _b.length; _a++) {\n            var v = _b[_a];\n            var p1 = translateTo2D(v.p1);\n            var p2 = translateTo2D(v.p2);\n            if (centerX < Math.abs(p1.x) && centerX < Math.abs(p2.x)) {\n            }\n            if (centerY < Math.abs(p1.y) && centerY < Math.abs(p2.y)) {\n            }\n            if (centerY < Math.abs(p1.y)) {\n                var offset = Math.abs(p1.y) - centerY;\n                var step = p1.x / p1.y;\n                p1.x -= step * offset;\n            }\n            if (centerY < Math.abs(p2.y)) {\n                var offset = Math.abs(p2.y) - centerY;\n                var step = p2.x / p2.y;\n                p2.x -= step * offset;\n            }\n            ctx.moveTo(centerX + p1.x, centerY - p1.y);\n            ctx.lineTo(centerX + p2.x, centerY - p2.y);\n        }\n        ctx.closePath();\n        ctx.stroke();\n    }\n}\nfunction translateTo2D(point) {\n    var px = point.x - cameraPosition.x;\n    var py = point.y - cameraPosition.y;\n    var pz = point.z - cameraPosition.z;\n    var y = cameraDistance * py / pz;\n    var x = cameraDistance * px / pz;\n    return {\n        x: x,\n        y: y,\n        z: 0\n    };\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/engine.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createAxis\": () => (/* binding */ createAxis),\n/* harmony export */   \"createCube\": () => (/* binding */ createCube),\n/* harmony export */   \"getCanvas\": () => (/* binding */ getCanvas)\n/* harmony export */ });\n/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ \"./src/lang.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\n\nfunction getCanvas() {\n    var canvas = document.getElementById('canvas');\n    return (0,_lang__WEBPACK_IMPORTED_MODULE_0__.present)(canvas);\n}\nfunction createAxis(size) {\n    var result = {\n        position: { x: 0, y: 0, z: 0 },\n        anchor: { x: 0, y: 0, z: 0 },\n        angle: { x: 0, y: 0, z: 0 },\n        edges: [],\n        color: \"#0000AA90\"\n    };\n    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: size, y: 0, z: 0 } });\n    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: 0, y: size, z: 0 } });\n    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: 0, y: 0, z: size } });\n    return new _types__WEBPACK_IMPORTED_MODULE_1__.Model(result.anchor, result.angle, result.edges);\n}\nfunction createCube(size) {\n    var points = [];\n    var yMultiplier = 1;\n    var xMultiplier = 1;\n    var zMultiplier = 1;\n    for (var i = 0; i < 8; i++) {\n        var point = {\n            x: size / 2 * xMultiplier,\n            y: size / 2 * yMultiplier,\n            z: size / 2 * zMultiplier,\n        };\n        points.push(point);\n        if (i % 4 == 0) {\n            xMultiplier *= -1;\n        }\n        if (i % 2 == 0) {\n            yMultiplier *= -1;\n        }\n        zMultiplier *= -1;\n    }\n    var edges = [];\n    var alreadyConnected = [];\n    var _loop_1 = function (p1) {\n        var connectedTo = points.filter(function (x) { return isTwoVecrtorsSame(p1, x); });\n        var _loop_2 = function (p2) {\n            if (edges.filter(function (x) { return x.p1 === p2 && x.p2 === p1; }).length > 0) {\n                return \"continue\";\n            }\n            edges.push({ p1: p1, p2: p2 });\n            alreadyConnected.push(p2);\n        };\n        for (var _a = 0, connectedTo_1 = connectedTo; _a < connectedTo_1.length; _a++) {\n            var p2 = connectedTo_1[_a];\n            _loop_2(p2);\n        }\n    };\n    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {\n        var p1 = points_1[_i];\n        _loop_1(p1);\n    }\n    var cube = {\n        position: { x: 0, y: 0, z: 0 },\n        anchor: { x: 0, y: 0, z: 0 },\n        angle: { x: 0, y: 0, z: 0 },\n        edges: edges,\n    };\n    return new _types__WEBPACK_IMPORTED_MODULE_1__.Model(cube.anchor, cube.angle, cube.edges);\n}\nfunction isTwoVecrtorsSame(a, b) {\n    var isTwoCoordinatesSame = a.x === b.x && ((a.y === b.y && a.z !== b.z) || (a.z === b.z && a.y !== b.y))\n        || a.y === b.y && ((a.x === b.x && a.z !== b.z) || (a.z === b.z && a.x !== b.x))\n        || a.z === b.z && ((a.y === b.y && a.x !== b.x) || (a.x === b.x && a.y !== b.y));\n    return isTwoCoordinatesSame;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/helpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ \"./src/controls.ts\");\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./engine */ \"./src/engine.ts\");\n\n\n\n\nvar isRotating = false;\nvar direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Left;\n_controls__WEBPACK_IMPORTED_MODULE_2__.leftButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_2__.leftButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Left;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.rightButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_2__.rightButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Right;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.upButton.onmouseup = function () {\n    isRotating = false;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.upButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Up;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.downButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_2__.downButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Down;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.zLeftButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_2__.zLeftButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.ZLeft;\n    isRotating = true;\n};\n_controls__WEBPACK_IMPORTED_MODULE_2__.zRightButton.onmouseup = function () { return isRotating = false; };\n_controls__WEBPACK_IMPORTED_MODULE_2__.zRightButton.onmousedown = function () {\n    direction = _types__WEBPACK_IMPORTED_MODULE_0__.Directions.ZRight;\n    isRotating = true;\n};\nvar cube = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createCube)(30);\nvar models = [];\nmodels.push(cube);\n(0,_engine__WEBPACK_IMPORTED_MODULE_3__.render)(models);\nvar prevDirection = direction;\nvar prevAnchor = { x: 0, y: 0, z: 0 };\n_controls__WEBPACK_IMPORTED_MODULE_2__.autoButton.onclick = function () {\n    cube = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createCube)(30);\n    models = [];\n    models.push(cube);\n    (0,_engine__WEBPACK_IMPORTED_MODULE_3__.render)(models);\n    prevDirection = direction;\n    prevAnchor = { x: 0, y: 0, z: 0 };\n};\nvar rotateAngle = Math.PI / 180 * 1;\nsetInterval(function () {\n    if (isRotating) {\n        var anchor = {\n            x: Number(_controls__WEBPACK_IMPORTED_MODULE_2__.xInput.value),\n            y: Number(_controls__WEBPACK_IMPORTED_MODULE_2__.yInput.value),\n            z: Number(_controls__WEBPACK_IMPORTED_MODULE_2__.zInput.value)\n        };\n        if (prevAnchor !== cube.anchor) {\n            cube.anchor = anchor;\n        }\n        ;\n        switch (direction) {\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Up:\n                cube.rotateX(-rotateAngle);\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Down:\n                cube.rotateX(rotateAngle);\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Left:\n                cube.rotateY(rotateAngle);\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.Right:\n                cube.rotateY(-rotateAngle);\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.ZLeft:\n                cube.rotateZ(rotateAngle);\n                break;\n            case _types__WEBPACK_IMPORTED_MODULE_0__.Directions.ZRight:\n                cube.rotateZ(-rotateAngle);\n                break;\n        }\n        (0,_engine__WEBPACK_IMPORTED_MODULE_3__.render)(models);\n    }\n}, 10);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/lang.ts":
/*!*********************!*\
  !*** ./src/lang.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"present\": () => (/* binding */ present)\n/* harmony export */ });\nfunction present(input) {\n    if (input == null) {\n        throw new Error();\n    }\n    return input;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/lang.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Directions\": () => (/* binding */ Directions),\n/* harmony export */   \"Model\": () => (/* binding */ Model)\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar Directions;\n(function (Directions) {\n    Directions[Directions[\"Up\"] = 0] = \"Up\";\n    Directions[Directions[\"Down\"] = 1] = \"Down\";\n    Directions[Directions[\"Left\"] = 2] = \"Left\";\n    Directions[Directions[\"Right\"] = 3] = \"Right\";\n    Directions[Directions[\"ZLeft\"] = 4] = \"ZLeft\";\n    Directions[Directions[\"ZRight\"] = 5] = \"ZRight\";\n})(Directions || (Directions = {}));\nvar Model = /** @class */ (function () {\n    function Model(anchor, angle, edges) {\n        this.anchor = anchor;\n        this.angle = angle;\n        this.edges = edges;\n    }\n    Model.prototype.rotateX = function (angle) {\n        for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {\n            var edge = _a[_i];\n            edge.p1 = subPoint(edge.p1, this.anchor);\n            edge.p2 = subPoint(edge.p2, this.anchor);\n            var newP1 = rotateX(edge.p1, angle);\n            var newP2 = rotateX(edge.p2, angle);\n            edge.p1 = addPoint(newP1, this.anchor);\n            edge.p2 = addPoint(newP2, this.anchor);\n            this.angle.x += angle;\n        }\n    };\n    Model.prototype.rotateY = function (angle) {\n        for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {\n            var edge = _a[_i];\n            edge.p1 = subPoint(edge.p1, this.anchor);\n            edge.p2 = subPoint(edge.p2, this.anchor);\n            var newP1 = rotateY(edge.p1, angle);\n            var newP2 = rotateY(edge.p2, angle);\n            edge.p1 = addPoint(newP1, this.anchor);\n            edge.p2 = addPoint(newP2, this.anchor);\n            this.angle.y += angle;\n        }\n    };\n    Model.prototype.rotateZ = function (angle) {\n        for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {\n            var edge = _a[_i];\n            edge.p1 = subPoint(edge.p1, this.anchor);\n            edge.p2 = subPoint(edge.p2, this.anchor);\n            var newP1 = rotateZ(edge.p1, angle);\n            var newP2 = rotateZ(edge.p2, angle);\n            edge.p1 = addPoint(newP1, this.anchor);\n            edge.p2 = addPoint(newP2, this.anchor);\n            ;\n            this.angle.z += angle;\n        }\n    };\n    return Model;\n}());\n\nfunction addPoint(p1, p2) {\n    var result = {\n        x: p1.x + p2.x,\n        y: p1.y + p2.y,\n        z: p1.z + p2.z,\n    };\n    return result;\n}\nfunction subPoint(p1, p2) {\n    var result = {\n        x: p1.x - p2.x,\n        y: p1.y - p2.y,\n        z: p1.z - p2.z,\n    };\n    return result;\n}\nfunction rotateX(v, angle) {\n    var result = __assign({}, v);\n    result.y = v.y * Math.cos(angle) + v.z * Math.sin(angle);\n    result.z = v.z * Math.cos(angle) - v.y * Math.sin(angle);\n    return result;\n}\nfunction rotateY(v, angle) {\n    var result = __assign({}, v);\n    result.x = v.x * Math.cos(angle) + v.z * Math.sin(angle);\n    result.z = v.z * Math.cos(angle) - v.x * Math.sin(angle);\n    return result;\n}\nfunction rotateZ(v, angle) {\n    var result = __assign({}, v);\n    result.x = v.x * Math.cos(angle) + v.y * Math.sin(angle);\n    result.y = v.y * Math.cos(angle) - v.x * Math.sin(angle);\n    return result;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/types.ts?");

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