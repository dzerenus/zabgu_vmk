let n_count = 0;
let liveInterval;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let n_arr = [];

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

    const r = Number(document.getElementById('r-value').value);
    const k = Number(document.getElementById('k-value').value);
    const t = Number(document.getElementById('t-value').value);
    n_count = Number(document.getElementById('s-value').value);
    const dt = Number(document.getElementById('dt-value').value);

    const n = [n_count];

    liveInterval = setInterval(() => {
        const [ dNdt ] = compute_derivatives(n.at(-1), r, k, dt);
        const new_n = (dNdt);

        n_count = Math.round(new_n);

        n.push(new_n);

        n_arr = n;

        updateInterface();

        if (n_count <= 0) {
            alert("Один из видов вымер!");
            clearInterval(liveInterval);
            liveInterval = undefined;
        }

        i++;
    }, t);
}

function compute_derivatives(n, r, k, dt) {
    const dNdt = (1 + k) * n - r;
    return [dNdt];
}

function updateInterface() {
    const c = Number(document.getElementById('c-value').value);
    const pixelsPerDot = c;

    document.getElementById('j-count').innerHTML = n_count;

    const count = 900 / pixelsPerDot;
    const local_n = n_arr.length > count ? n_arr.slice(-count) : n_arr;

    context.clearRect(0, 0, 900, 400);
    for(let i = count - 1; i >= 0; i--) {
        const n = local_n[i];

        const x = i * pixelsPerDot;
        
        context.fillStyle = "darkgreen";
        context.fillRect(x, 400 - n, pixelsPerDot, pixelsPerDot);
    }
}