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
    for (let i = -2; i < 6; i++) {
        if (i === 1) {
            continue;
        }

        const elementId = `slot-${i}`;
        const element = document.getElementById(elementId);

        if (element == null) {
            continue;
        }

        let car: ICar | undefined;

        for (const c of tape) {
            if (c.position === i) {
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

let carId = 1;

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
            station.carId = -1;
            station.ticksLeft = 999;
        }
    }

    if (station.carId < 0) {
        for (const car of tape) {
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
        tape.push({ id: carId, color: getRandomColor(), position: 5, state: 'unlocked' })
    }
}

function doTick() {
    stationTick(station1);
    stationTick(station2);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

document.getElementById("do-tick")!.onclick = () => {
    doTick();
    updateInterface();
}