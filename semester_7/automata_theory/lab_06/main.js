const stateGreenOn = 'Горит зелёный';
const stateGreenToggling = 'Мигает зелёный';
const stateYellowOn = 'Горит жёлтый';
const stateYellowToggling = 'Мигает жёлтый';
const stateRedOn = 'Горит красный';
const stateRedToggle = 'Мигает красный';

let state = stateGreenOn;
let togglingInterval = undefined;

let isGreenPrev = true;

const lampR = document.getElementById('lamp-r');
const lampG = document.getElementById('lamp-g');
const lampY = document.getElementById('lamp-y');

function changeState() {
    if (state === stateGreenOn) {
        lampG.classList.toggle('off');

        togglingInterval = setInterval(() => lampG.classList.toggle('off'), 200);
        state = stateGreenToggling;
    }

    else if (state === stateGreenToggling) {
        lampY.classList.toggle('off');

        if (togglingInterval != null) {
            clearInterval(togglingInterval);
            lampG.classList.add('off');
        }

        state = stateYellowOn;
        isGreenPrev = true;
    }

    else if (state === stateYellowOn) {
        togglingInterval = setInterval(() => lampY.classList.toggle('off'), 200);
        state = stateYellowToggling;
    }

    else if (state === stateYellowToggling  && isGreenPrev) {
        lampR.classList.toggle('off');

        if (togglingInterval != null) {
            clearInterval(togglingInterval);
            lampY.classList.add('off');
        }

        state = stateRedOn;
    }

    else if (state === stateYellowToggling  && !isGreenPrev) {
        lampG.classList.toggle('off');

        if (togglingInterval != null) {
            clearInterval(togglingInterval);
            lampY.classList.add('off');
        }

        state = stateGreenOn;
    }

    else if (state === stateRedOn) {
        togglingInterval = setInterval(() => lampR.classList.toggle('off'), 200);
        state = stateRedToggle;
    }

    else if (state === stateRedToggle) {
        lampY.classList.toggle('off');

        if (togglingInterval != null) {
            clearInterval(togglingInterval);
            lampR.classList.add('off');
        }

        state = stateYellowOn;
        isGreenPrev = false;
    }

    document.getElementById('state').innerHTML = state;
}

setInterval(changeState, 1500);
