const pad = document.getElementById('launch-pad');
const ball = document.getElementById('ball');
const playField = document.getElementById('field');
const coord = document.getElementById('coordinates');
const body = document.querySelector('body');

let padPosition = {};
padPosition.startX = pad.getBoundingClientRect().x;
padPosition.actualX = pad.getBoundingClientRect().x;
padPosition.endX = playField.getBoundingClientRect().x + playField.getBoundingClientRect().width - pad.getBoundingClientRect().width;

let gameRunning = false;

body.addEventListener('keydown', (event) => {
    if (event.target == "Enter" && !gameRunning) startGame();
})

body.addEventListener('dblclick', (event) => {
    if (!gameRunning) startGame();
})

function startGame() {
    // ball moving 45 deg up to the right
    // pad can move
    // ball hits a wall and change direction
    // when getting to the bottom line, ball
    // eithe hits the pad and change direction
    // or fall down and disappear
}

// function dragPad() {
//     console.log('stopPropagation');

    // pad.ondragstart = () => false;
    // pad.style.transform = `translateX(${padPosition.startX}px)`;

    // Listeners to control player thumb position when it is changed manually
    pad.onpointerdown = function(event) {
        console.log('pointer down');
        let pointerOffset = event.pageX - pad.getBoundingClientRect().x;
        let ballOffset = event.pageX - ball.getBoundingClientRect().x;
        // prevent selection start (browser action)
        // event.preventDefault();

        // начать отслеживание перемещения указателя и переопределить их на ползунок
        pad.setPointerCapture(event.pointerId);

        pad.onpointermove = function(event) {
            console.log('pointer move');
                let lineRightEnd = padPosition.endX;
                let startPosition = padPosition.startX;
                let offset = pad.getBoundingClientRect().width / 2;
    
                if (event.pageX - pointerOffset < startPosition) {
                    pad.style.transform = 'translateX(0px)';
                    if (!gameRunning) ball.style.transform = 'translateX(0px)';
                } else if (event.pageX - pointerOffset > lineRightEnd) {                    
                    pad.style.transform = `translateX(${lineRightEnd - startPosition}px)`;
                    if (!gameRunning) ball.style.transform = `translateX(${lineRightEnd - startPosition}px)`;
                } else {
                    pad.style.transform = `translateX(${event.pageX - startPosition - offset}px)`;
                    if (!gameRunning) ball.style.transform = `translateX(${event.pageX - startPosition - offset}px)`;
                }
                coord.textContent = pad.getBoundingClientRect().x;
                console.log('event.pageX =', event.pageX, 'lineRightEnd =', lineRightEnd, 'startPosition =', startPosition);
        }

        pad.onpointerup = () => {
            pad.onpointermove = null;
            pad.onpointerup = null;
        }
    }