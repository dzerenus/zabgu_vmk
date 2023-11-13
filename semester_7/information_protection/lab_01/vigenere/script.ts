const symbols = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з',
    'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р',
    'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ',
    'ъ', 'ы', 'ь', 'э', 'ю', 'я', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '0', ',', '.',
    '!', '?', ':', ';', '"', "'",
];

const table: string[][] = [];

function createOffsetedArray<T>(array: T[], offset: number) {
    const result: T[] = [];

    for (let i = 0; i < array.length; i++) {
        const index = (i + offset) % array.length;
        result.push(array[index]);
    }

    return result;
}

document.getElementById('enc-but')!.onclick = () => {
    const data = (document.getElementById('enc-inp') as HTMLInputElement).value.toLowerCase();
    const key = (document.getElementById('enc-key') as HTMLInputElement).value.toLowerCase();

    const result: string[] = [];

    let keyIndex = 0;
    for (let i = 0; i < data.length; i++) {
        const defIndex = symbols.indexOf(data[i]);
        let keySymbolIndex = symbols.indexOf(key[keyIndex]);

        if (defIndex == null) {
            result.push(data[i]);
            continue;
        }

        if (keySymbolIndex == 0) {
            keySymbolIndex = 0;
        }

        keyIndex = (keyIndex + 1) % key.length;

        result.push(table[defIndex][keySymbolIndex]);
    }

    (document.getElementById('enc-res') as HTMLInputElement).value = result.join('');
    
};

document.getElementById('dec-but')!.onclick = () => {
    const data = (document.getElementById('dec-inp') as HTMLInputElement).value.toLowerCase();
    const key = (document.getElementById('dec-key') as HTMLInputElement).value.toLowerCase();

    const result: string[] = [];

    let keyIndex = 0;
    for (let i = 0; i < data.length; i++) {
        const defIndex = symbols.indexOf(data[i]);
        let keySymbolIndex = symbols.indexOf(key[keyIndex]);

        if (defIndex == null) {
            result.push(data[i]);
            continue;
        }

        if (keySymbolIndex == 0) {
            keySymbolIndex = 0;
        }

        keyIndex = (keyIndex + 1) % key.length;

        const row = table[keySymbolIndex];
        const sIndex = row.indexOf(data[i]);

        if (sIndex < 0) {
            result.push(symbols[i]);
        } else {
            result.push(table[0][sIndex]);
        }

    }

    (document.getElementById('dec-res') as HTMLInputElement).value = result.join('');
    
};

for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
    table.push(createOffsetedArray(symbols, symbolIndex));
}
