const input = document.getElementById('dot-count') as HTMLInputElement;
const button = document.getElementById('do-create') as HTMLInputElement;
const nValue = document.getElementById('n-value') as HTMLElement;
const content = document.getElementById('content') as HTMLElement;

let totalN = 1;
let maxDicts: { [key: number]: number }[] = [];

button.onclick = () => {
    totalN = 1;
    maxDicts = [];

    const count = Number(input.value);

    for (let num = 0; num < 10000; num++) {
        const values: number[] = [];
        let maxN = 1;
        values.push(Math.random());
        const dicts: { [key: number]: number }[] = [];
        
        for (let i = 0; i < count; i++) {

            values.push(Math.random());

            const nextN = maxN + 1;
            const partSize = 1 / nextN;

            const dict: { [key: number]: number } = {};

            for (let j = 0; j < nextN; j++) {
                const min = partSize * j;
                const max = partSize * (j + 1);

                for (const value of values) {
                    if (min <= value && max > value) {
                        dict[j] = value;
                    }
                }
            }

            dicts.push({ ...dict });

            let isNullValue = false;
            for (let j = 0; j < nextN; j++) {
                if (dict[j] == null) {
                    isNullValue = true;
                }
            }

            if (isNullValue) {
                break;
            } else {
                maxN = nextN;

                if (maxN > totalN) {
                    totalN = maxN;
                    maxDicts = dicts;
                }
            }
        }
    }

    nValue.innerText = totalN.toString();
    content.innerText = JSON.stringify(maxDicts, null, 4);
};