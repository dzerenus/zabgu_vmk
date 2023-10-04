const input = '111001011+11';

const readingRightState = 'reading-right';
const readingLeftState = 'reading-left';
const additionState = 'addition';
const finishedState = 'finished';

let state = readingRightState;
let careetPosition = input.length - 1;

const fArray = [];
const sArray = [];
const rArray = [];

function updateInterface() {
    document.getElementById('value1').value = fArray.join('');
    document.getElementById('value2').value = sArray.join('');
    document.getElementById('result').value = rArray.join('');
    document.getElementById('state').value = state;

    setAutomatString();
}

function setAutomatString() {
    const element = document.createElement('div');

    for (let p = 0; p < careetPosition; p++) {
        element.innerHTML += input[p];
    }

    const bold = document.createElement('span');
    bold.innerHTML = '<u>' + input[careetPosition] + '</u>';
    element.appendChild(bold);

    for (let p = careetPosition + 1; p < input.length; p++) {
        element.innerHTML += input[p];
    }
    
    const current = document.getElementById('automat-position');
    current.innerHTML = element.innerHTML;
}

document.getElementById('step').onclick = () => {
    if (state === readingRightState) {

        if (input[careetPosition] === '+') {
            state = readingLeftState;
        } else {
            addValueToStack(sArray, Number(input[careetPosition]));
        }

        careetPosition--;
    }

    else if (state === readingLeftState) {
        if (careetPosition < 0) {
            careetPosition = 0;
            state = additionState;
        }

        else {
            addValueToStack(fArray, Number(input[careetPosition]));
            careetPosition--;
        }

        if (careetPosition < 0) {
            state = additionState;
            careetPosition = 0;
        }
    }

    else if (state === additionState) {
        if (rArray.length === 0) {
            fArray.map(x => rArray.push(x));
        }

        else if (parseInt(sArray.join(''), 2)) {
            arrIncrement(rArray);
            arrDecrement(sArray);
        }

        else {
            state = finishedState;
        }
    }
    
    updateInterface();
};

function addValueToStack(arr, value) {
    arr.unshift(value);
}

function arrIncrement(arr) {
    let carry = 0;
    
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i === arr.length - 1) {
            arr[i]++;

            if (arr[i] > 1) {
                carry = 1;
                arr[i] = 1;
            }
        }

        if (carry > 0) {
            if (arr[i] === 0) {
                carry = 0;
                arr[i] = 1;
            }

            else {
                arr[i] = 0;
            }

        }
    }
}

function arrDecrement(arr) {
    let carry = 0;
    
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i === arr.length - 1) {
            arr[i]--;

            if (arr[i] < 0) {
                carry = 1;
                arr[i] = 0;
            }
        }

        if (carry > 0) {
            if (arr[i] === 0) {
                arr[i] = 1;
            }

            else {
                arr[i] = 0;
                carry = 0;
            }

        }
    }
}



updateInterface();