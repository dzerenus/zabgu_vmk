import { useState } from 'react';
import Line from './Line';
import Node from './Node';
import Text from './Text';
import Transition from './Transition';
import './app.css';

const dMinusMatrix = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
]

const dPlusMatrix = [
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0],
];

const dMatrix = [
    [-1, 1, 0, 0, 0, 0], // 0 - Заход от пользователя
    [0, -1, 1, 0, 0, 0], // 1 - Переход в очередь
    [0, 0, -1, 0, 0, 1], // 2 - Переход в доп
    [0, 1, 0, 0, 0, -1], // 3 - Переход из доп
    [0, 0, 0, -1, 1, 0], // 4 - Финал работы
    [0, 0, -1, 1, 0, 0], // 5 - Переход в работу
]

const initMark = [90, 0, 0, 0, 0, 0];
let currentRow = -1;

let prev = 99;
let waiting2 = 0

function App() {
    const [state, updateState] = useState<number[]>(initMark);
    const [active, setActive] = useState<number>(9);

    const step = () => {
        currentRow = (currentRow + 1) % dMatrix.length;

        if (waiting2 !== 0 && (currentRow === 4)) {
            waiting2--;

            currentRow = 0;
        }

        if (waiting2 === 0 && currentRow === 4) {
            if (state[3] <= 0) {
                currentRow = 5;
            } 
        }

        if (currentRow === 2 && state[3] === 0) {
            currentRow = 5;
        }

        if (currentRow === 5) {
            if (state[2] < 1) {
                currentRow = 1;
            } else {
                waiting2 = 3;
            }
        }

        let row = dMatrix[currentRow];

        const rVector = getVector(row);
        const mVector = getVector(state);

        if (mVector > rVector) {
            const m = [...state];

            for (let i = 0; i < m.length; i++) {
                m[i] = m[i] + row[i];
            }

            updateState(m);
        }

        prev = currentRow;
        setActive(currentRow);

        console.log(waiting2);
        console.log('-------');
    };

    return (
        <div className="canvas">
            <Line start={{ x: 0, y: 126 }} end={{ x: 400, y: 129 }} />
            <Line start={{ x: 126, y: 100 }} end={{ x: 129, y: 226 }} />
            <Line start={{ x: 226, y: 100 }} end={{ x: 229, y: 226 }} />
            <Line start={{ x: 126, y: 226 }} end={{ x: 229, y: 229 }} />

            <Node value={state[0]} x={0} y={100} />
            <Node value={state[1]} x={100} y={100} />
            <Node value={state[2]} x={200} y={100} />
            <Node value={state[3]} x={300} y={100} />
            <Node value={state[4]} x={400} y={100} />
            <Node value={state[5]} x={200} y={200} />

            <Line start={{ x: 200, y: 175 }} end={{ x: 260, y: 185 }} />

            <Transition x={75} y={100} active={active === 12} />
            <Transition x={175} y={100} active={active === 12} />
            <Transition x={275} y={100} active={active === 12} />
            <Transition x={375} y={100} active={active === 12} />
            <Transition x={175} y={200} active={active === 12   } />

            <input type='button' value='Сделать шаг' onClick={step} />
        </div>

    );
}

function getVector(input: number[]) {
    let result = 0;
    let multiplier = 1;

    for (let i = input.length - 1; i >= 0; i--) {
        result += input[i] * multiplier;
        multiplier *= 10;
    }

    return input;
}

export default App;
