const symbols = [
    'а', 'б', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о',
    'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э',
    'ю', 'я', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', ',',
    '?', '!', ' ', ':', ';', "'", '"', '+', '-', '(', ')', '*', '{', '}'
]

function encrypt(input, offset) {
    const inputFormatted = input.toLowerCase();
    let result = '';

    for (let i = 0; i < inputFormatted.length; i++) {
        const index = symbols.indexOf(inputFormatted[i]);

        if (index === -1) {
            result += inputFormatted[i];
            continue;
        }

        const offsetedIndex = (index + Number(offset)) % symbols.length;
        result += symbols[offsetedIndex];
    }

    return result;
}

function decrypt(input, offset) {
    const inputFormatted = input.toLowerCase();
    let result = '';

    for (let i = 0; i < inputFormatted.length; i++) {
        const index = symbols.indexOf(inputFormatted[i]);

        if (index === -1) {
            result += inputFormatted[i].toLowerCase();
            continue;
        }

        let offsetedIndex = index - Number(offset);

        if (offsetedIndex < 0) {
            offsetedIndex = symbols.length + offsetedIndex;
            console.log(offsetedIndex);
        }

        result += symbols[offsetedIndex];
    }

    return result;
}

document.getElementById('encrypt').onclick = () => {
    const text = document.getElementById('input').value;
    const offset = document.getElementById('offset').value || 0;
    document.getElementById('result').value = encrypt(text, offset);
};

document.getElementById('decrypt').onclick = () => {
    const text = document.getElementById('input').value;
    const offset = document.getElementById('offset').value || 0;
    document.getElementById('result').value = decrypt(text, offset);
};

document.getElementById('hack').onclick = () => {
    const text = document.getElementById('input').value;
    document.getElementById('table').innerHTML = '';


    for (let i = 0; i < symbols.length; i++) {
        const result = decrypt(text, i);
        
        const tag = document.createElement('div');
        tag.classList.add('line');

        const indexNode = document.createElement('div');
        indexNode.classList.add('number');
        indexNode.innerHTML = i.toString();

        const resultNode = document.createElement('div');
        resultNode.classList.add('result');
        resultNode.innerHTML = result;

        tag.appendChild(indexNode);
        tag.appendChild(resultNode);

        document.getElementById('table').appendChild(tag);
    }
};