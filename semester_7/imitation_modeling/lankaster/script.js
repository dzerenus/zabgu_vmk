let x_count = 0;
let y_count = 0;
let liveInterval;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let x_arr = [];
let y_arr = [];

document.getElementById('stop-button').onclick = () => { 
    if (liveInterval != null) {
        clearInterval(liveInterval);
        liveInterval = undefined;
    }
}


document.getElementById('accept-button').onclick = () => {
    if (liveInterval != null) {
        alert("Симуляция уже запущена!");
        return;
    }

    const x = Number(document.getElementById('x-value').value);
    const y = Number(document.getElementById('y-value').value);
    const a = Number(document.getElementById('a-value').value);
    const b = Number(document.getElementById('b-value').value);
    const t = Number(document.getElementById('t-value').value);
    const dt = Number(document.getElementById('dt-value').value);

    const yLocal = [x];
    const xLocal = [y];

    liveInterval = setInterval(() => {
        const [ new_y, new_x ] = compute_derivatives(xLocal.at(-1), yLocal.at(-1), a, b, dt);

        x_count = Math.round(new_x);
        y_count = Math.round(new_y);

        yLocal.push(new_x);
        xLocal.push(new_y);

        x_arr = xLocal;
        y_arr = yLocal;

        updateInterface();

        if (x_count <= 0 || y_count <= 0) {
            alert("Одна из армий уничтожена!");
            clearInterval(liveInterval);
            liveInterval = undefined;
        }
    }, t);
}

function compute_derivatives(x, y, a, b, t) {
    const x1 = (x * Math.sqrt(a) - y * Math.sqrt(b)) / (2 * Math.sqrt(a)) * Math.pow(Math.E, (t * Math.sqrt(a * b)));
    const x2 = (x * Math.sqrt(a) + y * Math.sqrt(b)) / (2 * Math.sqrt(a)) * Math.pow(Math.E, (-1 * t * Math.sqrt(a * b)));
    
    const y1 = (y * Math.sqrt(b) - x * Math.sqrt(a)) / (2 * Math.sqrt(b)) * Math.pow(Math.E, (t * Math.sqrt(a * b)));
    const y2 = (y * Math.sqrt(b) + x * Math.sqrt(a)) / (2 * Math.sqrt(b)) * Math.pow(Math.E, (-1 * t * Math.sqrt(a * b)));
    
    return [x1 + x2, y1 + y2];
}

function updateInterface() {
    const c = Number(document.getElementById('c-value').value);
    const pixelsPerDot = c;

    document.getElementById('y-count').innerHTML = y_count;
    document.getElementById('x-count').innerHTML = x_count;

    const count = 900 / pixelsPerDot;
    const lx = x_arr.length > count ? x_arr.slice(-count) : x_arr;
    const ly = y_arr.length > count ? y_arr.slice(-count) : y_arr;

    context.clearRect(0, 0, 900, 400);
    for(let i = count - 1; i >= 0; i--) {
        const xc = lx[i];
        const yc = ly[i];

        const x = i * pixelsPerDot;
        
        context.fillStyle = "darkred";
        context.fillRect(x, 400 - xc, pixelsPerDot, pixelsPerDot);
        context.fillStyle = "darkgreen";
        context.fillRect(x, 400 - yc, pixelsPerDot, pixelsPerDot);
    }
}