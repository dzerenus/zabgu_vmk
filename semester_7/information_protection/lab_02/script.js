var symbols = [
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
var table = [];
function createOffsetedArray(array, offset) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var index = (i + offset) % array.length;
        result.push(array[index]);
    }
    return result;
}
document.getElementById('enc-but').onclick = function () {
    var data = document.getElementById('enc-inp').value.toLowerCase();
    var key = document.getElementById('enc-key').value.toLowerCase();
    var result = [];
    var keyIndex = 0;
    for (var i = 0; i < data.length; i++) {
        var defIndex = symbols.indexOf(data[i]);
        var keySymbolIndex = symbols.indexOf(key[keyIndex]);
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
    document.getElementById('enc-res').value = result.join('');
};
document.getElementById('dec-but').onclick = function () {
    var data = document.getElementById('dec-inp').value.toLowerCase();
    var key = document.getElementById('dec-key').value.toLowerCase();
    var result = [];
    var keyIndex = 0;
    for (var i = 0; i < data.length; i++) {
        var defIndex = symbols.indexOf(data[i]);
        var keySymbolIndex = symbols.indexOf(key[keyIndex]);
        if (defIndex == null) {
            result.push(data[i]);
            continue;
        }
        if (keySymbolIndex == 0) {
            keySymbolIndex = 0;
        }
        keyIndex = (keyIndex + 1) % key.length;
        var row = table[keySymbolIndex];
        var sIndex = row.indexOf(data[i]);
        if (sIndex < 0) {
            result.push(symbols[i]);
        }
        else {
            result.push(table[0][sIndex]);
        }
    }
    document.getElementById('dec-res').value = result.join('');
};
for (var symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
    table.push(createOffsetedArray(symbols, symbolIndex));
}
