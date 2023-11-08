var colors = ['red', 'green', 'yellow', 'orange', 'blue', 'white', 'lightgreen'];
var station1 = { carId: -1, ticksLeft: 999 };
var station2 = { carId: -1, ticksLeft: 999 };
var tape = [];
function updateInterface() {
    for (var i = -2; i < 6; i++) {
        if (i === 1) {
            continue;
        }
        var elementId = "slot-".concat(i);
        var element = document.getElementById(elementId);
        if (element == null) {
            continue;
        }
        var car = void 0;
        for (var _i = 0, tape_1 = tape; _i < tape_1.length; _i++) {
            var c = tape_1[_i];
            if (c.position === i) {
                car = c;
                break;
            }
        }
        if (car == null) {
            element.setAttribute('style', '');
        }
        else {
            element.setAttribute('style', "background-color: ".concat(car.color));
        }
    }
    var station1Element = document.getElementById('station-1');
    var station2Element = document.getElementById('station-2');
    var car1;
    var car2;
    for (var _a = 0, tape_2 = tape; _a < tape_2.length; _a++) {
        var c = tape_2[_a];
        if (c.id === station1.carId) {
            car1 = c;
            break;
        }
    }
    for (var _b = 0, tape_3 = tape; _b < tape_3.length; _b++) {
        var c = tape_3[_b];
        if (c.id === station2.carId) {
            car2 = c;
            break;
        }
    }
    if (station1Element != null) {
        station1Element.innerHTML = car1 == null ? '0' : station1.ticksLeft.toString();
        station1Element.setAttribute('style', car1 == null ? '' : "background-color: ".concat(car1.color));
    }
    if (station2Element != null) {
        station2Element.innerHTML = car2 == null ? '0' : station2.ticksLeft.toString();
        station2Element.setAttribute('style', car2 == null ? '' : "background-color: ".concat(car2.color));
    }
}
var carId = 1;
function stationTick(station) {
    if (station.carId >= 0) {
        station.ticksLeft--;
    }
    if (station.ticksLeft < 0) {
        var car = void 0;
        for (var _i = 0, tape_4 = tape; _i < tape_4.length; _i++) {
            var c = tape_4[_i];
            if (c.id === station.carId) {
                car = c;
                break;
            }
        }
        if (car != null) {
            car.state = 'unlocked';
            station.carId = -1;
            station.ticksLeft = 999;
        }
    }
    if (station.carId < 0) {
        for (var _a = 0, tape_5 = tape; _a < tape_5.length; _a++) {
            var car = tape_5[_a];
            if (car.state !== 'locked') {
                car.position--;
            }
            if (car.position === 1 && car.state !== 'locked') {
                station.carId = car.id;
                station.ticksLeft = Math.floor((Math.random() * 0.8 * 10 + 1));
                car.state = 'locked';
            }
        }
        carId++;
        tape.push({ id: carId, color: getRandomColor(), position: 5, state: 'unlocked' });
    }
}
function doTick() {
    stationTick(station1);
    stationTick(station2);
}
function getRandomColor() {
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
document.getElementById("do-tick").onclick = function () {
    doTick();
    updateInterface();
};
