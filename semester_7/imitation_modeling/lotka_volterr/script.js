let p_count = 0;
let n_count = 0;
let liveInterval;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let p_arr = [];
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
    const a = Number(document.getElementById('a-value').value);
    const b = Number(document.getElementById('b-value').value);
    const m = Number(document.getElementById('m-value').value);
    const t = Number(document.getElementById('t-value').value);
    const dt = Number(document.getElementById('dt-value').value);

    n_count = 40;
    p_count = 9;

    const n = [n_count];
    const p = [p_count];

    liveInterval = setInterval(() => {
        const [ dNdt, dPdt ] = compute_derivatives(n.at(-1), p.at(-1), r, a, b, m);
        const noise_n = Math.random() / 20;
        const noise_p = Math.random() / 20;

        const new_n = n.at(-1) + (dNdt * noise_n) * dt;
        const new_p = p.at(-1) + (dPdt * noise_p) * dt;

        p_count = Math.round(new_p);
        n_count = Math.round(new_n);

        n.push(new_n);
        p.push(new_p);

        p_arr = p;
        n_arr = n;

        updateInterface();

        if (p_count <= 0 || n_count <= 0) {
            alert("Один из видов вымер!");
            clearInterval(liveInterval);
            liveInterval = undefined;
        }
    }, t);
}

function compute_derivatives(n, p, r, a, b, m) {
    const dNdt = r * n - a * n * p;
    const dPdt = -b * p + m * n * p;
    return [dNdt, dPdt];
}

function updateInterface() {
    const c = Number(document.getElementById('c-value').value);
    const pixelsPerDot = c;

    document.getElementById('j-count').innerHTML = n_count;
    document.getElementById('h-count').innerHTML = p_count;

    const count = 900 / pixelsPerDot;
    const local_p = p_arr.length > count ? p_arr.slice(-count) : p_arr;
    const local_n = n_arr.length > count ? n_arr.slice(-count) : n_arr;

    context.clearRect(0, 0, 900, 400);
    for(let i = count - 1; i >= 0; i--) {
        const p = local_p[i];
        const n = local_n[i];

        const x = i * pixelsPerDot;
        
        context.fillStyle = "darkred";
        context.fillRect(x, 400 - p, pixelsPerDot, pixelsPerDot);
        context.fillStyle = "darkgreen";
        context.fillRect(x, 400 - n, pixelsPerDot, pixelsPerDot);
    }
}