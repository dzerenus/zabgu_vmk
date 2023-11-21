var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var input = document.getElementById('dot-count');
var button = document.getElementById('do-create');
var nValue = document.getElementById('n-value');
var content = document.getElementById('content');
var totalN = 1;
var maxDicts = [];
button.onclick = function () {
    totalN = 1;
    maxDicts = [];
    var count = Number(input.value);
    for (var num = 0; num < 10000; num++) {
        var values = [];
        var maxN = 1;
        values.push(Math.random());
        var dicts = [];
        for (var i = 0; i < count; i++) {
            values.push(Math.random());
            var nextN = maxN + 1;
            var partSize = 1 / nextN;
            var dict = {};
            for (var j = 0; j < nextN; j++) {
                var min = partSize * j;
                var max = partSize * (j + 1);
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    if (min <= value && max > value) {
                        dict[j] = value;
                    }
                }
            }
            dicts.push(__assign({}, dict));
            var isNullValue = false;
            for (var j = 0; j < nextN; j++) {
                if (dict[j] == null) {
                    isNullValue = true;
                }
            }
            if (isNullValue) {
                break;
            }
            else {
                maxN = nextN;
                if (maxN > totalN) {
                    totalN = maxN;
                    maxDicts = dicts;
                }
            }
        }
    }
    // while (true) {
    //     const nextN = maxN + 1;
    //     const partSize = 1 / nextN;
    //     const founds: boolean[] = [];
    //     for (let i = 0; i < nextN; i++) {
    //         const min = partSize * i;
    //         const max = partSize * (i + 1);
    //         let found = false;
    //         for (const value of values) {
    //             if (value >= min && value < max) {
    //                 found = true;
    //                 break;
    //             }
    //         }
    //         if (!found) {
    //             break;
    //         } else {
    //             founds.push(true);
    //         }
    //     }
    //     if (founds.length === nextN) {
    //         maxN = nextN;
    //     } else {
    //         break;
    //     }
    // }
    nValue.innerText = totalN.toString();
    content.innerText = JSON.stringify(maxDicts, null, 4);
};
