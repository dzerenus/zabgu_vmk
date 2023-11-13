var alphabet = ['О', 'И', 'У', 'Ы', 'Н', 'Т', 'К', '_'];
function getGCD(a, b) {
    var g = a >= b ? a : b;
    var s = a < b ? a : b;
    if (g % s === 0) {
        return s;
    }
    while (g !== 0 && s !== 0) {
        if (g > s) {
            g %= s;
        }
        else {
            s %= g;
        }
    }
    return g + s;
}
function getReverse(a, n) {
    var res = 1;
    while (true) {
        if ((a * res) % n === 1) {
            return res;
        }
        else {
            res++;
        }
    }
}
document.getElementById('enc_button').onclick = function () {
    var a = Math.floor(Number(document.getElementById('a_input').value));
    var b = Math.floor(Number(document.getElementById('b_input').value));
    var gcd = getGCD(a, alphabet.length);
    if (gcd !== 1) {
        document.getElementById('result_input').value = 'Неверное число A';
        return;
    }
    var input = document.getElementById('data_input').value.toUpperCase();
    var result = [];
    for (var i = 0; i < input.length; i++) {
        var s = input[i];
        var index = alphabet.indexOf(s);
        if (index < 0) {
            result.push(s);
            continue;
        }
        var y = (a * index + b) % alphabet.length;
        result.push(alphabet[y]);
    }
    document.getElementById('result_input').value = result.join('');
};
document.getElementById('dec_button').onclick = function () {
    var a = Math.floor(Number(document.getElementById('a_input').value));
    var b = Math.floor(Number(document.getElementById('b_input').value));
    var input = document.getElementById('data_input').value.toUpperCase();
    var reverse = getReverse(a, alphabet.length);
    var result = [];
    for (var i = 0; i < input.length; i++) {
        var s = input[i];
        var index = alphabet.indexOf(s);
        if (index < 0) {
            result.push(s);
            continue;
        }
        var x = ((index - b) * reverse) % alphabet.length;
        while (x < 0) {
            x += alphabet.length;
        }
        result.push(alphabet[x]);
    }
    document.getElementById('result_input').value = result.join('');
};
