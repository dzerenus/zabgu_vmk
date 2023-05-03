"use strict";
const canvas = document.getElementById('canvas');
const inputX1 = document.getElementById('input-x1');
const inputX2 = document.getElementById('input-x2');
const inputY1 = document.getElementById('input-y1');
const inputY2 = document.getElementById('input-y2');
const drawBtn = document.getElementById('create-btn');
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
if (canvas == null || inputX1 == null || inputX2 == null
    || inputY1 == null || inputY2 == null || drawBtn == null
    || ctx == null)
    throw new Error();
const points = [];
let point1;
let point2;
drawBtn.onclick = () => {
    let x1;
    let y1;
    let x2;
    let y2;
    if (inputX1.value === '') {
        inputX1.value = (-100).toString();
    }
    if (inputX2.value === '') {
        inputX2.value = (100).toString();
    }
    if (inputY1.value === '') {
        inputY1.value = (-100).toString();
    }
    if (inputY2.value === '') {
        inputY2.value = (100).toString();
    }
    x1 = Number(inputX1.value);
    x2 = Number(inputX2.value);
    y1 = Number(inputY1.value);
    y2 = Number(inputY2.value);
    point1 = {
        x: x1,
        y: y1
    };
    point2 = {
        x: x2,
        y: y2
    };
    points.length = 0;
    draw();
};
canvas.onclick = e => {
    const size = canvas.getBoundingClientRect();
    const x = e.clientX - size.left - size.width / 2;
    const y = e.clientY - size.top - size.height / 2;
    points.push({ x: x, y: y });
    draw();
};
function draw() {
    if (ctx == null) {
        return;
    }
    const size = canvas.getBoundingClientRect();
    const center = {
        x: size.width / 2,
        y: size.height / 2
    };
    ctx.clearRect(0, 0, size.width, size.height);
    if (point1 != null && point2 != null) {
        const startX = point1.x <= point2.x ? point1.x : point2.x;
        const endX = point1.x === startX ? point2.x : point1.x;
        const startY = point1.y <= point2.y ? point1.y : point2.y;
        const endY = point1.y === startY ? point2.y : point1.y;
        const p1 = {
            x: startX,
            y: startY
        };
        const p2 = {
            x: endX,
            y: endY
        };
        ctx.beginPath();
        ctx.rect(center.x + p2.x, center.y + p2.y, p1.x - p2.x, p1.y - p2.y);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
    if (points.length < 2) {
        return;
    }
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = offset(points[i]);
        const p2 = offset(points[i + 1]);
        const xStart = p1.x + center.x;
        const yStart = p1.y + center.y;
        const xEnd = p2.x + center.x;
        const yEnd = p2.y + center.y;
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
    }
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}
function offset(input) {
    if (point1 == null || point2 == null) {
        return input;
    }
    const startX = point1.x <= point2.x ? point1.x : point2.x;
    const endX = point1.x === startX ? point2.x : point1.x;
    const startY = point1.y <= point2.y ? point1.y : point2.y;
    const endY = point1.y === startY ? point2.y : point1.y;
    const p1 = {
        x: startX,
        y: startY
    };
    const p2 = {
        x: endX,
        y: endY
    };
    let resultX;
    let resultY;
    if (p1.x <= input.x && p2.x >= input.x) {
        resultX = input.x;
    }
    else {
        if (p1.x > input.x) {
            resultX = p1.x;
        }
        else {
            resultX = p2.x;
        }
    }
    if (p1.y <= input.y && p2.y >= input.y) {
        resultY = input.y;
    }
    else {
        if (p1.y > input.y) {
            resultY = p1.y;
        }
        else {
            resultY = p2.y;
        }
    }
    return {
        x: resultX,
        y: resultY
    };
}
