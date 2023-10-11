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

const player = {};
player.level = 0;
player.score = 0;
player.games = 0;
player.visits = 0;
player.selectedPalette = 1;

const gameLevel = [
    {colors: 2, positions: 4},
    {colors: 3, positions: 4},
    {colors: 4, positions: 4},
    {colors: 4, positions: 5},
    {colors: 4, positions: 6}
];

const colorPalette = [
    ['white', 'black'],
    ['OrangeRed', 'DeepPink', 'BlueViolet', 'LimeGreen']];

const selectedLevel = player.level;

// This is the code to puzzle out
let secretCode = [];
let gamePalette = []; // Random selection of colors to code later on
let paintWithColor = '';

startBTN.addEventListener('click', () => gameIni());

function gameIni() {
    // fill in palette with colors
    gamePalette = colorPalette[player.selectedPalette];
    if (selectedLevel == 0) gamePalette = colorPalette[0];

    for (let i = 0; i < gameLevel[selectedLevel].colors; i++) {
        paletteColorBox[i].style.display = 'block';
        paletteColorBox[i].style.backgroundColor = gamePalette[i];
    }

    // fill in colorBox with empty colors
    attempt[0].style.display = 'flex';
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        color[i].style.display = 'block';
    }

    // generate Secret Code
    codeGenerator();

    // show Secret Code
    secretCodeDisplay.style.display = 'flex';
    for (let i = 0; i < secretCode.length; i++) {
        secretColors[i].style.display = 'block';
        secretColors[i].style.backgroundColor = colorPalette[selectedLevel][secretCode[i]];
    }

    startBTN.style.display = 'none';
    if (player.visits == 0) playDemo();

    // show Player settings and stat (and secret code in design ver)
}

function codeGenerator() {
    for (let i = 0; i < gameLevel[selectedLevel].positions; i++) {
        // Getting a random number between two values
        // Math.random() * (max - min) + min
        // value is equal or no lower than min and less than max
        secretCode[i] = Math.floor(Math.random() * gameLevel[selectedLevel].colors)
    }
}

function playDemo() {};

palette.addEventListener('click', (event) => {

    event.target.style.border = '5px solid red';
    paintWithColor = gamePalette[event.target.id[8] - 1];
    console.log(event.target, paintWithColor);
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