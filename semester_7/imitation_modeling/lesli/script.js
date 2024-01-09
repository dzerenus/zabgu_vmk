let liveInterval;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let countCount = 0;
let matrixes = [];

const colors = ['darkred', 'darkgreen', 'darkorange', 'gray', 'black'];

document.getElementById('accept-button').onclick = () => {
    if (liveInterval != null) {
        alert("Симуляция уже запущена!");
        return;
    }

    const counts = stringToIntArray(document.getElementById('count-value').value);
    const s = stringToIntArray(document.getElementById('s-value').value);
    const f = stringToIntArray(document.getElementById('f-value').value);

    if (counts.length !== f.length || s.length !== f.length) {
        alert("Неверный ввод данных");
        return; 
    }

    matrixes = [];

    countCount = counts.length;
    const matrix = math.zeros(counts.length, counts.length);

    for (let i = 0; i < f.length; i++) {
        matrix.set([0, i], f[i]);
    }

    for (let i = 0; i < s.length - 1; i++) {
        matrix.set([i + 1, i], s[i]);
    }

    const startMatrix = math.zeros(counts.length, 1);

    for (let i = 0; i < counts.length; i++) {
        startMatrix.set([i, 0], counts[i]);
    }

    matrixes.push(startMatrix);

    const t = Number(document.getElementById('t-value').value);

    for (let i = 0; i < t; i++) {
        const m = matrixes[matrixes.length - 1];
        matrixes.push(math.multiply(matrix, m));
    }

    updateInterface();
}

function compute_derivatives(n, r, k, dt) {
    const dNdt = (1 + k) * n - r;
    return [dNdt];
}

function updateInterface() {
    let prevDots = [];
    const c = Number(document.getElementById('c-value').value);
    const pixelsPerDot = c;

    const count = 900 / pixelsPerDot;
    context.clearRect(0, 0, 900, 400);

    if (matrixes.length < 1 || countCount === 0) {
        return;
    }

    let indexer = 0;
    for(let i = 0; i < count; i++) {
        if (indexer >= matrixes.length) {
            continue;
        }

        const dots = [];

        const x = i * pixelsPerDot;

        const current = matrixes[indexer];

        for (let j = 0; j < countCount; j++) {
            const value = current.get([j, 0]);

            const color = colors[j % colors.length];
            context.fillStyle = color;
            context.fillRect(x - 3, 400 - value - 3 , 6, 6);

            const prev = prevDots.find(x => x.j === j);

            if (prev != null) {
                context.strokeStyle = color;
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(prev.x, 400 - prev.y);
                context.lineTo(x, 400 - value);
                context.stroke();
            }

            dots.push({
                j: j,
                x: x,
                y: value
            })
        }
        indexer++;
        prevDots = dots;
    }
}

function stringToIntArray(input) {
    const result = [];
    const strings = input.trim().split(" ");

    strings.forEach(x => {
        result.push(Number(x));
    });

    return result;
}