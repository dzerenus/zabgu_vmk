const contentElement = document.getElementById('text-area');
const phraseElement = document.getElementById('search-phrase');
const methodElement = document.getElementById('find-method');
const searchElement = document.getElementById('find-button');

searchElement.onclick = () => {
    const content = contentElement.value;
    const method = methodElement.value;
    const phrase = phraseElement.value;

    if (method === 'kmp') {
        KmpFind(content, phrase);
    } else {
        MatrixSearch(content, phrase);
    }
};

function MatrixSearch(text, pattern) {
    const tf = createArr(pattern.length + 1 , 65536);
    computeArr(pattern, tf, pattern.length);

    let i, state = 0;
    for (i = 0; i < text.length; i++)
    {
        state = tf[state][text[i].charCodeAt(0)];
        if (state === pattern.length)
        {
            alert("Найдено с: " + (i - pattern.length + 1).toString());
            return;
        }
    }
}

function getNextState(pattern, m, state, x) {
    if (state < m && x === pattern[state].charCodeAt(0)) {
        return state + 1;
    }

    let ns, i;

    for (ns = state; ns > 0; ns--) {
        if (pattern[ns - 1].charCodeAt(0) === x) {
            for (i = 0; i < ns - 1; i++) {
                if (pattern[i] != pattern[state - ns + 1 + i]) {
                    break;
                }
            }
            if (i == ns - 1) {
                return ns;
            }
        }
    }

    return 0;
}

function computeArr(pattern, tf, m) {
    let state, x;

    for (state = 0; state <= m; ++state) {
        for (x = 0; x < 65536; ++x) {
            tf[state][x] = getNextState(pattern, m, state, x);
        }
    }
}

function createArr(s1, s2) {
    const arr = Array(s1);
 
    for (let i = 0; i < s1; i++) {
        arr[i] = Array(s2);
    }

    return arr;
}

function KmpFind(text, pattern) {
    const m = pattern.length;
    const n = text.length;
    const lps = createLpsArray(pattern);

    let i = 0;
    let j = 0;

    while ((n - i) >= (m - j)) {
        if (pattern[j] === text[i]) {
            j++;
            i++;
        }

        if (j === m) {
            alert("Найден с индекса: " + (i - j).toString());
            j = lps[j - 1];
            return;
        }

        else if (i < n && pattern[j] !== text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }

}

function createLpsArray(pattern) {
    const lps = Array(pattern.length);

    let len = 0;
    let i = 1;
    lps[0] = 0;

    while(i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        }

        else {
            if (len !== 0) {
                len = lps[len - 1]; 
            }

            else {
                lps[i] = len;
                i++;
            }
        }
    }

    return lps;
}


contentElement.innerHTML = 'Задача организации, в особенности же начало повседневной работы по формированию позиции играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки модели развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке новых предложений.';
