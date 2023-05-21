import { IPixel, MouseButtons } from './types';
import { getCanvasElement, getClearButton, getDrawColor, getFillColor, present } from './helper';

const fieldSize = {
    x: 300,
    y: 300,
};

const fieldPixels: IPixel[][] = [];
clearPixels();

getClearButton().onclick = () => {
    clearPixels();
    clearCanvas();
}

let isMouseDown = false;
let drawColor = '';
let lastPixel: IPixel | null;
const canvas = getCanvasElement();
const rect = canvas.getBoundingClientRect();
const context = present(canvas.getContext('2d'));
context.lineWidth = 1;

document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);

canvas.onmousedown = (e) => {
    if (e.button === MouseButtons.Left) {
        isMouseDown = true;
        drawColor = getDrawColor();
    } 

    if (e.button === MouseButtons.Right) {
        const x = Math.floor(e.x - rect.left);
        const y = Math.floor(e.y - rect.top);

        const cPixel = fieldPixels[y][x];
        const fillColor = getFillColor();
        const defColor = cPixel.color;

        let notFilled = getNotFilled(cPixel, defColor, fillColor);

        console.time('test');

        while(notFilled.length > 0) {
            notFilled[0].color = fillColor;
            drawPixel(notFilled[0]);

            const newCells = getNotFilled(notFilled[0], defColor, fillColor);

            for (const nCell of newCells) {
                if (!notFilled.includes(nCell)) {
                    notFilled.push(nCell);
                }
            }

            notFilled.shift();
        }

        console.timeEnd('test');

        cPixel.color = fillColor;
        drawPixel(cPixel);
    }
}

function getNotFilled(pixel: IPixel, defaultColor: string, color: string): IPixel[] {
    const result: IPixel[] = [];

    if (pixel.x > 0) {
        const left = fieldPixels[pixel.y][pixel.x - 1];
        if (left.color === defaultColor && left.color !== color) {
                result.push(left);
        }
    }

    if (pixel.y > 0) {
        const up = fieldPixels[pixel.y - 1][pixel.x];
        if (up.color === defaultColor && up.color !== color) {
                result.push(up);
        }
    }

    if (pixel.x < fieldSize.x - 1) {
        const right = fieldPixels[pixel.y][pixel.x + 1];
        if (right.color === defaultColor && right.color !== color) {
                result.push(right);
        }
    }

    if (pixel.y < fieldSize.y - 1) {
        const down = fieldPixels[pixel.y + 1][pixel.x];
        if (down.color === defaultColor && down.color !== color) {
                result.push(down);
        }
    }

    return result;
}

canvas.onmousemove = (e) => {
    if (!isMouseDown) {
        return;
    }

    const x = Math.floor(e.x - rect.left);
    const y = Math.floor(e.y - rect.top);

    if (lastPixel != null) {
        const xOffset = lastPixel.x - x;
        const yOffset = lastPixel.y - y;

        const l = Math.abs(xOffset) > Math.abs(yOffset) ? Math.abs(xOffset) : Math.abs(yOffset);

        const dx = xOffset / l;
        const dy = yOffset / l;

        for (let i = 0; i < l; i++) {
            const xIndex = Math.floor(dx * i + x);
            const yIndex = Math.floor(dy * i + y);

            fieldPixels[yIndex][xIndex].color = drawColor;
            drawPixel(fieldPixels[yIndex][xIndex]);
        }
    }

    fieldPixels[y][x].color = drawColor;
    drawPixel(fieldPixels[y][x]);

    lastPixel = fieldPixels[y][x];
}

canvas.onmouseup = () => disableDrawing();
canvas.onmouseleave = () => disableDrawing();

function disableDrawing() {
    isMouseDown = false;
    lastPixel = null;
}

function drawPixel(pixel: IPixel) {
    context.fillStyle = pixel.color;
    context.fillRect(pixel.x, pixel.y, 1, 1);
}

function clearCanvas() {
    context.clearRect(0, 0, rect.width, rect.height);
}

function clearPixels() {
    fieldPixels.length = 0;

    for (let y = 0; y < fieldSize.y; y++) {
        const row: IPixel[] = [];
    
        for (let x = 0; x < fieldSize.x; x++) {
            const pixel: IPixel = {
                x: x,
                y: y,
                color: '#FFFFFF'
            };
    
            row.push(pixel);
        }
    
        fieldPixels.push(row);
    }
}