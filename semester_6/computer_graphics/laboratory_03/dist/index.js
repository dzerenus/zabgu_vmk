define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawMode = void 0;
    var DrawMode;
    (function (DrawMode) {
        DrawMode["Dots"] = "dots";
        DrawMode["Pen"] = "pen";
    })(DrawMode = exports.DrawMode || (exports.DrawMode = {}));
});
define("index", ["require", "exports", "types"], function (require, exports, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pixels = [];
    let drawMode = types_1.DrawMode.Pen;
    let isMouseDown = false;
    let isRotating = false;
    const canvas = document.getElementById('canvas');
    const rotateButton = document.getElementById('rotate');
    const modeSelector = document.getElementById('mode-select');
    if (canvas == null || rotateButton == null || modeSelector == null) {
        throw new Error('HTML elements are null.');
    }
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
        throw new Error('Context is null.');
    }
    const Draw = (pixs) => {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const pixel of pixs) {
            if (drawMode == types_1.DrawMode.Dots) {
                ctx.lineTo(pixel.x, pixel.y);
            }
            else {
                ctx.moveTo(pixel.x, pixel.y);
                ctx.lineTo(pixel.x + 1, pixel.y);
                ctx.lineTo(pixel.x, pixel.y + 1);
                ctx.lineTo(pixel.x + 1, pixel.y + 1);
            }
        }
        ctx.stroke();
    };
    rotateButton.onclick = () => {
        isRotating = !isRotating;
        let angle = 0;
        const interval = setInterval(() => {
            const newPixels = [];
            const rect = canvas.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            for (const pixel of pixels) {
                const x = (pixel.x - centerX) * Math.cos(angle) - (pixel.y - centerX) * Math.sin(angle);
                const y = (pixel.x - centerX) * Math.sin(angle) + (pixel.y - centerX) * Math.cos(angle);
                newPixels.push({
                    x: x + centerX,
                    y: y + centerY
                });
            }
            Draw(newPixels);
            angle += 0.03;
            if (!isRotating) {
                clearInterval(interval);
            }
        }, 10);
    };
    canvas.onmousedown = e => {
        const rect = canvas.getBoundingClientRect();
        const mode = modeSelector.value;
        if (mode != drawMode) {
            drawMode = mode;
            pixels.length = 0;
        }
        if (drawMode === types_1.DrawMode.Dots) {
            const x = e.x - rect.left;
            const y = e.y - rect.top;
            pixels.push({ x: x, y: y });
            Draw(pixels);
        }
        else {
            isMouseDown = true;
        }
    };
    canvas.onmouseup = () => {
        isMouseDown = false;
    };
    canvas.onmousemove = e => {
        if (!isMouseDown) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const x = e.x - rect.left;
        const y = e.y - rect.top;
        pixels.push({ x: x, y: y });
        Draw(pixels);
    };
});
//# sourceMappingURL=index.js.map