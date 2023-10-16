
let currentWord = null;
let currentWordList = [];
const front = 'front';
const back = 'back';
let currentSide = front;
let currIndex = 0;
let favorites = [];

let getCardTitle = () => {
    return document.getElementById("card-title");
}

let getCardText = () => {
    return document.getElementById("card-text");
}

let getNewWords = () => {
    return words;
}

let init = () =>  {
    getCardTitle().innerHTML = "WORD";

    // const randomStart = Math.floor(Math.random() * getNewWords().length-1);
    // currentWord = getNewWords()[randomStart];
    // currentWordList = shuffle(getNewWords());
    // currentWord = currentWordList[currIndex];
    setNormalMode();
    renderFront();
}

let setUpKeyboardListeners = () => {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            flipCard();
        } else if (event.key == 'ArrowRight') {
            forward();
        } else if (event.key == 'ArrowLeft') {
            backward();
        } else if (event.key == 'ArrowDown') {
            favorite();
        }
    });
}

let setUpButtonListeners = () => {
    document.getElementById("normal").addEventListener('click', () => {
        setNormalMode();
    });
    document.getElementById("fav").addEventListener('click', () => {
        setFavMode();
    });
}

let setNormalMode = () => {
    currentWordList = shuffle(getNewWords());
    currIndex = 0;
    currentWord = currentWordList[currIndex];
    document.getElementById('fav').style.backgroundColor = 'white';
    document.getElementById('normal').style.backgroundColor = 'green';
    renderFront();
}

let setFavMode = () => {
    currentWordList = favorites;
    currIndex = 0;
    currentWord = currentWordList[currIndex];
    document.getElementById('fav').style.backgroundColor = 'green';
    document.getElementById('normal').style.backgroundColor = 'white';
    renderFront();
}

let favorite = () => {
    const check = favorites.indexOf(currentWord);
    if (check == -1) {
        favorites.push(currentWord);
    }
    console.log(favorites);
}

let forward = () => {
    if (currIndex < currentWordList.length-1) {
        currIndex++;
        currentWord = currentWordList[currIndex];
        renderFront();
    }
}

let backward = () => {
    if (currIndex > 0) {
        currIndex--;
        currentWord = currentWordList[currIndex];
        renderFront();
    }
}

let flipCard = () => {
    if (currentSide === front) {
        currentSide = back;
        renderBack();
    } else if (currentSide === back) {
        currentSide = front;
        renderFront();
    }
}

let renderFront = () => {
    getCardTitle().innerHTML = 'WORD';
    getCardText().innerHTML = currentWord.Word;
}

let renderBack = () => {
    getCardTitle().innerHTML = 'DEFINITION';
    getCardText().innerHTML = currentWord.Definition;
}

// this method will shuffle an array
let shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle
    while (0 !== currentIndex) {
        // pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // and swap it with the current element
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// this method will take an array and determine if any of the elements have duplicated "word" properties
let checkForDuplicates = (array) => {
    let duplicates = [];
    let wordList = [];
    for (let i = 0; i < array.length; i++) {
        if (wordList.indexOf(array[i].Word) == -1) {
            wordList.push(array[i].Word);
        } else {
            duplicates.push(array[i]);
        }
    }
    return duplicates;
}

init();
setUpKeyboardListeners();
setUpButtonListeners();