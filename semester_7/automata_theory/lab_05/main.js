const stateOn = 'Включена';
const stateOff = 'Выключена';
const stateBreak = 'Сгорела';

let currentState = stateOff;
let breakTimeout = undefined;

const lamp1 = document.getElementById('lamp-1');
const lamp2 = document.getElementById('lamp-2');

function setLampState(state) {
    if (state === stateOn) {
        lamp1.className = 'lamp-on';
        lamp2.className = 'lamp-on';
    }

    if (state === stateOff) {
        lamp1.className = 'lamp-off';
        lamp2.className = 'lamp-off';
    }

    if (state === stateBreak) {
        lamp1.className = 'lamp-break';
        lamp2.className = 'lamp-break';
    }

    document.getElementById('state').innerHTML = state;
}

document.getElementById('switch').onclick = () => {
    if (currentState === stateOn) {
        currentState = stateOff;
        setLampState(stateOff);

        if (breakTimeout != null) {
            clearTimeout(breakTimeout);
        }
    }

    else if (currentState === stateBreak) {
        currentState = stateOff;
        setLampState(stateOff);
    }

    else if (currentState === stateOff) {
        currentState = stateOn;
        setLampState(stateOn);

        breakTimeout = setTimeout(() => {
            currentState = stateBreak;
            setLampState(stateBreak);
        }, 3000);
    }
};