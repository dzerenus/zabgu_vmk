const alphabet = ['О', 'И', 'У', 'Ы', 'Н', 'Т', 'К', '_'];

function getGCD(a: number, b: number) {
    let g = a >= b ? a : b;
    let s = a < b ? a : b;

    if (g % s === 0) {
        return s;
    }

    while (g !== 0 && s !== 0) {
        if (g > s) {
            g %= s;
        } else {
            s %= g;
        }
    }

    return g + s;
}

function getReverse(a: number, n: number) {
    let res = 1;

    while (true) {
        if ((a * res) % n === 1) {
            return res;
        } else {
            res++;
        }
    }
}

document.getElementById('enc_button')!.onclick = () => {
    const a = Math.floor(Number((document.getElementById('a_input') as HTMLInputElement).value));
    const b = Math.floor(Number((document.getElementById('b_input') as HTMLInputElement).value));
    const gcd = getGCD(a, alphabet.length);

    if (gcd !== 1) {
        (document.getElementById('result_input') as HTMLInputElement).value = 'Неверное число A';
        return;
    }

    const input = (document.getElementById('data_input') as HTMLInputElement).value.toUpperCase();

    const result: string[] = [];
    for (let i = 0; i < input.length; i++) {
        const s = input[i];
        
        const index = alphabet.indexOf(s);

        if (index < 0) {
            result.push(s);
            continue;
        }

        const y = (a * index + b) % alphabet.length; 
        result.push(alphabet[y]);
    }

    (document.getElementById('result_input') as HTMLInputElement).value = result.join('');
};

document.getElementById('dec_button')!.onclick = () => {
    const a = Math.floor(Number((document.getElementById('a_input') as HTMLInputElement).value));
    const b = Math.floor(Number((document.getElementById('b_input') as HTMLInputElement).value));

    const input = (document.getElementById('data_input') as HTMLInputElement).value.toUpperCase();
    const reverse = getReverse(a, alphabet.length);

    const result: string[] = [];
    for (let i = 0; i < input.length; i++) {
        const s = input[i];
        
        const index = alphabet.indexOf(s);

        if (index < 0) {
            result.push(s);
            continue;
        }

        let x = ((index - b) * reverse) % alphabet.length; 
        while (x < 0) {
            x += alphabet.length;
        }
        
        result.push(alphabet[x]);
    }

    (document.getElementById('result_input') as HTMLInputElement).value = result.join('');
};