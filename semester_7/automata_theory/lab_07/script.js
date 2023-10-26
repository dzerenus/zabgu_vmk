const s1 = 'Ясно';
const s2 = 'Снег';
const s3 = 'Дождь';

let state = s1;

const sRnd = Math.random();

if (sRnd < 0.33) {
    state = s2;
} else if (sRnd < 0.66) {
    state = s3;
}

document.getElementById('state').innerHTML = state;

function goNextState() {

    let s = 0;

    if (state === s1) {
        s = 0;
    } else if (state === s2) {
        s = 1;
    } else {
        s = 2;
    }

    const rnd = Math.random();
    current = math.multiply(current, initial);

    if (rnd < current.subset(math.index(s, 0))) {
        state = s1;
    } else if (rnd < current.subset(math.index(s, 0)) + current.subset(math.index(s, 1))) {
        state = s2;
    } else {
        state = s3;
    }

    updateInterface();
}

function updateInterface() {
    document.getElementById('state').innerHTML = state;

    document.getElementById('1_0_0').innerHTML = initial.subset(math.index(0, 0));
    document.getElementById('1_0_1').innerHTML = initial.subset(math.index(0, 1));
    document.getElementById('1_0_2').innerHTML = initial.subset(math.index(0, 2));
    document.getElementById('1_1_0').innerHTML = initial.subset(math.index(1, 0));
    document.getElementById('1_1_1').innerHTML = initial.subset(math.index(1, 1));
    document.getElementById('1_1_2').innerHTML = initial.subset(math.index(1, 2));
    document.getElementById('1_2_0').innerHTML = initial.subset(math.index(2, 0));
    document.getElementById('1_2_1').innerHTML = initial.subset(math.index(2, 1));
    document.getElementById('1_2_2').innerHTML = initial.subset(math.index(2, 2));

    document.getElementById('2_0_0').innerHTML = current.subset(math.index(0, 0));
    document.getElementById('2_0_1').innerHTML = current.subset(math.index(0, 1));
    document.getElementById('2_0_2').innerHTML = current.subset(math.index(0, 2));
    document.getElementById('2_1_0').innerHTML = current.subset(math.index(1, 0));
    document.getElementById('2_1_1').innerHTML = current.subset(math.index(1, 1));
    document.getElementById('2_1_2').innerHTML = current.subset(math.index(1, 2));
    document.getElementById('2_2_0').innerHTML = current.subset(math.index(2, 0));
    document.getElementById('2_2_1').innerHTML = current.subset(math.index(2, 1));
    document.getElementById('2_2_2').innerHTML = current.subset(math.index(2, 2));
}

document.getElementById('next').onclick = goNextState;

let current = math.identity(3);

const initial = math.matrix([
    [0, 0.5, 0.5],
    [0.25, 0.5, 0.25],
    [0.25, 0.25, 0.5]
]);
