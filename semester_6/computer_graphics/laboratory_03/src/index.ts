import { DrawMode, IPixel } from './types';

const pixels: IPixel[] = [];
let drawMode: DrawMode = DrawMode.Pen;
let isMouseDown = false;
let isRotating = false;

const canvas = document.getElementById('canvas');
const rotateButton = document.getElementById('rotate');
const modeSelector = document.getElementById('mode-select');

if (canvas == null || rotateButton == null || modeSelector == null) {
    throw new Error('HTML elements are null.');
}

const ctx = (canvas as HTMLCanvasElement).getContext('2d');

if (ctx == null) {
    throw new Error('Context is null.');
}

const Draw = (pixs: IPixel[]) => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (const pixel of pixs) {
        if (drawMode == DrawMode.Dots) {
            ctx.lineTo(pixel.x, pixel.y);
        } else {
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
        const newPixels: IPixel[] = [];

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
}

canvas.onmousedown = e => {
    const rect = canvas.getBoundingClientRect();
    const mode = (modeSelector as HTMLSelectElement).value;

    if (mode != drawMode) {
        drawMode = mode as DrawMode;
        pixels.length = 0;
    }

    if (drawMode === DrawMode.Dots) {
        const x = e.x - rect.left;
        const y = e.y - rect.top;
    
        pixels.push({ x: x, y: y });
        Draw(pixels);
    } else {
        isMouseDown = true;
    }
}

canvas.onmouseup = () => {
    isMouseDown = false;
}

canvas.onmousemove = e => {
    if (!isMouseDown) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.x - rect.left;
    const y = e.y - rect.top;
    
    pixels.push({ x: x, y: y });
    Draw(pixels);
}