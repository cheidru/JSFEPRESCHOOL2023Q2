const anywhere = document.querySelector('body');
const palette = document.getElementById('palette');
let paletteColorBox = document.querySelectorAll('.palette-color-box');
const playField = document.getElementById('field');
let attempt = document.querySelectorAll('.attempt');
let attemptNumber = document.querySelectorAll('.attempt-number');
let colorBox = document.querySelectorAll('.color-box');
let color = document.querySelectorAll('.color-box > .color');
let resultBox = document.querySelectorAll('.attempt-result-box');
let resultColor = document.querySelectorAll('.result-color');
let resultPlace = document.querySelectorAll('.result-place');
let score = document.getElementById('score');
let shutter = document.querySelectorAll('.shutter');
const secretCodeBTN = document.getElementById('code-wrapper');
const secretCodeDisplay = document.getElementById('secret-code');
const secretCodeHide = document.getElementById('code-btn');
const secretColors = document.querySelectorAll('#secret-code > .color');
const startBTN = document.getElementById('start-btn');
const checkBTN = document.getElementById('check-window');
const youWinBTN = document.getElementById('win-window');
const youFailBTN = document.getElementById('fail-window');
const winAgainBTN = document.getElementById('win-play-again');
const failAgainBTN = document.getElementById('fail-play-again');
const nextLevelBTN = document.getElementById('win-play-next-level');
const exitBTN = document.getElementById('exit-play-game');
const winExitBTN = document.getElementById('win-play-exit')
const powerLayer = document.getElementById('power-layer');
const intro = document.getElementById('intro-screen');
const readIntro = document.getElementById('read-intro');
const introTextEng = document.getElementById('intro-txt-eng');
const introTextRus = document.getElementById('intro-txt-rus');
const introLangEng = document.getElementById('switch-to-eng');
const introLangRus = document.getElementById('switch-to-rus');
const audioIni = document.getElementById('ini-audio');
const audioTap = document.getElementById('tap-audio');
const audioWin = document.getElementById('win-audio');
const audioIntro = document.getElementById('back-audio');
const audioDivine = document.getElementById('divine-audio');
const audioFail = document.getElementById('fail-audio');
const audioNewAttempt = document.getElementById('new-attempt');
const registerWindow = document.getElementById('register-popup');

const player = {};
player.level = 0;
player.score = 700;
player.games = 0;
player.visits = 0;
player.selectedPalette = 1;

const colorPalette = [
    ['white', 'black'],
    ['OrangeRed', 'DeepPink', 'BlueViolet', 'LimeGreen']];

const gameLevel = [
    {colors: 2, positions: 4, palette: colorPalette[0]},
    {colors: 3, positions: 4, palette: colorPalette[1]},
    {colors: 4, positions: 4, palette: colorPalette[1]},
    {colors: 4, positions: 5, palette: colorPalette[1]},
    {colors: 4, positions: 6, palette: colorPalette[1]}
];

let selectedLevel = player.level;

// This is the code to puzzle out
let secretCode = [];
let yourChoice = [];
let gamePalette = []; // Random selection of colors to code later on
let paintWithColor = {};
let currentAttemptNumber = 0;

let fieldHeight = playField.getBoundingClientRect().height;

secretCodeBTN.addEventListener('click', (event) => {
    event.stopPropagation();
    if(event.target.id == 'code-btn') {
        secretCodeDisplay.style.display = 'flex';
        secretCodeHide.style.display = 'none';
    }

    if(event.target.id == 'secret-code' || event.target.classList.contains('color')) {
        secretCodeDisplay.style.display = 'none';
        secretCodeHide.style.display = 'flex';
    }
})

readIntro.addEventListener('click', (event) => {
    event.stopPropagation();
    introTextEng.style.display = 'block';
    audioIntro.play();
    audioIntro.volume = 0.3;
})

introLangRus.addEventListener('click', (event) => {
    event.stopPropagation();
    introTextEng.style.display = 'none';
    introTextRus.style.display = 'block';
})

introLangEng.addEventListener('click', (event) => {
    event.stopPropagation();
    introTextEng.style.display = 'block';
    introTextRus.style.display = 'none';
})

