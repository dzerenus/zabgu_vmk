type CarType = 'locked' | 'unlocked';

interface ICar {
    id: number;
    position: number;
    color: string;
    state: CarType;
}

interface IStation {
    carId: number;
    ticksLeft: number;
}

const colors: string[] = ['red', 'green', 'yellow', 'orange', 'blue', 'white', 'lightgreen'];
const station1: IStation = { carId: -1, ticksLeft: 999 };
const station2: IStation = { carId: -1, ticksLeft: 999 };
const tape: ICar[] = [];

function updateInterface() {
    for (let i = 6; i >= -2; i--) {
        const elementId = `slot-${i}`;
        const element = document.getElementById(elementId);

        if (element == null) {
            continue;
        }

        let car: ICar | undefined;

        for (const c of tape) {
            if (c.position === i && c.state === 'unlocked') {
                car = c;
                break;
            }
        } 

        if (car == null) {
            element.setAttribute('style', '');
        } else {
            element.setAttribute('style', `background-color: ${car.color}`);
        }
    }

    let lockedCar: ICar | undefined;

    for (const c of tape) {
        if (c.position === 2 && c.state === 'locked' ) {
            lockedCar = c;
            break;
        }
    }

    if (lockedCar != null) {
        const element = document.getElementById("slot-2");

        if (element != null) {
            element.setAttribute('style', `background-color: ${lockedCar.color}`);
        }

    }

    const station1Element = document.getElementById('station-1');
    const station2Element = document.getElementById('station-2');

    let car1: ICar | undefined;
    let car2: ICar | undefined;

    for (const c of tape) {
        if (c.id === station1.carId) {
            car1 = c;
            break;
        }
    }

    for (const c of tape) {
        if (c.id === station2.carId) {
            car2 = c;
            break;
        }
    } 

    if (station1Element != null) {
        station1Element.innerHTML = car1 == null ? '0' : station1.ticksLeft.toString();
        station1Element.setAttribute('style', car1 == null ? '' : `background-color: ${car1.color}`);
    }

    if (station2Element != null) {
        station2Element.innerHTML = car2 == null ? '0' : station2.ticksLeft.toString();
        station2Element.setAttribute('style', car2 == null ? '' : `background-color: ${car2.color}`);
    }
}


function stationTick(station: IStation) {
    if (station.carId >= 0) {
        station.ticksLeft--;
    }

    if (station.ticksLeft < 0) {
        let car: ICar | undefined;

        for (const c of tape) {
            if (c.id === station.carId) {
                car = c;
                break;
            }
        }

        if (car != null) {
            car.state = 'unlocked';
            car.position = 0;
            station.carId = -1;
            station.ticksLeft = 999;
        }
    }

    if (station.carId < 0) {
        for (const car of tape) {
            if (car.position === 2 && car.state === 'locked') {
                station.carId = car.id;
                station.ticksLeft = Math.floor((Math.random() * 8 + 1));
                car.state = 'locked';
                car.position = 1;
                break;
            }

            if (car.position === 1 && car.state == 'unlocked') {
                station.carId = car.id;
                station.ticksLeft = Math.floor((Math.random() * 8 + 1));
                car.state = 'locked';
                break;
            }
        }
    }
}

let carId = 1;
function doTick() {
    for (const car of tape) {
        if (car.state !== 'locked') {
            car.position--;
        }
    }

    carId++;
    tape.push({ id: carId, color: getRandomColor(), position: 5, state: 'unlocked' })

    stationTick(station1);
    stationTick(station2);

    if (station1.carId > 0 && station2.carId > 0) {
        let car: ICar | undefined;
        let lockedCar: ICar | undefined;

        for (const c of tape) {
            if (c.position === 2) {
                car = c;
            }

            if (c.position === 2 && c.state === 'locked') {
                lockedCar = c;
            }
        }

        if (lockedCar != null || car == null) {
            return;
        }

        car.state = 'locked';
    }
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

document.getElementById("do-tick")!.onclick = () => {
    doTick();
    updateInterface();
}