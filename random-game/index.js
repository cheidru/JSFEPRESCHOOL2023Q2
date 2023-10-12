const palette = document.getElementById('palette');
const paletteColorBox = document.querySelectorAll('.palette-color-box');
const attempt = document.querySelectorAll('.attempt');
const attemptNumber = document.querySelectorAll('.attempt-number');
const colorBox = document.querySelectorAll('.color-box');
const color = document.querySelectorAll('.color-box > .color');
const resultBox = document.querySelectorAll('.attempt-result-box');
const resultColor = document.querySelectorAll('.result-color');
const resultPlace = document.querySelectorAll('.result-place');
const secretCodeDisplay = document.getElementById('secret-code');
const secretColors = document.querySelectorAll('#secret-code > .color');
const startBTN = document.getElementById('start-button');
const checkBTN = document.getElementById('check-button');

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


const selectedLevel = player.level;

// This is the code to puzzle out
let secretCode = [];
let yourChoice = [];
let gamePalette = []; // Random selection of colors to code later on
let paintWithColor = {};
let attemptIndex = 0;

startBTN.addEventListener('click', () => {
    startBTN.style.display = 'none';
    gameIni();});

checkBTN.addEventListener('click', () => {
    let placeMatch = 0;
    let colorMatch = 0;
    let remainingCodeColors = [];
    let remainingChoiceColors = [];

    // Check for color & place match
    for (let i = 0; i < secretCode.length; i++) {
        if (secretCode[i] == yourChoice[i]) {
            placeMatch++
            continue;
        }
        remainingCodeColors.push(secretCode[i]);
        remainingChoiceColors.push(yourChoice[i]);
    }
    resultPlace[attemptIndex].textContent = placeMatch;

    // Check for color match
    let remainingCodeColorsSet = new Set(remainingCodeColors);
    let remainingChoiceColorsSet = new Set(remainingChoiceColors);
    let remainingCodeColorsQty = {};

    // define number of the same color in code
    for(let color of remainingCodeColorsSet) {
        remainingCodeColorsQty[color] = remainingCodeColors.reduce((sum, item) => {if(item == color)  sum++; return sum;}, 0);
        console.log('color =', color, 'remainingCodeColorsQty[color] =', remainingCodeColorsQty[color], 'remainingCodeColorsSet =', remainingCodeColorsSet, 'remainingCodeColors =', remainingCodeColors);
    }

    // define number of choices of the same color
    let thisColorMatches = 0;
    for(let color of remainingChoiceColorsSet) {
        let qty = remainingChoiceColors.reduce((sum, item) => {if(item == color) sum++; return sum}, 0);

        if(remainingCodeColorsQty[color]) {
            thisColorMatches = remainingCodeColorsQty[color] >= qty ? qty : remainingCodeColorsQty[color];
        }
        colorMatch += thisColorMatches;

        console.log('color =', color, 'remainingCodeColorsQty =', remainingCodeColorsQty, 'qty =', qty);

    }
    resultColor[attemptIndex].textContent = colorMatch;
})

function gameIni() {
    // fill in palette with colors
    gamePalette = colorPalette[player.selectedPalette];
    if (selectedLevel == 0) gamePalette = colorPalette[0];

    for (let i = 0; i < gameLevel[selectedLevel].colors; i++) {
        paletteColorBox[i].style.display = 'block';
        paletteColorBox[i].style.backgroundColor = gamePalette[i];
    }

    // fill in colorBox with empty colors
    attempt[attemptIndex].style.display = 'flex';
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

palette.addEventListener('click', (event) => {
    if (!event.target.classList.contains('palette-color-box')) return;

    let newColor = gamePalette[event.target.id[8] - 1];
    if (paintWithColor.color == newColor) return;

    if (paintWithColor.object !== undefined) paintWithColor.object.style.border = 'none';

    paintWithColor.object = event.target;
    paintWithColor.object.style.border = '5px solid red';
    paintWithColor.color = newColor;
    // console.log(event.target, paintWithColor);
})

colorBox[attemptIndex].addEventListener('click', (event) => {
    if (!event.target.classList.contains('color')) return;
    event.target.style.backgroundColor = paintWithColor.color;
    yourChoice[event.target.id[6] - 1] = paintWithColor.color;
    
    if (yourChoice.length == secretCode.length) checkBTN.style.display = 'flex';
})


// let padPosition = {};
// padPosition.startX = pad.getBoundingClientRect().x;
// padPosition.actualX = pad.getBoundingClientRect().x;
// padPosition.endX = playField.getBoundingClientRect().x + playField.getBoundingClientRect().width - pad.getBoundingClientRect().width;

// let gameRunning = false;

// body.addEventListener('keydown', (event) => {
//     if (event.target == "Enter" && !gameRunning) startGame();
// })

// body.addEventListener('dblclick', (event) => {
//     if (!gameRunning) startGame();
// })

// function startGame() {
//     // ball moving 45 deg up to the right
//     // pad can move
//     // ball hits a wall and change direction
//     // when getting to the bottom line, ball
//     // eithe hits the pad and change direction
//     // or fall down and disappear
// }

// // function dragPad() {
// //     console.log('stopPropagation');

//     // pad.ondragstart = () => false;
//     // pad.style.transform = `translateX(${padPosition.startX}px)`;

//     // Listeners to control player thumb position when it is changed manually
//     pad.onpointerdown = function(event) {
//         console.log('pointer down');
//         let pointerOffset = event.pageX - pad.getBoundingClientRect().x;
//         let ballOffset = event.pageX - ball.getBoundingClientRect().x;
//         // prevent selection start (browser action)
//         // event.preventDefault();

//         // начать отслеживание перемещения указателя и переопределить их на ползунок
//         pad.setPointerCapture(event.pointerId);

//         pad.onpointermove = function(event) {
//             console.log('pointer move');
//                 let lineRightEnd = padPosition.endX;
//                 let startPosition = padPosition.startX;
//                 let offset = pad.getBoundingClientRect().width / 2;
    
//                 if (event.pageX - pointerOffset < startPosition) {
//                     pad.style.transform = 'translateX(0px)';
//                     if (!gameRunning) ball.style.transform = 'translateX(0px)';
//                 } else if (event.pageX - pointerOffset > lineRightEnd) {                    
//                     pad.style.transform = `translateX(${lineRightEnd - startPosition}px)`;
//                     if (!gameRunning) ball.style.transform = `translateX(${lineRightEnd - startPosition}px)`;
//                 } else {
//                     pad.style.transform = `translateX(${event.pageX - startPosition - offset}px)`;
//                     if (!gameRunning) ball.style.transform = `translateX(${event.pageX - startPosition - offset}px)`;
//                 }
//                 coord.textContent = pad.getBoundingClientRect().x;
//                 console.log('event.pageX =', event.pageX, 'lineRightEnd =', lineRightEnd, 'startPosition =', startPosition);
//         }

//         pad.onpointerup = () => {
//             pad.onpointermove = null;
//             pad.onpointerup = null;
//         }
//     }