startBTN.addEventListener('click', (event) => {
    event.stopPropagation();
    intro.style.display = 'none';
    gameIni();
});

exitBTN.addEventListener('click', () => {
    location.reload ();
})

winExitBTN.addEventListener('click', () => {
    location.reload ();
})

checkBTN.addEventListener('click', (event) => {
    event.stopPropagation();
    let check = {};
    check.placeMatch = 0;
    check.colorMatch = 0;
    check.remainingCodeColors = [];
    check.remainingChoiceColors = [];
    // Check for color & place match
    placeMatchCheck(check);
    // Check for color match
    colorMatchCheck(check);
    // Show results
    resultPlace[currentAttemptNumber].textContent = check.placeMatch;
    resultColor[currentAttemptNumber].textContent = check.colorMatch;
    // Lock current attempt and create new attempt
        if (check.placeMatch == gameLevel[selectedLevel].positions) {
        winWindow();
    } else if (currentAttemptNumber == 6) {
        failWindow();
    } else {
        startNewAttempt();
    }
});

function winWindow() {    
    checkBTN.style.display = 'none';
    powerLayer.style.display = 'flex';
    youWinBTN.style.display = 'flex';
    if (currentAttemptNumber < 5) audioDivine.play();
    audioWin.play();
}

function failWindow() {
    checkBTN.style.display = 'none';
    powerLayer.style.display = 'flex';
    youFailBTN.style.display = 'flex';
    audioFail.play();
}

winAgainBTN.addEventListener('click', restartGame);
failAgainBTN.addEventListener('click', restartGame);

function restartGame() {
    powerLayer.style.display = 'none';
    youWinBTN.style.display = 'none';
    audioNewAttempt.play();
    cleanField();
}

nextLevelBTN.addEventListener('click', () => {
    powerLayer.style.display = 'none';
    youWinBTN.style.display = 'none';
    selectedLevel++;
    audioNewAttempt.play();
    cleanField();
});

function cleanField() {
    for(let i = 1; i < attempt.length; i++) {
        attempt[i].remove();
    }
    currentAttemptNumber = 0;
    startNewAttempt();
    attempt[0].remove();
    player.score = 700;

    attemptNumber[currentAttemptNumber].textContent = currentAttemptNumber;
    attemptNumber = document.querySelectorAll('.attempt-number');
    colorBox = document.querySelectorAll('.color-box');
    color = document.querySelectorAll('.color-box > .color');
    resultBox = document.querySelectorAll('.attempt-result-box');
    resultPlace = document.querySelectorAll('.result-place');
    resultColor = document.querySelectorAll('.result-color');
    shutter = document.querySelectorAll('.shutter');

    currentAttemptNumber = 0;
    attempt = document.querySelectorAll('.attempt');
    gameIni();
    // Clean palette    
}

function placeMatchCheck(check) {
    for (let i = 0; i < secretCode.length; i++) {
        if (secretCode[i] == yourChoice[i]) {
            check.placeMatch++
            continue;
        }
        check.remainingCodeColors.push(secretCode[i]);
        check.remainingChoiceColors.push(yourChoice[i]);
    }
}

function colorMatchCheck(check) {    
    let remainingCodeColorsSet = new Set(check.remainingCodeColors);
    let remainingChoiceColorsSet = new Set(check.remainingChoiceColors);
    let remainingCodeColorsQty = {};
    // define number of the same color in code
    for(let color of remainingCodeColorsSet) {
        remainingCodeColorsQty[color] = check.remainingCodeColors.reduce((sum, item) => {if(item == color)  sum++; return sum;}, 0);
    }
    // define number of choices of the same color
    let thisColorMatches = 0;
    for(let color of remainingChoiceColorsSet) {
        let qty = check.remainingChoiceColors.reduce((sum, item) => {if(item == color) sum++; return sum}, 0);
        if(remainingCodeColorsQty[color]) {
            thisColorMatches = remainingCodeColorsQty[color] >= qty ? qty : remainingCodeColorsQty[color];
        }
        check.colorMatch += thisColorMatches;
    }
}

