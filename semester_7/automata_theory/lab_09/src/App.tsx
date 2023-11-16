import { useState } from 'react';
import Line from './Line';
import Node from './Node';
import Text from './Text';
import Transition from './Transition';
import './app.css';

const dMinusMatrix = [
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
]

const dMatrix = [
    [-1, 1, 0, 0, 0, 0],
    [-1, 0, 1, 0, 0, 0],
    [0, -1, 0, 1, 0, 0],
    [0, 0, -1, 0, 1, 0],
    [0, 0, 0, -1, 0, 1],
    [0, 0, 0, 0, -1, 1],
    [-1, 0, 0, 0, 0, 1],
]

const initMark = [90, 0, 0, 0, 0, 0];
let currentRow = -1;

let waiting1 = 0;
let waiting2 = 0

function App() {
    const [state, updateState] = useState<number[]>(initMark);
    const [active, setActive] = useState<number>(9);

    const step = () => {
        currentRow = (currentRow + 1) % dMatrix.length;
        const row = dMatrix[currentRow];

        waiting1--;
        waiting2--;

        if ((currentRow === 0 && state[1] < 3) || (currentRow === 1 && state[2] < 3) || (currentRow === 2 && state[3] < 1) || (currentRow === 3 && state[4] < 1) || (currentRow === 6 && state[1] !== 0 && state[2] !== 0) || (currentRow === 4 && state[3] === 1 && waiting1 <= 0) || (currentRow === 5 && state[4] === 1 && waiting2 <= 0)) {
            const rVector = getVector(row);
            const mVector = getVector(state);

            if (mVector > rVector) {
                if (currentRow === 2) {
                    waiting1 = 5;
                }

                if (currentRow === 3) {
                    waiting2 = 5;
                }

                const m = [...state];

                for (let i = 0; i < m.length; i++) {
                    m[i] = m[i] + row[i];
                }

                updateState(m);
            }

            setActive(currentRow);
        } else {
            setActive(999);
        }

        console.log(waiting1);
        console.log(waiting2);
        console.log('-------');
    };

    return (
        <div className="canvas">
            <Text x={50} y={90}>P1</Text>
            <Text x={260} y={30}>P2</Text>
            <Text x={260} y={180}>P3</Text>
            <Text x={460} y={30}>P4</Text>
            <Text x={460} y={180}>P5</Text>
            <Text x={650} y={90}>P6</Text>
            <Text x={160} y={10}>T1</Text>
            <Text x={160} y={160}>T2</Text>
            <Text x={360} y={10}>T3</Text>
            <Text x={360} y={160}>T4</Text>
            <Text x={360} y={280}>T7</Text>
            <Text x={510} y={10}>T5</Text>
            <Text x={510} y={160}>T6</Text>

            <Line start={{ x: 58, y: 126 }} end={{ x: 100, y: 129 }} />
            <Line start={{ x: 100, y: 55 }} end={{ x: 103, y: 325 }} />
            <Line start={{ x: 103, y: 55 }} end={{ x: 550, y: 58 }} />
            <Line start={{ x: 103, y: 205 }} end={{ x: 550, y: 208 }} />
            <Line start={{ x: 100, y: 325 }} end={{ x: 550, y: 328 }} />
            <Line start={{ x: 550, y: 55 }} end={{ x: 553, y: 328 }} />
            <Line start={{ x: 550, y: 126 }} end={{ x: 600, y: 129 }} />

            <Node value={state[0]} x={0} y={100} />
            <Node value={state[1]} x={200} y={30} />
            <Node value={state[2]} x={200} y={180} />
            <Node value={state[3]} x={400} y={30} />
            <Node value={state[4]} x={400} y={180} />
            <Node value={state[5]} x={600} y={100} />

            <Transition x={150} y={180} active={active === 1} />
            <Transition x={150} y={30} active={active === 0} />
            <Transition x={350} y={30} active={active === 2} />
            <Transition x={350} y={180} active={active === 3} />
            <Transition x={500} y={180} active={active === 5} />
            <Transition x={500} y={30} active={active === 4} />
            <Transition x={350} y={300} active={active === 6} />

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
