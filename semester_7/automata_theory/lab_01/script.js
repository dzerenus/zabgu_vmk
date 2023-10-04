let inputNumber;
let currentPosition = 0;
let currentStatus = 'goToRight';

let saved = 0;

let arr = [];

document.getElementById("input-button").onclick = () => {
    inputNumber = 0;
    currentStatus = 'goToRight';
    saved = 0;
    arr = [];

    inputNumber = document.getElementById("input-data").value;
    currentPosition = document.getElementById('input-position').value;
    console.log(currentPosition);
    document.getElementById('input-value-text').innerText = inputNumber;
    document.getElementById('state-text').innerText = currentStatus;
    document.getElementById('state-position').innerText = inputNumber[currentPosition];
    document.getElementById('next-button').disabled = false;
            document.getElementById('state-position-1').innerText = currentPosition;
            arr = ("" + inputNumber).split("").map(Number);
};

document.getElementById('next-button').onclick = () => {
    if (currentStatus === 'goToRight') {
        if (currentPosition >= inputNumber.toString().length - 1) {
            currentStatus = 'subtraction';
            document.getElementById('state-text').innerText = currentStatus;
            document.getElementById('state-position-1').innerText = currentPosition;
            return;
        } 

        currentPosition++;
        document.getElementById('state-position').innerText = inputNumber[currentPosition];
        document.getElementById('state-position-1').innerText = currentPosition;
    }

    if (currentStatus === 'subtraction') {
        arr[currentPosition]--;

        if (arr[currentPosition] < 0) {
            saved++;
            arr[currentPosition] = 10 + arr[currentPosition];
        }

        currentStatus = 'goToLeft';
        document.getElementById('state-text').innerText = currentStatus;
        document.getElementById('state-position-1').innerText = currentPosition;
    }

    if (currentStatus === 'goToLeft') {
        currentPosition--;

        if (currentPosition < 0 && saved > 0) {
            arr.unshift('-');
            currentStatus = 'finished';
            document.getElementById('result').innerText = arr.join('');
            document.getElementById('state-position').innerText = inputNumber[currentPosition];
            document.getElementById('state-text').innerText = currentStatus;
            document.getElementById('state-position-1').innerText = currentPosition;
        }

        if (currentPosition < 0) {
            currentStatus = 'finished';
            document.getElementById('result').innerText = arr.join('');
            document.getElementById('state-position').innerText = 'empty';
            document.getElementById('state-text').innerText = currentStatus;
            document.getElementById('state-position-1').innerText = currentPosition;
        }

        if (saved > 0) {
            arr[currentPosition]--;
            saved--;

            if (arr[currentPosition] < 0) {
                saved++;
                arr[currentPosition] = 10 + arr[currentPosition];
            }
        }

        document.getElementById('state-text').innerText = currentStatus;
        document.getElementById('state-position').innerText = inputNumber[currentPosition];
        document.getElementById('state-position-1').innerText = currentPosition;
    }

    document.getElementById('result').innerText = arr.join('');
};