function startNewAttempt() {    
    checkBTN.style.display = 'none';
    // Remove cursor:pointer from complete attempt
    for (let child of attempt[currentAttemptNumber].children) {
        child.style.cursor = 'default';
    }
    shutter[currentAttemptNumber].style.display = 'block';

    // Clone attempt element
    let newAttempt = attempt[currentAttemptNumber].cloneNode(true); // clone with all inner elements

    playField.prepend(newAttempt);
    
    attempt = document.querySelectorAll('.attempt');
    attemptNumber = document.querySelectorAll('.attempt-number');
    colorBox = document.querySelectorAll('.color-box');
    color = document.querySelectorAll('.color-box > .color');
    resultBox = document.querySelectorAll('.attempt-result-box');
    resultPlace = document.querySelectorAll('.result-place');
    resultColor = document.querySelectorAll('.result-color');
    shutter = document.querySelectorAll('.shutter');

    currentAttemptNumber++;
    player.score = player.score - 100;
    score.textContent = player.score;

    shutter[currentAttemptNumber].style.display = 'none';
    attemptNumber[currentAttemptNumber].textContent = currentAttemptNumber + 1;
    resultPlace[currentAttemptNumber].textContent = '';
    resultColor[currentAttemptNumber].textContent = '';

    for (let i = 0; i < attempt.length; i++) {        
        attempt[Number(attemptNumber[currentAttemptNumber - i].textContent) - 1].style.order = i;
    }

    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        colorBox[currentAttemptNumber].children[i].style.backgroundColor = 'gray';
    };

    numOfChoices = 0;
    checkBTN.style.top = `${((fieldHeight - (90 * (currentAttemptNumber + 1))) * 0.5)}px`;
    
    if (parseInt(checkBTN.style.top) <= 100) {
        checkBTN.style.top = '50%';
    } 
}

function gameIni() {
    // fill in palette with colors
    gamePalette = colorPalette[player.selectedPalette];
    if (selectedLevel == 0) gamePalette = colorPalette[0];

    for (let i = 0; i < gameLevel[selectedLevel].colors; i++) {
        paletteColorBox[i].style.display = 'block';
        paletteColorBox[i].style.backgroundColor = gamePalette[i];
    }

    // fill in colorBox with empty colors
    attempt[currentAttemptNumber].style.display = 'flex';
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        color[i].style.display = 'block';
    }

    // generate Secret Code
    codeGenerator();

    // show Secret Code
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        secretColors[i].style.display = 'block';
        secretColors[i].style.backgroundColor = secretCode[i];
    }

    colorBox[currentAttemptNumber].addEventListener('click', (event) => {
        event.stopPropagation();
        if (!event.target.classList.contains('color') || paintWithColor.color == undefined) return;
        
        if (event.target.style.backgroundColor == 'gray' || event.target.style.backgroundColor == '') numOfChoices++;
        event.target.style.backgroundColor = paintWithColor.color;
        yourChoice[event.target.id[6] - 1] = paintWithColor.color;
    
        if (numOfChoices == secretCode.length) checkBTN.style.display = 'flex';
        audioTap.play();
    });

    if (player.visits == 0) playDemo();

    // show Player settings and stat (and secret code in design ver)
}

function codeGenerator() {
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        // Getting a random number between two values
        // Math.random() * (max - min) + min
        // value is equal or no lower than min and less than max
        secretCode[i] = gameLevel[selectedLevel].palette[Math.floor(Math.random() * gameLevel[selectedLevel].colors)];
    }
}

palette.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!event.target.classList.contains('palette-color-box')) return;
    let newColor = gamePalette[event.target.id[8] - 1];
    if (paintWithColor.color == newColor) return;
    if (paintWithColor.object !== undefined) paintWithColor.object.style.border = 'none';

    paintWithColor.object = event.target;
    paintWithColor.object.style.border = '5px solid gold';
    paintWithColor.color = newColor;
    audioTap.play();
})

let numOfChoices = 0;

anywhere.addEventListener('click', () => {
    audioIni.pause();
    audioWin.pause();
    audioIntro.pause();
    introTextEng.style.display = 'none';
    introTextRus.style.display = 'none';
});

function playDemo() {};
