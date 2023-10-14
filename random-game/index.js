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
let shutter = document.querySelectorAll('.shutter');
const secretCodeDisplay = document.getElementById('secret-code');
const secretColors = document.querySelectorAll('#secret-code > .color');
const startBTN = document.getElementById('start-window');
const checkBTN = document.getElementById('check-window');
const youWinBTN = document.getElementById('win-window');
const playAgainBTN = document.getElementById('win-play-again');
const nextLevelBTN = document.getElementById('win-play-next-level');
const powerLayer = document.getElementById('power-layer');

const audioIni = document.getElementById('ini-audio');
const audioTap = document.getElementById('tap-audio');
const audioWin = document.getElementById('win-audio');
// const audioDivine = document.getElementById('divine-audio');
// const audioCelebrate = document.getElementById('celeb-audio');
const audioNewAttempt = document.getElementById('new-attempt');

const player = {};
player.level = 0;
player.score = 0;
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

startBTN.addEventListener('click', (event) => {
    event.stopPropagation();
    startBTN.style.display = 'none';
    audioIni.play();
    gameIni();
});

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
    // console.log('check.placeMatch =', check.placeMatch, 'gameLevel[selectedLevel].positions =', gameLevel[selectedLevel].positions);
    if (check.placeMatch == gameLevel[selectedLevel].positions) {
        winWindow();
    } else {
        startNewAttempt();
    }
});

function winWindow() {    
    checkBTN.style.display = 'none';
    powerLayer.style.display = 'flex';
    youWinBTN.style.display = 'flex';
    audioWin.play();
}

playAgainBTN.addEventListener('click', () => {
    powerLayer.style.display = 'none';
    youWinBTN.style.display = 'none';
    audioNewAttempt.play();
    cleanField();
    gameIni()
});

nextLevelBTN.addEventListener('click', () => {
    selectedLevel++;
    audioNewAttempt.play();
    cleanField();
    gameIni();
});

function cleanField() {
    // Remove old attempts
    for(let attmp of attempt) {
        attmp.style.transform = 'translateX(150%)';
    }
    attempt = [];

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
    shutter[currentAttemptNumber].style.display = 'none';
    attemptNumber[currentAttemptNumber].textContent = currentAttemptNumber + 1;
    resultPlace[currentAttemptNumber].textContent = '';
    resultColor[currentAttemptNumber].textContent = '';

    for (let i = 0; i < attempt.length; i++) {
        console.log('attemptNumber[currentAttemptNumber].textContent =', attemptNumber[currentAttemptNumber].textContent, 'i =', 0);
        attempt[Number(attemptNumber[currentAttemptNumber - i].textContent) - 1].style.order = i;
    }

    console.log('gameLevel[selectedLevel].positions =', gameLevel[selectedLevel].positions);
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        colorBox[currentAttemptNumber].children[i].style.backgroundColor = 'gray';
    };

    numOfChoices = 0;
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
    secretCodeDisplay.style.display = 'flex';
    for (let i = 0; i < secretCode.length; i++) {
        secretColors[i].style.display = 'block';
        secretColors[i].style.backgroundColor = secretCode[i];
    }

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

function playDemo() {};


anywhere.addEventListener('click', () => {
    audioIni.pause();
    audioWin.pause();
});

palette.addEventListener('click', (event) => {

    if (!event.target.classList.contains('palette-color-box')) return;

    let newColor = gamePalette[event.target.id[8] - 1];
    if (paintWithColor.color == newColor) return;

    if (paintWithColor.object !== undefined) paintWithColor.object.style.border = 'none';

    paintWithColor.object = event.target;
    paintWithColor.object.style.border = '5px solid red';
    paintWithColor.color = newColor;
    audioTap.play();
})

let numOfChoices = 0;

colorBox[currentAttemptNumber].addEventListener('click', (event) => {
    if (!event.target.classList.contains('color')) return;

    console.log('event.target.style.backgroundColor =', event.target.style.backgroundColor, 'numOfChoices =', numOfChoices);
    
    if (event.target.style.backgroundColor == 'gray' || event.target.style.backgroundColor == '') numOfChoices++;
    event.target.style.backgroundColor = paintWithColor.color;
    yourChoice[event.target.id[6] - 1] = paintWithColor.color;

    if (numOfChoices == secretCode.length) checkBTN.style.display = 'flex';
    audioTap.play();
})
